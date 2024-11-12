import {View, Text, Image,FlatList} from 'react-native';
import React from 'react';
import ES from '../../ES';
import {
  BeveragesIcon,
  SnacksIcon,
  BodyIcon,
  CookingIcon,
  HealthIcon,
  BellIcon,
  MenuIcon,
  BexImage,
  SearchIcon2,
} from '../../IconsImages';
import { ScrollView} from 'react-native-gesture-handler';

const Category = () => {
  const Category = [
    {
      name: 'Beverages',
      icon: BeveragesIcon,
    },
    {
      name: 'Snacks',
      icon: SnacksIcon,
    },
    {
      name: 'Body',
      icon: BodyIcon,
    },
    {
      name: 'Cooking',
      icon: CookingIcon,
    },
    {
      name: 'Health',
      icon: HealthIcon,
    },
  ];
  return (
    <View style={[ ES.w100, ES.h100]}>
    
        <View
          style={[ES.fx1, ES.justifyContentCenter, ES.alignItemsStart]}>
          <View style={[ES.p1,ES.gap1, ]}>
            <FlatList 
            
            horizontal={true} 
            data={Category}
            renderItem={({item}) => (
              <View style={[ ES.flexColumn, ES.alignItemsCenter,ES.px1 ]}>
                <Image source={item.icon} style={{width: 56, height: 56}} />
                <View style={[]}>
                  <Text style={[ES.f14, ES.textCenter,ES.fwB]}>{item.name}</Text>
                </View>
              </View>
            )}
             
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />} 
            />

          {/*   {Category.map((item, index) => {
              return (
                <View style={[ES.borderDark, ES.flexColumn, ES.alignItemsCenter]}>
                  <Image source={item.icon} style={{width: 56, height: 56}} />
                  <View style={[]}>
                    <Text style={[ES.f14, ES.textCenter]}>{item.name}</Text>
                  </View>
                </View>
              );
            })} */}

        

            
          </View>
        </View>
      
    </View>
  );
};

export default Category;
