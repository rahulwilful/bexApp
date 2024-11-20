import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ProductComponetVertical from '../../components/ProductComponetVertical'
import { useDispatch, useSelector } from 'react-redux'
import ES from '../ES'


const Cart = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    useEffect(() => {
        console.log("my cart:", cart.length)
    }, [cart])
    
  return (
    <>
        <View style={[ES.fx1,cart.length==0 ? ES.dBlock:ES.dNone,ES.centerItems]}>
            <Text style={[ES.fwB,ES.f18,ES.textDark]}>Your Bag Feels Light</Text>
        </View>

        <View>
        <View style={[ES.w100]}>
              <FlatList
                data={ cart }
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={[ES.w100, {paddingHorizontal: '2.5%'}]}
                /* columnWrapperStyle={s.columnWrapper} */
                renderItem={({item}) => {
                  return (
                    <View style={[ES.m04, {flex: 0.5}]}>
                      <ProductComponetVertical product={item} />
                    </View>
                  );
                }}
              />
            </View>
        </View>
      
      
    
    </>
  )
}

export default Cart