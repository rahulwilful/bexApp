import { View, Text, Image,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import ES from '../pages/ES'

import { Banner1 } from '../pages/IconsImages'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Banner = (props) => {
  const navigation = useNavigation();
  const [isProductImages, setIsProductImages] = useState(false)
  useEffect(() => {
    //console.log('BannerComponent', props.banner?.banners[0].bannerImage);
    if(props.banner.banners[0].bannerImage) setIsProductImages(true)
  }, []);

  const tempBanners = [
    {
      bannerImage:Banner1
    },
    {
      bannerImage:Banner1
    },
    {
      bannerImage:Banner1
    },
    {
      bannerImage:Banner1
    },
    {
      bannerImage:Banner1
    },
  ]

  const handleNavigate =() => {
    console.log(props.banner._id)
    navigation.navigate('stackCart')
    
  }

  return (
    <View style={[{width:screenWidth}]}>
      <TouchableOpacity 
        onPress={()=> handleNavigate()}
      >
        <Image source={isProductImages ? {uri:props.banner.banners[0].bannerImage} : {uri:'https://bex-dev-bucket.s3.ap-south-1.amazonaws.com/400x400-image-1686744310296.png'}} style={[ES.w100,ES.h100,ES.objectFitCover]}   />
      </TouchableOpacity>
    </View>
  )
}

export default Banner