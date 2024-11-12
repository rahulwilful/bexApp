import 'react-native-gesture-handler';
import React,{ useEffect, useState,View ,Text} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from './files/pages/Login';
import Home from './files/pages/Home/Home';
import Register from './files/pages/Register';

import Grid from './files/pages/grid/Grid';
import Responsive from './files/pages/responsiveLayout/Responsive';

import Maps from './files/pages/maps/Maps';


import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLogin } from './redux/action';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';



const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const isLoggedGlobal = false;


function Logout() {

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(toggleLogin(false)); // Use dispatch here
  };

  useEffect(()=>{
    handleLogout();
  },[])

  return (
    <View style={{display:"hidden"}}>test  </View>
  )
}



function DrawerNav() {

  const dispatch = useDispatch(); // Add dispatch here

 

  return (
   
  

    <Drawer.Navigator 
    screenOptions={{
      headerShown: false,
    }}
    >
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
      }}>

      <Tab.Screen name="TabHome" component={AuthorizedNav} />

     {

     /*
        <Tab.Screen name="TabRegister" component={Register} />
        <Tab.Screen name="TabLogin" component={Login} />
    */
   
    }

      <Tab.Screen name="TabMaps" component={Maps} />
    </Tab.Navigator>
  );
}



function AuthorizedNav() {
  return (
    <Stack.Navigator
      initialRouteName="stackHome"
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
    </Stack.Navigator>
  );
}


function UnAuthorizedNav(){
  return(

    <Stack.Navigator
      initialRouteName="stackLogin"
      screenOptions={{
        headerShown: false,
      }}
    >
      

      <Stack.Screen name="stackLogin" component={Login} />

      <Stack.Screen name="stackRegister" component={Register} />

   
    </Stack.Navigator>
  )
}




const App = () => {

  const [isLogged, setIsLogged] = useState(null);
  const dispatch = useDispatch();
  const login = useSelector((state) => state.reducer);

  useEffect(() => {
    const getIsLogged = async () => {

      const token = await AsyncStorage.getItem('token');
      if(token){
        setIsLogged(true);
        dispatch(toggleLogin(true));
      }else{
        setIsLogged(false);
        dispatch(toggleLogin(false));
      }
    };

    getIsLogged();
  }, []);

  

  useEffect(()=>{
    console.log("App login: ",login)
    setIsLogged(login);
  },[login])


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {
          login == true ?  <DrawerNav /> : login == false ? <UnAuthorizedNav /> : null
        }
       {/*   <DrawerNav /> */}
      
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;







/* function AuthorizedNav() {
  return (
    <Stack.Navigator
      initialRouteName="stackHome"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="stackLogin" component={Login} />
      <Stack.Screen
        name="stackHome"
        component={Home}
        initialParams={{name: 'Guest'}}
        options={({route}) => ({
          title: route.params?.name,
        })}
      />
      <Stack.Screen name="stackRegister" component={Register} />
    </Stack.Navigator>
  );
} */

{
  /*   <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={AuthorizedNav} />

          <Drawer.Screen
            name="Main"
            component={Home}
            initialParams={{name: 'Guest'}}
            options={({route}) => ({
              title: route.params?.name,
            })}
          />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
      </NavigationContainer> */
}

{
  /*
          <Drawer.Navigator >

<Drawer.Screen name="Home" component={AuthorizedNav} />

<Drawer.Screen name="Main" component={Home}
initialParams={{ name: 'Guest' }}
options={({ route }) => ({
  title: route.params?.name,
  })} />
  <Drawer.Screen name="Login" component={Login} />
  <Drawer.Screen name="Register" component={Register} />
  </Drawer.Navigator>
   */
}
