import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ES from '../ES';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const OnScrollAnimation = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef(null);
  const [data, setData] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  ]);
  useEffect(()=>{
    listRef.current.scrollToIndex({
        index:selectedIndex,
        animated: true})
        console.log("selectedIndex: ",selectedIndex, " data.length: ",data.length)
  },[selectedIndex])
 
  return (
    
      <View style={s.main}>
        <View style={[ES.fx0,ES.py1]} >
          <FlatList
            data={data}
            ref={listRef}
            initialScrollIndex={selectedIndex}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[s.horizontalList]}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    s.horizontalListItem,
                    index == selectedIndex ? ES.bgDark : ES.bgLightGreen,
                  ]}>

                  <Text style={[ES.textLight, ES.f16, ES.fwB]}> {item} </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={[ES.fx1]}>
          <FlatList
            data={data}
            onScroll = { event => {
                const ind = event.nativeEvent.contentOffset.y/data.length
                setSelectedIndex(ind.toFixed(0))
            }}
            contentContainerStyle={[s.verticalList]}
            renderItem={({item}) => {
              return (
                <View style={[s.verticalListItemParent]}>
                  <TouchableOpacity
                    onPress={() => setSelectedIndex(item)}
                    style={[s.verticalListItemChild]}>
                    <Text style={[ES.textLight, ES.f16, ES.fwB]}>{item}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
   
  );
};

export default OnScrollAnimation;

const s = StyleSheet.create({
  main: StyleSheet.flatten([ES.fx1,ES.flexRow]),
  horizontalList: StyleSheet.flatten([ES.fx0, ES.p1, ES.gap4]),
  horizontalListItem: StyleSheet.flatten([
    ES.p08,
    ES.shadow1,

    ES.bRadius5,
    ES.centerItems,
    ES.ws45,
  ]),
  verticalList: StyleSheet.flatten([ES.fx0, ES.p1, ES.gap3, ES.w100]),
  verticalListItemParent: StyleSheet.flatten([ES.fx0, ES.centerItems, ES.w100]),
  verticalListItemChild: StyleSheet.flatten([
    ES.p08,
    ES.shadow1,
    ES.bgDark,
    ES.bRadius5,
    ES.centerItems,
    ES.w90,
  ]),
});
