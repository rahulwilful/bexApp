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
  BexPromiseIcon,
  ShareIcon,
  HeartIcon,
  RupeeSymbol,
  BexCoin,
} from '../IconsImages';

import ES from '../ES';
import {useNavigation} from '@react-navigation/native';

import {toggleLogin} from '../../../redux/action';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;

import Header from './components/Header';
import Category from './components/Category';
import Body from './components/Body';
import Banner from './components/Banner';
import TopDiscounts from './components/TopDiscounts';

export default function Home({route}) {
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [originalData, setOriginalData] = useState([]);

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

  return (
    <ScrollView>
      <View style={[s.main]}>
        <View style={[ES.w100, ES.h20]}>
          <Header handleSearch={handleSearch} />
        </View>

        <View style={[s.container]}>
          <View style={[ES.w100, ES.h15, ES.borderDanger]}>
            <Category />
          </View>

          <View>
            <View style={[]}>
              <Banner Banners={[Banner1, Banner1, Banner1, Banner1]} />
            </View>
          </View>

          <View style={[{backgroundColor: '#EBF0F6'}, ES.w100, ES.py2]}>
            <View style={[ES.bgLight, ES.w50, ES.bRadius5, ES.shadow1,ES.py1]}>
              <View>
                <View style={[ES.relative]}>
                  <View
                    style={[ES.absolute, ES.left0, ES.z1, ES.ps06, ES.pt06]}>
                    <Image
                      source={BexPromiseIcon}
                      style={{width: 64, height: 19}}
                    />
                  </View>

                  <View
                    style={[ES.absolute, ES.right0, ES.z1, ES.pe06, ES.pt06]}>
                    <Image source={ShareIcon} style={{width: 34, height: 34}} />
                  </View>

                  <View
                    style={[
                      ES.absolute,
                      ES.right0,
                      ES.top50,
                      ES.z10,
                      ES.pe06,
                      ES.pt06,
                    ]}>
                    <Image source={HeartIcon} style={{width: 24, height: 24}} />
                  </View>

                  <View
                    style={[
                      ES.fx0,
                      ES.justifyContentCenter,
                      ES.alignItemsCenter,
                      ES.p1,
                    ]}>
                    <Image
                      source={Poha1Product}
                      style={{width: 130, height: 130}}
                    />
                  </View>
                </View>

                <View style={[ES.fx0, ES.alignItemsCenter]}>
                  <View style={[ES.px1, ES.w100]}>
                    <Text
                      style={[
                        ES.f14,
                        ES.fwM,
                        ES.productTitleColor,
                        ES.textJustify,
                        ES.letterSpace1,
                      ]}>
                      <Text>Namaste Chai - Instant Poha</Text>
                    </Text>
                  </View>
                  <View style={[ES.flexRow, ES.px1]}>
                    <View style={[ES.fx1, ES.flexRow, ES.gap1]}>
                      <View style={[]}>
                        <Text style={[ES.f18, ES.fwM, ES.productTitleColor]}>
                          RS350
                        </Text>
                      </View>
                      <View
                        style={[
                          ES.lineThrough,
                          ES.f10,
                          ES.fx0,
                          ES.justifyContentEnd,
                        ]}>
                        <Text>RS500</Text>
                      </View>
                    </View>

                    <View
                      style={[
                        ES.fx1,
                        ES.justifyContentEnd,
                        ES.f10,
                        ES.alignItemsEnd,
                      ]}>
                      <Text style={[ES.textEnd,{color:'#25D366'},ES.fwB]}>50.00% OFF</Text>
                    </View>
                  </View>

                  <View style={[ES.flexRow,ES.w100]}>
                    <View style={[ES.fx1,ES.flexRow,ES.justifyContentCenter,ES.gap1]}>
                        <Image source={RupeeSymbol} />
                        <View style={[]}>
                          <Text style={[ES.textGreen]}> rs14.84 </Text>
                        </View>

                    </View>
                    <View style={[ES.fx1,ES.flexRow,ES.justifyContentCenter,ES.gap1]}>
                    <Image source={BexCoin} />
                    <View style={[]}>
                          <Text style={[ES.textGreen]}> 150 </Text>
                        </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Button title="Log Out" onPress={() => handleLogout()} />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  main: {
    width: '100%',
    height: screenHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },
});
