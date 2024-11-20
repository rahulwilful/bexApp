import {View, Text, Image,FlatList} from 'react-native';
import React from 'react';
import ES from '../pages/ES';
import {
  BeveragesIcon,
  SnacksIcon,
  BodyIcon,
  CookingIcon,
  HealthIcon,
  HomeIcon,
  BellIcon,
  MenuIcon,
  BexImage,
  SearchIcon2,
} from '../pages/IconsImages';
import { ScrollView} from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const Category = () => {

  const Category = useSelector(state => state.category)
  if (!Category || Category.length === 0) {
    return <Text>No categories available</Text>;
  }
  return (
    <View style={[ ES.w100, ]}>
    
        <View
          style={[ES.fx0, ES.justifyContentCenter, ES.alignItemsStart]}>
          <View style={[ES.p1,ES.gap1, ]}>
            <FlatList 
            showsHorizontalScrollIndicator={false}
            horizontal={true} 
            data={Category}
            renderItem={({item}) => (
              <View style={[ ES.flexColumn, ES.alignItemsCenter,ES.px1 ]}>
                <View style={[{borderRadius: 50,backgroundColor:`#${item.hexColour}`},]}> 
                  
                <Image source={{uri: item.attachment?.filePath}} style={{width: 56, height: 56}} />
                </View>
                <View style={[]}>
                  <Text style={[ES.f14, ES.textCenter,ES.fwB]}>{item.name}</Text>
                </View>
              </View>
            )}
             
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />} 
            />

         

        

            
          </View>
        </View>
      
    </View>
  );
};

export default Category;
