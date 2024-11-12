import { View, Text, Image } from 'react-native'
import React from 'react'
import { Banner1 } from '../../IconsImages'

const Banner = (props) => {
  return (
    <View>
        
      <Image source={props.Banners[2]} />
    </View>
  )
}

export default Banner