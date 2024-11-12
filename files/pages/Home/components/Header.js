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
import React, { useEffect, useState } from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

import {
  HealthIcon,
  BeveragesIcon,
  BodyIcon,
  SnacksIcon,
  CookingIcon,
  BellIcon,
  MenuIcon,
  BexImage,
  SearchIcon,
} from '../../IconsImages';

import ES from '../../ES';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
    
    const [search, setSearch] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
     
     if(search != '') props.handleSearch(search);
  
    }, [search]);
  return (
    <View style={[ES.w100, ES.h100, ES.bgBlue, ES.fx0]}>
      <View style={[ES.fx3, ES.justifyContentEnd]}>
        <View style={[ES.fx0, ES.flexRow]}>
          <View style={[ES.fx2, ES.justifyContentCenter, ES.alignItemsCenter]}>
          <TouchableOpacity
            style={[ES.fx2, ES.justifyContentCenter, ES.alignItemsCenter]}
            onPress={() => navigation.openDrawer()} // Open the drawer
          >
            <Image source={MenuIcon} />
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

          <View style={[ES.fx2, ES.justifyContentCenter, ES.alignItemsCenter]}>
            <Image
              source={BellIcon}
              style={[{width: 23.83, height: 33.83}, ES.objectFitContain]}
            />
          </View>
        </View>
      </View>
      <View
        style={[
          ES.fx2,
          ES.alignItemsCenter,
          ES.justifyContentCenter,
          ES.flexRow,
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
