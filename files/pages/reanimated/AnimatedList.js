import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  useColorScheme,
} from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import ES from '../ES';

const AnimatedList = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);
  const [renderKey, setRenderKey] = useState(0);
  const [theme, setTheme] = useState(DarkTheme); // Set the initial theme as DefaultTheme

  const handleAdd = () => {
    setData(prevData => [...prevData, prevData[prevData.length - 1] + 1]);
    setRenderKey(prevKey => prevKey + 1);
  };

  const handleRemove = item => {
    setData(prevData => prevData.filter(val => val !== item));
    setRenderKey(prevKey => prevKey + 1);
  };

  // Toggle the theme
  const toggleTheme = () => {
    console.log("toggleTheme called")
    setTheme(theme === DefaultTheme ? DarkTheme : DefaultTheme);
  };

  return (
    <ThemeProvider value={DarkTheme}>
      <View style={[s.main]}>
        <View style={[s.buttonContainer]}>
          <Pressable style={[s.pressableAdd]} onPress={handleAdd}>
            <Text style={[ES.textCenter, ES.f20, ES.textPrimary, ES.fwB]}>ADD</Text>
          </Pressable>

          <Pressable style={[s.pressableTheme]} onPress={toggleTheme}>
            <Text style={[ES.textCenter, ES.f20, ES.textLight, ES.fwB]}>Change Theme</Text>
          </Pressable>
        </View>

        <View style={[]} key={renderKey}>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={[s.containerItem]}>
                  <Pressable
                    onPress={() => handleRemove(item)}
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, s.item]}>
                    <Text style={[ES.textCenter, ES.f20, ES.textLight, ES.fwB]}>
                      {item}
                    </Text>
                  </Pressable>
                </View>
              );
            }}
            keyExtractor={(item) => item.toString()}
          />
        </View>
      </View>
    </ThemeProvider>
  );
};

export default AnimatedList;

const s = StyleSheet.create({
  main: StyleSheet.flatten([ES.fx1, ES.relative]),
  buttonContainer: StyleSheet.flatten([ES.my1, ES.fx0, ES.centerItems, ES.gap1]),
  pressableAdd: StyleSheet.flatten([ES.centerItems, ES.bgDark, ES.w50, ES.bRadius10, ES.py04]),
  pressableTheme: StyleSheet.flatten([ES.centerItems, ES.bgDark, ES.w50, ES.bRadius10, ES.py04]),
  heading: StyleSheet.flatten([ES.f24, ES.fw700, ES.mb2]),
  containerItem: StyleSheet.flatten([ES.w100, ES.alignItemsCenter]),
  item: StyleSheet.flatten([ES.w80, ES.centerItems, ES.mb1, ES.bRadius10, ES.shadow1, ES.py1, ES.bgLightGreen]),
});
