import { View, Text, StyleSheet, Button, Touchable } from 'react-native'
import React from 'react'
import ES from '../ES'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated,{useSharedValue,withSpring} from 'react-native-reanimated'


const ReanimatedExample1 = () => {

  const width = useSharedValue(150)

  const handleGrow = () =>{
    width.value = withSpring(width.value ,{
      mass: 3.7,
      damping: 14,
      stiffness: 387,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 100.57,
    })
  }

 

  return (
    <View style={[s.main]} >
      <Animated.View style={{width}}>
        <TouchableOpacity
          style={[ES.tempBorder,ES.bgPrimary,ES.p04,ES.centerItems,ES.bRadius10,ES.shadow1]}

          onPress={handleGrow}
        >
          <Text
            style={[ES.textLight,ES.f18,ES.fwB]}
          >
            Grow
          </Text>
          </TouchableOpacity>    
      </Animated.View>
    </View>
  )
}

export default ReanimatedExample1

const s = StyleSheet.create({
  main:{flex:1,justifyContent:'center',alignItems:'center'}
})