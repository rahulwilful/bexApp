import React, {useState, useEffect} from 'react';
import {View, Button, Text, ToastAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';

import {
  CFEnvironment,
  CFSession,
  CFPaymentModes,
  CFPaymentComponentBuilder,
  CFThemeBuilder,
  CFDropCheckoutPayment,
} from 'cashfree-pg-api-contract';

import {
  CFCallback,
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';

import {CF_Client_Id, CF_Client_SECRETE} from '../../../AppConstants';
import {useDispatch, useSelector} from 'react-redux';
import OrderDetails from '../../components/OrderDetails';
import ES from '../ES';
import { useNavigation } from '@react-navigation/native';
import { emptyTheCart, updateCartRenderKey } from '../../../redux/action';

const CheckOut = () => {
  const [orderId, setOrderId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscountedAmount, setTotalDiscountedAmount] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

  const navigation = useNavigation()

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.length == 0) return;
    let temp = 0;
    let temp2 = 0;
    for (let i in cart) {
      console.log(
        'price: ',
        cart[i].totalPrice,
        ' offerPrice',
        cart[i].totalOfferPrice,
      );
      temp = temp + cart[i].totalOfferPrice;
      temp2 = temp2 + cart[i].totalPrice;
    }

    console.log('totalAmount: ', temp2, ' totalDiscountedAmount;', temp);

    setTotalDiscountedAmount(temp);
    setTotalAmount(temp2);
    setTotalPayable(temp + 20);
  }, [cart]);

 
  const createOrder = async () => {
    let uniqueOrderId = 'order_' + new Date().getTime();
    setOrderId(uniqueOrderId);

    const url = 'https://sandbox.cashfree.com/pg/orders';
    const headers = {
      'Content-Type': 'application/json',
      'x-client-id': CF_Client_Id,
      'x-client-secret': CF_Client_SECRETE,
      'x-api-version': '2022-09-01',
      Accept: 'application/json',
    };

    const body = {
      order_amount: totalPayable,
      order_currency: 'INR',
      order_id: uniqueOrderId,
      customer_details: {
        customer_id: 'test_user',
        customer_name: 'John Doe',
        customer_email: 'johndoe@example.com',
        customer_phone: '9999999999',
      },
      payment_methods: {
        upi: {
          vpa: null,
        },
      },
    };

    try {
      const response = await axios.post(url, body, {headers});
      console.log('Order Created:', response.data.payment_session_id);

      if (response.data.payment_session_id) {
        setSessionId(response.data.payment_session_id);
        setPaymentLink(response.data.payments.url);
        console.log('Payment Link:', response.data.payments.url);
        console.log('orderId: ', response.data.order_id);
        initiatePayment(uniqueOrderId,response.data.payment_session_id)
      } else {
        console.error('Failed to create order:', response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };


  const verifySession = async () => {
    if (!sessionId || !orderId) {
      console.error('Session ID or Order ID is missing!');
      return;
    }

    try {
      const session = new CFSession(sessionId, orderId, CFEnvironment.SANDBOX);
      console.log('Session Verified:', session);
    } catch (error) {
      console.error('Error verifying session:', error.message);
    }
  };


  const checkPaymentStatus = async order_id => {
    const url = `https://sandbox.cashfree.com/pg/orders/${order_id}/payments`;
    const headers = {
      'x-client-id': CF_Client_Id,
      'x-client-secret': CF_Client_SECRETE,
      'x-api-version': '2022-01-01',
    };

    try {
      const response = await axios.get(url, {headers});
      console.log('Payment Status:', response.data);
    } catch (error) {
      console.error('Error checking payment status:', error.message);
    }
  };


  const initiatePayment = async (orderId, sessionId) => {
    if (!sessionId || !orderId) {
      console.error('Session ID or Order ID is missing!');
      return;
    }
  
    const session = new CFSession(sessionId, orderId, CFEnvironment.SANDBOX);
    const paymentModes = new CFPaymentComponentBuilder()
      .add(CFPaymentModes.CARD)
      .add(CFPaymentModes.UPI)
      .add(CFPaymentModes.NB)
      .build();
  
    const theme = new CFThemeBuilder()
      .setNavigationBarBackgroundColor('#2d2af7')
      .setNavigationBarTextColor('#FFFFFF')
      .setButtonBackgroundColor('#2d2af7')
      .setButtonTextColor('#FFFFFF')
      .setPrimaryTextColor('#212121')
      .setSecondaryTextColor('#757575')
      .build();
  
    const dropPayment = new CFDropCheckoutPayment(session, paymentModes, theme);
  
    try {
      CFPaymentGatewayService.setCallback({
        onVerify: (verifiedOrderId) => {
          console.log('checkout successfull order_id:', verifiedOrderId);
          dispatch(emptyTheCart())
          
          
          navigation.navigate('stackPaymentSuccess');
          
        },

        onError: (errorResponse, failedOrderId) => {
          console.error(
            'checkout failed for Order ID:',
            failedOrderId,
            '\nError Details:',
            errorResponse
          )
          navigation.navigate('stackPaymentFailure');
        },
      })
  
      CFPaymentGatewayService.doPayment(dropPayment);
    } catch (e) {
      console.error('Error during payment initiation:', e.message);
    }
  };
  

 
  useEffect(() => {
    // Perform initial setup if necessary
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={[ES.w100, ES.px2]}>
        <View style={[ES.w100, ES.overflowHidden, ES.bRadius12]}>
          <OrderDetails data={cart} color={'#f20909'} />
        </View>
      </View>

      <View style={[ES.w50]}>
        <TouchableOpacity
          style={[
            ES.my1,
            ES.w100,
            ES.bgPrimary,
            ES.py04,
            ES.bRadius8,
            ES.shadow1,
          ]}
          onPress={() => {
            createOrder();
          }}>
          <Text style={[ES.textLight, ES.textCenter, ES.f18]}>
            Place Order ₹{totalPayable}
          </Text>
        </TouchableOpacity>
      </View>

      {/*  

       <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => {
            if (orderId) {
              initiatePayment();
            } else {
              console.log('No Order ID available');
            }
          }}>
          <Button title="Make Payment" />
        </TouchableOpacity>

      
        <TouchableOpacity
          style={{marginBottom: 20}}
          onPress={() => {
            if (orderId) {
              checkPaymentStatus(orderId);
            } else {
              console.log('No Order ID available');
            }
          }}>

          <Button title="Check Payment Status" />

        </TouchableOpacity>

        */}

      {/*  <TouchableOpacity
          onPress={() => {
            verifySession();
          }}>
          <Text style={{color: 'blue', fontSize: 16}}>Open Payment Page</Text>
        </TouchableOpacity> */}
    </View>
  );
};

export default CheckOut;