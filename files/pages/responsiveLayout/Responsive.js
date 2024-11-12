import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import ES from '../ES';
import {ScrollView} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const sceenWidth = Dimensions.get('window').width;

const Responsive = () => {
  return (
    <ScrollView>
      <View style={[ES.main, ES.p1, {gap: 5}]}>
        <View style={[ES.fx2, ES.bgInfo, ES.flexRow, ES.p1, ES.gap2]}>
          <View style={[ES.fx3, ES.bgSuccess]}></View>
          <View style={[ES.fx2, ES.bgSecondary]}></View>
          <View style={[ES.fx1, ES.bgWarning]}></View>
        </View>
        <View style={[ES.fx1, ES.bgPrimary]}></View>
        <View style={[ES.fx1, ES.bgDanger]}></View>
      </View>
    </ScrollView>
  );
};

export default Responsive;

const s = StyleSheet.create({
  item: {
    width: sceenWidth / 2.2,
    height: sceenWidth / 2.2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  main: {
    backgroundColor: '#6443AF',
    width: '100%',
    height: screenHeight,
  },
});
