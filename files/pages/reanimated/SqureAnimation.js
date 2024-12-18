import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ES from '../ES';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const SqureAnimation = () => {
  const [isGrown, setIsGrown] = useState(true);
  const width = useSharedValue(150);
  const animation = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return{
        transform:[{translateX:animation.value},{rotate: isGrown ? `${animation.value}deg` : `${animation.value}deg`},{scale:isGrown ? withSpring(1,{
             mass: 3.7,
        damping: 14,
        stiffness: 387,
        duration: 3000,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 100.57,
        }) : withSpring(0.5,{
             mass: 3.7,
        damping: 14,
        stiffness: 387,
        duration: 3000,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 100.57,
        })}]
    }
  })

  const handleAnimation = () => {
     animation.value = withSpring( isGrown ? animation.value + 90 :  animation.value - 90,{
        mass: 3.7,
        damping: 14,
        stiffness: 387,
        duration: 3000,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 100.57,
     })  // Toggle between 150 and 200
    //width.value = targetWidth
    setIsGrown(!isGrown); // Toggle the state
  };

  return (
    <View style={[s.main]}>
      <Animated.View style={[{ width:100,height:100 },animatedStyle]}>
        <TouchableOpacity
          style={[ES.tempBorder, ES.bgPrimary, ES.p04, ES.centerItems, ES.bRadius10, ES.shadow1,ES.h100]}
          onPress={handleAnimation}
        >
          <Text style={[ES.textLight, ES.f18, ES.fwB]}>
            Grow
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SqureAnimation;

const s = StyleSheet.create({
  main: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
