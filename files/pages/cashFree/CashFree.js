import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {
  CFEnvironment,
  CFSession,
  CFPaymentModes,
  CFPaymentComponentBuilder,
  CFThemeBuilder,
  CFDropCheckoutPayment
} from 'cashfree-pg-api-contract';
import {
  CFCallback,
  CFErrorResponse,
  CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {CF_Client_Id, CF_Client_SECRETE} from '../../../AppConstants';

const CashFree = () => {
  const [orderId, setOrderId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [paymentLink, setPaymentLink] = useState(null);

  // Create order
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
      order_amount: '10',
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
        console.log("orderId: ", response.data.order_id);
      } else {
        console.error('Failed to create order:', response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };

  // Verify session
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

  // Check payment status
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

  // Initiate Payment using Cashfree SDK
  const initiatePayment = async () => {
    if (!sessionId || !orderId) {
      console.error('Session ID or Order ID is missing!');
      return;
    }

    const session = new CFSession(
      sessionId,
      orderId,
      CFEnvironment.SANDBOX
  );
  const paymentModes = new CFPaymentComponentBuilder()
      .add(CFPaymentModes.CARD)
      .add(CFPaymentModes.UPI)
      .add(CFPaymentModes.NB)
      // .add(CFPaymentModes.WALLET)
      // .add(CFPaymentModes.PAY_LATER)
      .build();
  const theme = new CFThemeBuilder()
      .setNavigationBarBackgroundColor('#f20909')
      .setNavigationBarTextColor('#FFFFFF')
      .setButtonBackgroundColor('#f209e2')
      .setButtonTextColor('#FFFFFF')
      .setPrimaryTextColor('#212121')
      .setSecondaryTextColor('#757575')
      .build();
  const dropPayment = new CFDropCheckoutPayment(
      session,
      paymentModes,
      theme
  );

  try{

    CFPaymentGatewayService.doPayment(dropPayment);
  }catch(e){
    console.log("error: ",e);
  }

  //setButtonDisabled(false);
  };

  // Effect hook to setup anything on mount
  useEffect(() => {
    // Perform initial setup if necessary
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* Create Order Button */}
      <TouchableOpacity
        style={{marginBottom: 20}}
        onPress={() => {
          createOrder();
        }}>
        <Button title="Create Order" />
      </TouchableOpacity>

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

      {/* Check Payment Status Button */}
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

      {/* Initiate Payment Button */}
      

      {/* Verify Session */}
      <TouchableOpacity
        onPress={() => {
          verifySession();
        }}>
        <Text style={{color: 'blue', fontSize: 16}}>Open Payment Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CashFree;
