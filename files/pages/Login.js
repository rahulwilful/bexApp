import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import bex from '../assets/Texts/BexGroup.png';
import ProfileIcons from '../assets/Texts/ProfileIconsGroup.png';
import PlayIcon from '../assets/Texts/PlayIcon.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ES from './ES';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {toggleLogin} from '../../redux/action';

const screenHeight = Dimensions.get('window').height;

export default function Login({route}) {
  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log('number', number.length);

    if (number.length < 10) {
      ToastAndroid.showWithGravity(
        'Plzz Enter Valid Number ',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      return;
    }

    try {
      const res = await axios.post(
        `https://xpanse.dev.bexcart.com/auth/user/send-otp`,
        {
          mobile: number,
          hash: '123456',
        },
      );

      console.log('res', res);
      ToastAndroid.show(
        'OTP Sent TO *******' + number.slice(7, 10),
        ToastAndroid.SHORT,
      );
      setOtpSent(true);
    } catch (err) {
      console.log('error', err);
      ToastAndroid.show('Error Occured while sending OTP', ToastAndroid.SHORT);
    }
  };

  const handleVarifyOtp = async () => {
    if (otp.length < 6) {
      ToastAndroid.showWithGravity(
        'Plzz Enter Valid OTP ',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      return;
    }

    try {
      res = await axios.post(
        `https://xpanse.dev.bexcart.com/auth/user/verify-otp`,
        {
          mobile: number,
          otp: otp,
          isSignup: false,
        },
      );

      ToastAndroid.showWithGravity(
        'Login Successfull ',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );

      // console.log("OTP res",res.data.data)

      console.log('Token', res.data.data.token);

      await AsyncStorage.setItem('token', res.data.data.token);
      const temp = await AsyncStorage.getItem('token');
      console.log('token: ', temp);

      setTimeout(() => {
        //navigation.navigate('stackHome')
        dispatch(toggleLogin(true));
      }, 2000);
    } catch (err) {
      console.log('OTP error', err);
      ToastAndroid.showWithGravity(
        'something went wrong',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  const varifyIsLoggedIn = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('logout : ', token);

    if (token) {
      dispatch(toggleLogin(true));
      // navigation.navigate('stackHome')
    }
  };

  useEffect(() => {
    varifyIsLoggedIn();
  }, []);

  return (
    <ScrollView style={s.main}>
      <View style={[s.container, ES.py5, ES.px2]}>
        <View style={[]}>
          <View style={[]}>
            <View style={[ES.bex, ES.wfull]}>
              <View style={[ES.xCenter]}>
                <Image
                  source={bex}
                  style={{width: 115.04, height: 47.63, objectFit: 'contain'}}
                />
              </View>
              <View style={[ES.xCenter, ES.mt1]}>
                <Text style={[ES.textLight]}>
                  <Text style={{fontSize: 16}}>The Sharing Store</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={[]}>
            <View style={[ES.mt5, ES.overflowHidden]}>
              <View>
                <Image
                  source={ProfileIcons}
                  style={{width: 847.46, height: 154.97, objectFit: 'contain'}}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={[s.localM]}>
          <View style={[otpSent ? ES.dNone : ES.dBlock]}>
            <View style={[ES.mt3]}>
              <TextInput
                style={[ES.bgLight, ES.textDark, ES.bRadius10, ES.f20, ES.px1]}
                value={number}
                keyboardType="number-pad"
                onChangeText={setNumber}
                placeholder="Enter Mobile Number"
              />
            </View>

            <View style={[ES.mt2]}>
              <TouchableOpacity
                style={[
                  ES.yCenter,
                  ES.bRadius8,
                  {width: 351, height: 51, backgroundColor: '#9374D8'},
                ]}
                /*  onPress = {()=>navigation.navigate('stackHome',{name:'rahul'})} */
                onPress={() => handleLogin()}>
                <Text style={[ES.textLight, ES.fwM, ES.f18, ES.textCenter]}>
                  Send OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ///////////////////////////////////////////////////////////////////////////////////// */}

          <View
            style={[otpSent ? ES.dBlock : ES.dNone, ]}
            key={otpSent}>
            <View style={[ES.mt3]}>
              <TextInput
                style={[ES.bgLight, ES.textDark, ES.bRadius10, ES.f20, ES.px1]}
                value={otp}
                keyboardType="number-pad"
                onChangeText={setOtp}
                placeholder="Enter Enter OTP"
              />
            </View>

            <View style={[ES.mt2]}>
              <TouchableOpacity
                style={[
                  ES.yCenter,
                  ES.bRadius8,
                  {width: 351, height: 51, backgroundColor: '#9374D8'},
                ]}
                /*  onPress = {()=>navigation.navigate('stackHome',{name:'rahul'})} */
                onPress={() => handleVarifyOtp()}>
                <Text style={[ES.textLight, ES.fwM, ES.f18, ES.textCenter]}>
                  Verify OTP
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[ES.fx0,ES.alignItemsCenter,ES.mt2]}>
              <TouchableOpacity onPress={()=> setOtpSent(false)}>

              <Text style={[ES.textLight]}>
                  Edit Number
              </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[
              ES.mt2,
              {flex: 0, flexDirection: 'row', gap: 10},
              ES.yCenter,

              ES.py1,
            ]}>
            <View
              style={[
                {borderTopWidth: 1, borderColor: '#ffffff', flex: 1, height: 0},
              ]}></View>
            <Text style={[ES.textLight]}>OR</Text>

            <View
              style={[
                {borderTopWidth: 1, borderColor: '#ffffff', flex: 1, height: 0},
              ]}></View>
          </View>

          <View
            style={[
              {flex: 0, flexDirection: 'row', gap: 10},
              ES.xCenter,
              ES.mt1,
            ]}>
            <View style={[]}>
              <Text style={[ES.textLight, ES.f18, ES.fwB]}>Try The App</Text>
            </View>
            <View style={[]}>
              <Image source={PlayIcon} style={{objectFit: 'contain'}} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  main: {
    backgroundColor: '#6443AF',
    width: '100%',
    height: screenHeight,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  localM: {
    marginTop: '10%',
  },

  borderTop: {
    borderTop: 'solid',
  },

  borderTopPrimary: {
    borderColor: '#007bff',
  },

  borderTopWidth1: {
    borderTopWidth: 1,
  },

  borderStartWidth1: {
    borderStartWidth: 1,
  },

  borderEndWidth1: {
    borderEndWidth: 1,
  },

  borderBottumWidth1: {
    borderBottumWidth: 1,
  },

  bex: {},

  overflowHidden: {
    overflow: 'hidden',
  },

  textCenter: {
    textAlign: 'center',
  },

  f10: {
    fontSize: 10,
  },

  bRadius8: {
    borderRadius: 8,
  },

  bRadius10: {
    borderRadius: 8,
  },

  bgBlue: {
    backgroundColor: '#6443AF',
  },

  textBlue: {
    color: '#6443AF',
  },

  xCenter: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  yCenter: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textLight: {
    color: 'white',
  },

  borderPrimary: {
    borderColor: '#007bff', // Blue
  },
  borderSecondary: {
    borderColor: '#6c757d', // Gray
    borderWidth: 2,
  },
  borderSuccess: {
    borderColor: '#28a745', // Green
    borderWidth: 2,
  },
  borderDanger: {
    borderColor: '#dc3545', // Red
    borderWidth: 2,
  },
  borderWarning: {
    borderColor: '#ffc107', // Yellow
    borderWidth: 2,
  },

  borderTop: {},

  wfull: {
    width: '100%',
  },
  p1: {
    padding: 10,
  },
  p2: {
    padding: 20,
  },
  p3: {
    padding: 30,
  },
  p4: {
    padding: 40,
  },
  p5: {
    padding: 50,
  },

  px1: {
    paddingHorizontal: 10,
  },
  px2: {
    paddingHorizontal: 20,
  },
  px3: {
    paddingHorizontal: 30,
  },
  px4: {
    paddingHorizontal: 40,
  },
  px5: {
    paddingHorizontal: 50,
  },

  // Padding Y (Vertical)
  py1: {
    paddingVertical: 10,
  },
  py2: {
    paddingVertical: 20,
  },
  py3: {
    paddingVertical: 30,
  },
  py4: {
    paddingVertical: 40,
  },
  py5: {
    paddingVertical: 50,
  },

  // Padding Start
  ps1: {
    paddingStart: 10,
  },
  ps2: {
    paddingStart: 20,
  },
  ps3: {
    paddingStart: 30,
  },
  ps4: {
    paddingStart: 40,
  },
  ps5: {
    paddingStart: 50,
  },

  // Padding End
  pe1: {
    paddingEnd: 10,
  },
  pe2: {
    paddingEnd: 20,
  },
  pe3: {
    paddingEnd: 30,
  },
  pe4: {
    paddingEnd: 40,
  },
  pe5: {
    paddingEnd: 50,
  },

  // Padding Top
  pt1: {
    paddingTop: 10,
  },
  pt2: {
    paddingTop: 20,
  },
  pt3: {
    paddingTop: 30,
  },
  pt4: {
    paddingTop: 40,
  },
  pt5: {
    paddingTop: 50,
  },

  // Padding Bottom
  pb1: {
    paddingBottom: 10,
  },
  pb2: {
    paddingBottom: 20,
  },
  pb3: {
    paddingBottom: 30,
  },
  pb4: {
    paddingBottom: 40,
  },
  pb5: {
    paddingBottom: 50,
  },

  m1: {
    margin: 10,
  },
  m2: {
    margin: 20,
  },
  m3: {
    margin: 30,
  },
  m4: {
    margin: 40,
  },
  m5: {
    margin: 50,
  },

  // Margin X (Horizontal)
  mx1: {
    marginHorizontal: 10,
  },
  mx2: {
    marginHorizontal: 20,
  },
  mx3: {
    marginHorizontal: 30,
  },
  mx4: {
    marginHorizontal: 40,
  },
  mx5: {
    marginHorizontal: 50,
  },

  // Margin Y (Vertical)
  my1: {
    marginVertical: 10,
  },
  my2: {
    marginVertical: 20,
  },
  my3: {
    marginVertical: 30,
  },
  my4: {
    marginVertical: 40,
  },
  my5: {
    marginVertical: 50,
  },

  // Margin Start
  ms1: {
    marginStart: 10,
  },
  ms2: {
    marginStart: 20,
  },
  ms3: {
    marginStart: 30,
  },
  ms4: {
    marginStart: 40,
  },
  ms5: {
    marginStart: 50,
  },

  // Margin End
  me1: {
    marginEnd: 10,
  },
  me2: {
    marginEnd: 20,
  },
  me3: {
    marginEnd: 30,
  },
  me4: {
    marginEnd: 40,
  },
  me5: {
    marginEnd: 50,
  },

  // Margin Top
  mt1: {
    marginTop: 10,
  },
  mt2: {
    marginTop: 20,
  },
  mt3: {
    marginTop: 30,
  },
  mt4: {
    marginTop: 40,
  },
  mt5: {
    marginTop: 50,
  },

  // Margin Bottom
  mb1: {
    marginBottom: 10,
  },
  mb2: {
    marginBottom: 20,
  },
  mb3: {
    marginBottom: 30,
  },
  mb4: {
    marginBottom: 40,
  },
  mb5: {
    marginBottom: 50,
  },

  fwM: {
    fontWeight: 'medium',
  },
  fwB: {
    fontWeight: 'bold',
  },

  f12: {
    fontSize: 12,
  },

  f14: {
    fontSize: 14,
  },

  f16: {
    fontSize: 16,
  },

  f18: {
    fontSize: 18,
  },

  f20: {
    fontSize: 20,
  },

  f22: {
    fontSize: 22,
  },

  f24: {
    fontSize: 24,
  },
});
