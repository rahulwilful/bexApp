import {View, Text, Image, Dimensions} from 'react-native';
import React, { useState } from 'react';
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
  CookingIcon,
  BodyIcon,
  DrinksIcon,
  HomeIcon,
  HealthIcon,
  SnacksIcon,
  ActiyoLuxuryLogo,
} from '../IconsImages';

import Carousel,{Pagination} from 'react-native-snap-carousel';
import ES from '../ES';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
const screenHeight = Dimensions.get('window').height;
const sceenWidth = Dimensions.get('window').width;

const Slider = () => {
  const navigation = useNavigation();

  data = [Banner1, Banner1, Banner1,Banner1,Banner1,Banner1, Banner1];
  const [activeSlide, setActiveSlide] = useState(0);
  

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('TabHome', {
          screen: 'stackCart',
        })
      }
      style={[ES.w100]}>
      <View
        style={[ES.w100, ES.mt3, ES.overflowHidden, ES.bRadius12, ES.shadow1]}>
        <Image source={item} style={[ES.w100]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={sceenWidth}
        itemWidth={sceenWidth * 0.8}
        loop={true} // Enables infinite scrolling
        onSnapToItem={(index) => setActiveSlide(index)} 
      />
       <Pagination
        dotsLength={data.length} // Number of items
        activeDotIndex={activeSlide} // Active dot index
        dotStyle={{
          width: 20,
          height: 6,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default Slider;
