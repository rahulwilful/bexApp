import 'react-native-gesture-handler';
import React, {useEffect, useState, View, Text} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from './files/pages/Login';
import Home from './files/pages/Home/Home';
import Register from './files/pages/Register';

import Grid from './files/pages/grid/Grid';
import Responsive from './files/pages/responsiveLayout/Responsive';

import Maps from './files/pages/maps/Maps';
import Slider from './files/pages/slider/Slider';
import Cart from './files/pages/cart/Cart';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, setBanners, setCategories, setTopDeals, setTopSellers, toggleLogin} from './redux/action';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import axiosClient from './axiosClient';
import CashFree from './files/pages/cashFree/CashFree';
import CheckOut from './files/pages/checkOut/CheckOut';
import { DarkCartIcon, HomeIcon } from './files/pages/IconsImages';
import PaymentFailure from './files/pages/checkOut/PaymentFailure';
import PaymentSuccess from './files/pages/checkOut/PaymentSuccess';


const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const isLoggedGlobal = false;

function Logout() {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(toggleLogin(false)); // Use dispatch here
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <View style={{display: 'hidden'}}>test </View>;
}

function DrawerNav() {
  const dispatch = useDispatch(); // Add dispatch here

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
       
      }}>

      <Drawer.Screen
        name="Main"
        component={TabNav}
        initialParams={{name: 'Guest'}}
        options={({route}) => ({
          title: route.params?.name,
        })}
      />

    </Drawer.Navigator>
  );
}

function TabNav() {
  return (
    <Tab.Navigator
      initialRouteName="TabHome"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6443AF',
        
      }}>

      <Tab.Screen
        name="TabHome"
        component={Home}
        options={{
          title: 'Home',
          tabBarLabelStyle: {
            fontSize: 14,
          },
          
          
          tabBarIcon: ({focused}) => (
            <Image
              source={HomeIcon}
              style={{
                width: 34,
                height: 34,
                tintColor: focused ? '#6443AF' : 'black', 
              }}
            />
          ),
        }}
      />

      <Tab.Screen name="TabCart" component={AuthorizedNav} options={{title: 'Cart', tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({focused}) => (
            <Image
              source={DarkCartIcon}
              style={{
                width: 27,
                height: 27,
                tintColor: focused ? '#6443AF' : 'black', // Optional: Change color dynamically
              }}
            />
          ),
         
      }}
      />

      

   
    
    
    </Tab.Navigator>
  );
}

function AuthorizedNav() {
  return (
    <Stack.Navigator
      initialRouteName="stackCart"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="stackHome"
        component={Home}
        initialParams={{name: 'Guest'}}
        options={({route}) => ({
          title: route.params?.name,
        })}
      />

      <Stack.Screen name="stackGrid" component={Grid} />
      <Stack.Screen
        name="stackCart"
        component={Cart}
        options={{
          headerShown: true,
          headerTitle: 'My Cart',
        }}
      />

      <Stack.Screen
        name="stackCheckOut"
        options={{
          headerShown: true,
          headerTitle: 'Check Out',
        }}
        component={CheckOut}
       
      />

      <Stack.Screen
        name="stackPaymentSuccess"
        options={{
          headerShown: true,
          headerTitle: 'Success',
        }}
        component={PaymentSuccess}
       
      />

      <Stack.Screen
        name="stackPaymentFailure"
        options={{
          headerShown: true,
          headerTitle: 'Error',
        }}
        component={PaymentFailure}
       
      />



    </Stack.Navigator>
  );
}

function UnAuthorizedNav() {
  return (
    <Stack.Navigator
      initialRouteName="stackLogin"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="stackLogin" component={Login} />

      <Stack.Screen name="stackRegister" component={Register} />
    </Stack.Navigator>
  );
}

const App = () => {
  const [isLogged, setIsLogged] = useState(null);
  const dispatch = useDispatch();
  const login = useSelector(state => state.auth);
  const categorys = useSelector(state => state.category);
  const cart = useSelector(state => state.cart)
  const topDeals = useSelector(state => state.topDeals)
  const topSellers = useSelector(state => state.topSellers)
  const banners = useSelector(state => state.banners)
  



  useEffect(() => {
    const getData = async () => {

      try{
        const categoryRes = await axiosClient.get(
          `category?status=true&noLimit=true`,
        );
       
        dispatch(setCategories(categoryRes.data.data));
      }catch(err){
        console.log("error",err)
      }

      try{
        const topDealsRes = await axiosClient.get(
          `product/list?limit=8&page=1&category=&type=C&brand=&pricing=&sortBy=&isBexPromise=&isCombo=true`,
        );
       
        dispatch(setTopDeals(topDealsRes.data.data));
      }catch(err){
        console.log("error",err)
      }

      try{
        const topSellersRes = await axiosClient.get(
          `/product/topSelling?limit=8&page=1&brand=&pricing=&isBexPromise=&fromDate=2024-01-16&toDate=2024-11-15&isPackage=false`,
        );
       //console.log("topSellersRes: ",topSellersRes.data.data.topProducts[0].product.thumbnailImage.filePath)
        dispatch(setTopSellers(topSellersRes.data.data));
      }catch(err){
        console.log("error",err)
      } 

      try{

        const bannersRes = await axiosClient.get(
          `/cms/banner/withTypes`,
        );

        //console.log("bannersRes: ",bannersRes.data.data)
        dispatch(setBanners(bannersRes.data.data));
      }catch(err){
        console.log("error",err)
      }

      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLogged(true);
        dispatch(toggleLogin(true));
      } else {
        setIsLogged(false);
        dispatch(toggleLogin(false));
      }
    };

    getData();
  }, []);


  useEffect(() => {
    if(cart.length>0){

    }
    console.log("redux cart: ",cart.length);
  },[cart])

 
  /*

  useEffect(() => {
    if(categorys.length>0){

      console.log("categorys: ",categorys)
    }
  },[categorys])
  
  */

  useEffect(() => {
    console.log('App login: ', login);
    setIsLogged(login);
  }, [login]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {login == true ? (
          <DrawerNav />
        ) : login == false ? (
          <UnAuthorizedNav />
        ) : null}
        {/*   <DrawerNav /> */}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
