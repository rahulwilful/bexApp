import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ES from '../ES';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const Interpolation = () => {
  const [isGrown, setIsGrown] = useState(true);
  const width = useSharedValue(150);
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(animation.value, [1, 0], [150, 200]);
    const backgroundColor = interpolateColor(animation.value, [1, 0], ['orange', 'purple']);
    const borderRadius = interpolate(animation.value, [1, 0], [10, 50]);    
    return {
      width: width,
      height: width,
      backgroundColor,
      borderRadius
    };
  });

  const handleAnimation = () => {
    animation.value = isGrown ?  withSpring(1,{
        mass: 3.7,
        damping: 14,
        stiffness: 387,
        duration: 3000,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 100.57,
     }) :withSpring(0,{
        mass: 3.7,
        damping: 14,
        stiffness: 387,
        duration: 3000,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 100.57,
     })
      
  
    setIsGrown(!isGrown); // Toggle the state
  };

  return (
    <View style={[s.main]}>
      <Animated.View style={[{width: 100, height: 100}, animatedStyle,   ES.shadow1,]}>
        <TouchableOpacity
          style={[
         
           
            ES.p04,
            ES.centerItems,
            ES.bRadius10,
         
            ES.h100,
          ]}
          onPress={handleAnimation}>
          <Text style={[ES.textLight, ES.f18, ES.fwB]}>Grow</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Interpolation;

const s = StyleSheet.create({
  main: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
