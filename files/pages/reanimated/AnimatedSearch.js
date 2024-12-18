import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import ES from '../ES';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { CloseIcon, SearchIcon } from '../IconsImages';

const AnimatedSearch = () => {
    const [isGrown, setIsGrown] = useState(true);
    const width = useSharedValue(150);
    const animation = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
      const width = interpolate(animation.value, [1, 0], [250, 0]);
      const backgroundColor = interpolateColor(animation.value, [1, 0], ['#dbdbdb', '#dbdbdb']);
      
      return {
        width: width,
        backgroundColor,
      };
    });
  
    const handleAnimation = () => {
      animation.value = isGrown ?  withTiming(1,{duration:700}) :withTiming(0,{duration:700})
      setIsGrown(!isGrown); // Toggle the state
    };
  
    return (
      <View style={[s.main]}>
        <Animated.View style={[ animatedStyle,   ES.shadow1,ES.flexRow,ES.gap1,ES.centerItems,ES.bRadius10]}>
          <TextInput placeholder='Search Here' style={[ES.w70,ES.fx1,ES.f18,ES.fwB,ES.px1]} ></TextInput>
          <TouchableOpacity
            style={[
              ES.py1,
              ES.px2,
              ES.centerItems,
              ES.bRadius10,
              ,{width:35,backgroundColor:'#dbdbdb'}
            ]}
            onPress={handleAnimation}>
              <Image source={isGrown ? SearchIcon : CloseIcon} style={{width:30, height:30}} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

export default AnimatedSearch

const s = StyleSheet.create({
    main: StyleSheet.flatten([ES.fx1, ES.justifyContentCenter, ES.alignItemsCenter]),
});