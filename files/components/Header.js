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
import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

import {
  HealthIcon,
  BeveragesIcon,
  BodyIcon,
  SnacksIcon,
  CookingIcon,
  BellIcon,
  MenuIcon,
  MenuIconSvg,
  BexImage,
  SearchIcon,
  CartIcon,
  BagWhite3Icon,
} from '../pages/IconsImages';

import ES from '../pages/ES';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = props => {
  const cart = useSelector(state => state.cart);

  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (search != '') props.handleSearch(search);
  }, [search]);
  return (
    <View style={[ES.w100, ES.bgBlue, ES.fx0, ES.pt4, ES.pb2]}>
      <View style={[ES.fx3, ES.justifyContentEnd]}>
        <View style={[ES.fx0, ES.flexRow]}>
          <View style={[ES.fx2, ES.justifyContentCenter, ES.alignItemsCenter]}>
            <TouchableOpacity
              style={[ES.fx2, ES.justifyContentCenter, ES.alignItemsCenter]}
              onPress={() => navigation.openDrawer()} // Open the drawer
            >
              <Image source={MenuIcon} />
              {/* <MenuIconSvg width={30} height={30} fill="white" /> */}
            </TouchableOpacity>
          </View>
          <View style={[ES.w100, ES.fx8, ES.flexColumn, ES.alignItemsCenter]}>
            <Image
              source={BexImage}
              style={{width: 87, height: 51, objectFit: 'contain'}}
            />
            <View style={[ES.w100]}>
              <Text style={[ES.textLight, ES.f12, ES.textCenter]}>
                The Sharing Store
              </Text>
            </View>
          </View>

          <View
            style={[
              ES.fx2,
              ES.justifyContentCenter,
              ES.alignItemsCenter,
              ES.relative,
            ]}>
            {/*  <Image
              source={BellIcon}
              style={[{width: 23.83, height: 33.83}, ES.objectFitContain]}
            /> */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('TabCart', {
                  screen: 'stackCart', // Name of the nested screen
                })
              }>
              <Image
                source={BagWhite3Icon}
                style={[{width: 50.83, height: 50.83}, ES.objectFitContain]}
              />
            </TouchableOpacity>
            <View
              style={[ES.absolute, ES.w100, ES.h100, ES.centerItems, ES.pt1]}>
              <Text style={[ES.f20, ES.fw700, ES.textLight, ES.textShadow]}>
                {cart.length}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={[
          ES.fx2,
          ES.alignItemsCenter,
          ES.justifyContentCenter,
          ES.flexRow,
          ES.mt1,
        ]}>
        <View style={[ES.w90, ES.bRadius5, ES.bgLight, ES.flexRow, ES.p04]}>
          <View style={[ES.fx1, ES.justifyContentCenter, ES.alignItemsCenter]}>
            <Image source={SearchIcon} />
          </View>
          <TextInput
            placeholder="Search For Products And More"
            value={search}
            onChangeText={setSearch}
            style={[ES.bgLight, ES.f16, {height: 44}, ES.fx9]}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
