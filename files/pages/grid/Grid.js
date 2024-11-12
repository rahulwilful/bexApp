import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import ES from '../ES';
import { ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const sceenWidth = Dimensions.get('window').width;

const Grid = () => {
  return (
    
    <ScrollView style={[ES.main]}>
      <View style={[ES.py5,{flex:1,flexDirection:"row",gap:5,flexWrap:"wrap",justifyContent:"space-evenly"}]}>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger ]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
        <Text style={[ES.textLight, ES.f20,s.item,ES.bgDanger]}>Grid</Text>
      </View>
    </ScrollView>
  );
};

export default Grid;

const s = StyleSheet.create({
    item:{
        width:sceenWidth/2.2,
        height:sceenWidth/2.2,
        textAlign:"center",
        textAlignVertical:"center",
       
    },
  main: {
    backgroundColor: '#6443AF',
    width: '100%',
    height: screenHeight,
  },
  
});
