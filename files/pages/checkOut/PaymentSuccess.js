import { View, Text, Button } from 'react-native'
import React from 'react'
import ES from '../ES'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PaymentSuccess = ({navigation}) => {
  return (

    <View style={[ES.fx1, ES.centerItems]}>
        <Text style={[ES.textSuccess, ES.f18, ES.fwB,ES.mb2]}>Payment Successfull</Text>
        <TouchableOpacity 
         onPress={() => navigation.navigate('stackHome')}
         style={[ES.bgPrimary,ES.bRadius10]}
        >
            <Text style={[ES.textLight,ES.f16,ES.px1,ES.py06]}>
            Continue Shopping
            </Text>
        </TouchableOpacity>
        
    </View>

  )
}

export default PaymentSuccess