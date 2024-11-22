import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import ES from '../ES'

const PaymentFailure = ({navigation}) => {
   
     useEffect(()=>{
        setTimeout(() =>{
            navigation.goBack()
        },5000)
    },[]) 
    
   
  return (
    <View style={[ES.fx1, ES.centerItems]}>
      <Text style={[ES.textDanger, ES.f18, ES.fwB]}> 
        Payment Failed 
      </Text>
    </View>
  )
}

export default PaymentFailure