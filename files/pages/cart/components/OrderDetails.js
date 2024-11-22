import {View, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import ES from '../../ES';

const OrderDetails = props => {

    const [totalAmount, setTotalAmount] = useState(0)
    const [totalDiscountedAmount, setTotalDiscountedAmount] = useState(0)
    const [totalPayable ,setTotalPayable] = useState(0)
    

    useEffect(() => {

        if(props.data.length == 0) return
        let temp =0
        let temp2 = 0
        for(let i in props.data){
            console.log("price: ",props.data[i].totalPrice , " offerPrice",props.data[i].totalOfferPrice )
            temp = temp + props.data[i].totalOfferPrice
            temp2 = temp2 + props.data[i].totalPrice
        }

       
            
        
        setTotalDiscountedAmount(temp)
        setTotalAmount(temp2)
        setTotalPayable(temp + 20)
    })

  return (
    <View style={[ES.bgLightTea, ES.p2,]}>
      <Text style={[ES.f18, ES.textDark]}>Total Items {props.data.length}</Text>
      <View style={[ES.flexRow, ES.justifyContentSpaceBetween, ES.mt04]}>
        <View style={[]}>
          <Text style={[ES.textDark]}>Total Ammount</Text>
        </View>
        <View style={[]}>
          <Text style={[ES.textDanger]}>₹{totalAmount}</Text>
        </View>
      </View>
      <View style={[ES.flexRow, ES.justifyContentSpaceBetween, ES.mt04]}>
        <View style={[]}>
          <Text style={[ES.textDark]}>Discounted Ammount</Text>
        </View>
        <View style={[]}>
          <Text style={[ES.textSuccess]}>₹{totalDiscountedAmount}</Text>
        </View>
      </View>
      <View style={[ES.flexRow, ES.justifyContentSpaceBetween, ES.mt04]}>
        <View style={[]}>
          <Text style={[ES.textDark]}>Plateform Fee</Text>
        </View>
        <View style={[]}>
          <Text style={[ES.textDark]}>₹20</Text>
        </View>
      </View>
      <View style={[ES.borderTop, ES.borderSecondary,ES.borderTopWidth1,ES.my06]}></View>
      <View style={[ES.flexRow, ES.justifyContentSpaceBetween, ES.mt04]}>
        <View style={[]}>
          <Text style={[ES.textDark]}>Total Payable</Text>
        </View>
        <View style={[]}>
          <Text style={[ES.textDark]}>₹{totalPayable}</Text>
        </View>
      </View>
    
      
    </View>
  );
};

export default OrderDetails;
