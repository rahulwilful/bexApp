import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import ES from '../ES';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  cashfreeClientId,
  cashfreeClientSecret,
  CF_Client_Id,
  CF_Client_SECRETE,
} from '../../../AppConstants';

import {CFEnvironment, CFSession} from 'cashfree-pg-api-contract';

import { WebView } from 'react-native-webview';

const PaymentWebView = ({ paymentLink }) => {
  return <WebView source={{ uri: paymentLink }} />;
};

const CashFree = () => {
  const [orderId, setOrderId] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  let payment_session_id = null;
  let order_id = null;


  const createOrder = async () => {
    let tempOrderId2 = 'devstudio_' + new Date().getTime();
    setOrderId(tempOrderId2);
    order_id = tempOrderId2;

    const url = 'https://sandbox.cashfree.com/pg/orders';
    const headers = {
      'Content-Type': 'application/json',
      'x-client-id': CF_Client_Id,
      'x-client-secret': CF_Client_SECRETE,
      'x-api-version': '2022-09-01',
      Accept: 'application/json',
    };

    const body = {
      order_amount: '1',
      order_currency: 'INR',
      order_id: order_id,
      customer_details: {
        customer_id: 'node_sdk_test',
        customer_name: 'rahul',
        customer_email: 'example@gmail.com',
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
      console.log('Order Created:', response);

      if (response.data.payment_session_id) {
        console.log('Payment Session ID:', response.data.payment_session_id);
        setSessionId(response.data.payment_session_id);
        payment_session_id = response.data.payment_session_id;
        varifySession();
      } else {
        console.error('Failed to create order:', response.data);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const varifySession = async () => {

    console.log("varifySession: ",payment_session_id,"  ",order_id)
    try {
      const session = new CFSession(
        payment_session_id,
        order_id,
        CFEnvironment.SANDBOX,
      );

      console.log("session: ",session)
    } catch (e) {
      console.log(e.message);
    }
  };

  const checkOnlinePayment = async order_id => {
    axios
      .get(`https://sandbox.cashfree.com/pg/orders/${order_id}/payments`, {
        headers: {
          'x-client-id': CF_Client_Id,
          'x-client-secret': CF_Client_SECRETE,
          'x-api-version': '2022-01-01',
        },
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response, 'error');
      });
  };

  useEffect(() => {
    //createOrder();
  }, []);

  return (
    <View style={[ES.fx1, ES.centerItems, ES.gap3]}>
      <TouchableOpacity
        onPress={() => {
          createOrder();
        }}>
        <Button title="Call Test API" />
        {/* <Text style={[ES.textDark, ES.f40, ES.fwB]}>Call API</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          checkOnlinePayment('devstudio_953778876');
        }}>
        <Button title="Check Payment" />
      </TouchableOpacity>
    </View>
  );
};

export default CashFree;
