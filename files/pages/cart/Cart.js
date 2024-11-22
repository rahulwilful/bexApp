import {
  View,
  Text,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import ProductComponetVertical from '../../components/ProductComponetVertical';
import ProductComponetHorizontal from '../../components/ProductComponetHorizontal';
import {useDispatch, useSelector} from 'react-redux';
import ES from '../ES';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import OrderDetails from './components/OrderDetails';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('my cart:', cart.length);
  }, [cart]);

  return (
    <>
      <View
        style={[
          ES.fx1,
          cart.length == 0 ? ES.dBlock : ES.dNone,
          ES.centerItems,
         
        ]}>
        <Text style={[ES.fwB, ES.f18, ES.textDark]}>Your Bag Feels Light</Text>
      </View>
      <View style={[ES.fx1, cart.length > 0 ? ES.dBlock : ES.dNone,]}>
        <ScrollView>
          <View style={[ES.w100, ES.mt1]}>
            <FlatList
              data={cart}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[ES.fx0, ES.gap3, ES.pb1]}
              renderItem={({item}) => {
                return (
                  <ProductComponetHorizontal
                    renderCart={true}
                    product={item}
                    shadow={true}
                    color={'#fcfcfc'}
                    cart={true}
                  />
                );
              }}
            />
          </View>

          <View style={[ES.my3 ]}>
            <OrderDetails data={cart} />
          </View>
        </ScrollView>
      </View>
      <View style={[ES.w100, ES.bottom0, ES.shadow1,ES.px2,ES.pb06]}>
        <TouchableOpacity
          style={[
            ES.bgPrimary,
            ES.centerItems,
            ES.p1,
            cart.length > 0 ? ES.dBlock : ES.dNone,
            ES.bRadius8,
            ES.shadow1
          ]}
          onPress={() => navigation.navigate('stackCheckOut')}>
          <Text style={[ES.fwB, ES.f18, ES.textLight]}>Check Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Cart;
