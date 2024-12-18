import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ES from '../ES';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Draggable = () => {
  const [isGrown, setIsGrown] = useState(true);
  const width = useSharedValue(150);
  const animation = useSharedValue(0);
  const x = useSharedValue(0);
  const y = useSharedValue(0);

    const gestureHandler = useAnimatedGestureHandler({
        onStart:(e,c ) => {
                c.startX = x.value,
                c.startY = y.value 
        },

        onActive:(e,c) => {
            x.value = c.startX + e.translationX,
            y.value = c.startY + e.translationY
        },

        onEnd:(e,c) => {
            x.value = withTiming(0,{duration:700})
            y.value = withTiming(0,{duration:700})
        }
    })

    const animatedStyle = useAnimatedStyle(() => {
        return {
         transform:[{translateX:x.value},{translateY:y.value}]
          
        };
      });

  return (
    <GestureHandlerRootView style={[{flex: 1},ES.tempBorder2]}>
      <View style={[s.main,ES.centerItems]}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[{width: 100, height: 100}, animatedStyle, ES.shadow1,ES.bgBlue,ES.bRadius8]}>
            <TouchableOpacity
              style={[ES.p04, ES.centerItems, ES.bRadius10, ES.h100]}>
              <Text style={[ES.textLight, ES.f18, ES.fwB]}>Draggable</Text>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default Draggable;

const s = StyleSheet.create({
  main: {flex: 1},
});
