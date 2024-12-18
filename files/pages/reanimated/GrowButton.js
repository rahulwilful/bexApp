import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ES from '../ES';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const GrowButton = () => {
  const [isGrown, setIsGrown] = useState(true);
  const width = useSharedValue(150);

  const handleGrow = () => {
    const targetWidth = isGrown ?  width.value + 90 :  width.value - 90; // Toggle between 150 and 200
    width.value = withSpring(targetWidth, {
      mass: 3.7,
      damping: 14,
      stiffness: 387,
      duration: 2000,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 100.57,
    });
    setIsGrown(!isGrown); // Toggle the state
  };

  return (
    <View style={[s.main]}>
      <Animated.View style={{ width }}>
        <TouchableOpacity
          style={[ES.tempBorder, ES.bgPrimary, ES.p04, ES.centerItems, ES.bRadius10, ES.shadow1]}
          onPress={handleGrow}
        >
          <Text style={[ES.textLight, ES.f18, ES.fwB]}>
            Grow
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default GrowButton;

const s = StyleSheet.create({
  main: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
