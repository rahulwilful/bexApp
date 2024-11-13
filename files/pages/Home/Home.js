import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import React, {useEffect, useLayoutEffect, useState} from 'react';
import bex from '../../assets/Texts/BexGroup.png';
import ProfileIcons from '../../assets/Texts/ProfileIconsGroup.png';
import PlayIcon from '../../assets/Texts/PlayIcon.png';

import {
  BellIcon,
  MenuIcon,
  SearchIcon,
  BexImage,
  Banner1,
  Poha1Product,
  Poha2Product,
  Poha3Product,
  Poha4Product,
  Poha5Product,
  Poha6Product,
  Poha7Product,
  BexPromiseIcon,
  ShareIcon,
  HeartIcon,
  HeartBlueIcon,
  RupeeSymbol,
  BexCoin,
  BexPromiseIconLg,
  RupeeBagIcon,
  BexCoinLgIcon,
} from '../IconsImages';

import {ProductsArray, NewLanchArray} from './components/Constants';

import ES from '../ES';
import {useNavigation} from '@react-navigation/native';

import {toggleLogin} from '../../../redux/action';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;

import Header from './components/Header';
import Category from './components/Category';
import Body from './components/Body';
import Banner from './components/Banner';

import Products from './components/Products';
import ProductComponetHorizontal from './components/ProductComponetHorizontal';
import ProductComponetVertical from './components/ProductComponetVertical';

export default function Home({route}) {
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [renderKey, setRenderKey] = useState(0);

  const navigation = useNavigation();
  const name = route.params?.name;
  let login = false;
  const dispatch = useDispatch();

  const varifyUser = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('logout : ', token);
  };

  useEffect(() => {
    varifyUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(toggleLogin(login));
  };

  const handleSearch = async searchValue => {
    console.log('seacrh value: ', searchValue);
  };

  useEffect(() => {
    console.log(ProductsArray);
    setRenderKey(renderKey + 1);
  }, [ProductsArray]);

  return (
    <ScrollView>
      <View style={[s.main]}>
        
        
        <View style={[ES.w100, ES.h23]}>
          <Header handleSearch={handleSearch} />
        </View>

        <View style={[s.container]}>
          <View style={[ES.w100, ES.h15]}>
            <Category />
          </View>

          <View>
            <View style={[]}>
              <Banner Banners={[Banner1, Banner1, Banner1, Banner1]} />
            </View>
          </View>

          <View style={[ES.h33,  ES.w100,ES.py06]}>
            <View style={[ ES.h100]}>
              <View style={[ES.fx3, ES.centerItems]}>
                <View
                  style={[
                    ES.h80,
                    ES.bgLightGreen,
                    ES.w92,
                    ES.bRadius5,
                    ES.flexRow,
                    ES.centerItems,
                    ES.gap4,
                  ]}>
                  <View style={[]}>
                    <Image source={RupeeBagIcon} style={[]} />
                  </View>
                  <View style={[]}>
                    <Text style={[ES.fwSB, ES.f18, ES.textLight]}>
                      {' '}
                      Total Savings:{' '}
                    </Text>
                  </View>
                  <View style={[]}>
                    <Text style={[ES.fwSB, ES.f20, ES.textLight]}> ₹3500</Text>
                  </View>
                </View>
              </View>
              <View style={[ES.fx4,ES.alignItemsCenter]}>
              <View style={[ ES.flexRow,ES.h100,ES.w92,ES.justifyContentCenter]}>
                <View style={[ES.fx1, ES.py1,]}>
                  <View style={[ES.w95,ES.h98, ES.bRadius5, ES.bgBlue]}>
                    <View style={[ES.fx1, ES.p02, ES.centerItems]}>
                      <Text style={[ES.textCenter, ES.f12, ES.textLight]}>
                        Don’t Just Collect
                      </Text>

                      <Text style={[ES.textCenter, ES.f12, ES.textLight]}>
                        Buy With BEX Coins
                      </Text>
                    </View>
                    <View style={[ES.fx1, ES.centerItems]}>
                      <Image source={BexCoinLgIcon} />
                    </View>
                  </View>
                </View>
                <View style={[ES.fx1, ES.py1,ES.alignItemsEnd]}>
                  <View style={[ES.w95,ES.h98, ES.bRadius5, ES.bgDarkGreen]}>
                    <View style={[ES.fx1, ES.p02, ES.centerItems]}>
                      <Text style={[ES.textCenter, ES.f12, ES.textLight]}>
                        Get Lowest Prices
                      </Text>

                      <Text style={[ES.textCenter, ES.f12, ES.textLight]}>
                        In The Market With
                      </Text>
                    </View>
                    <View style={[ES.fx1, ES.centerItems]}>
                      <Image source={BexPromiseIconLg} />
                    </View>
                  </View>
                </View>
              </View>
              </View>
            </View>
          </View>

          <View style={[]}>
            <ProductComponetHorizontal product={NewLanchArray[0]} />
          </View>

          <View style={[{backgroundColor: '#EBF0F6'}, ES.w100, ES.pb2]}>
            <View style={[ES.fx0, ES.py1]}>
              <Text style={[ES.f20, ES.fwB, ES.textCenter, ES.textBlue]}>
                Top Discounts
              </Text>
            </View>

            <View
              style={[
                ES.w100,
                ES.fx0,
                ES.flexRow,
                ES.flexWrap,
                ES.justifyContentCenter,
                ES.gap1,
              ]}>
              <ProductComponetVertical product={ProductsArray[0]} />
              <ProductComponetVertical product={ProductsArray[1]} />
              <ProductComponetVertical product={ProductsArray[2]} />
              <ProductComponetVertical product={ProductsArray[3]} />
            </View>
          </View>
        </View>

        
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  main: {
    width: '100%',
    height: screenHeight,
    paddingBottom: 140,
  },
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
});




{/* 
            <View style={[{backgroundColor: '#EBF0F6'}, ES.w100, ES.pb2]}>
              <View style={[ES.fx0, ES.py1]}>
                <Text style={[ES.f20, ES.fwB, ES.textCenter, ES.textBlue]}>
                  Top Discounts
               </Text>
              </View>
             <FlatList
             
                data={ProductsArray}
                renderItem = {({item}) => <Products products={item} />}

             
              />
          
            </View>
           */}