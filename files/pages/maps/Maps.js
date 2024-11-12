import {
  View,
  Text,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import React, {useEffect} from 'react';
import ES from '../ES';
import {ScrollView} from 'react-native-gesture-handler';

import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';

const screenHeight = Dimensions.get('window').height;

const Maps = () => {
  const [currPossition, setCurrPossition] = React.useState(null);
  const [source, setSource] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [isChoosingSource, setIsChoosingSource] = React.useState(false);
  const [distance, setDistance] = React.useState(0);
  const [isChoosingDestination, setIsChoosingDestination] =
    React.useState(false);

  const [region, setRegion] = React.useState({
    latitude: 15.48915970427447,
    longitude: 73.81902173315255,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const getUsersCurrentLocation = () => {
    Geolocation.getCurrentPosition(position => {
      const tempRegion = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      console.log('curr pos', tempRegion);
      setCurrPossition(tempRegion);
    });
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getUsersCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleMapPress = event => {
    const cords = event.nativeEvent.coordinate;

    if (isChoosingSource) {
      setSource(cords);
      console.log('chooseing source', cords);
      setIsChoosingSource(false);
      setIsChoosingDestination(true);
    }

    if (isChoosingDestination) {
      setDestination(cords);
      console.log('chooseing destination', cords);
      setIsChoosingSource(false);
      setIsChoosingDestination(false);
      handleGetDistance(cords);
    }
  };

  const handleGetDistance = cords => {
    console.log('source', source);
    console.log('destination', destination);
    const distance =
      getDistance(
        {
          latitude: source.latitude,
          longitude: source.longitude,
        },
        {
          latitude: cords.latitude,
          longitude: cords.longitude,
        },
      ) / 1000;

    console.log('distance: ', distance, ' km');
    setDistance(distance);
  };

  const handleGetDragedDistance = () => {
    console.log('source', source);
    console.log('destination', destination);
    if(source == null || destination == null) return

    const distance =
      getDistance(
        {
          latitude: source.latitude,
          longitude: source.longitude,
        },
        {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
      ) / 1000;

    console.log('distance: ', distance, ' km');
    setDistance(distance);
  };

  useEffect(() => {
    handleGetDragedDistance();
  }, [source, destination]);

  const ShowDistance = () => {
    Alert.alert('Distance', distance + ' km');
  };



  return (
    <ScrollView>
      <View style={[ES.main, ES.p1]}>
        <View style={[s.container, ES.p1]}>
          <View
            style={[
              ES.w100,
              ES.fx0,
              ES.gap2,
              ES.flexRow,
              ES.justifyContentSpaceEvenly,
              ES.mb1,
            ]}>
            <TouchableOpacity
              style={[
                ES.p1,
                {backgroundColor: '#9374D8'},
                ES.rounded,
                ES.px2,
                ES.bRadius5,
              ]}
              onPress={() => {
                setIsChoosingSource(!isChoosingSource),
                  setIsChoosingDestination(false);
              }}>
              <Text style={[ES.textLight, ES.fwB, ES.f16]}>
                {isChoosingSource
                  ? 'Choose Current Location'
                  : 'Current Location'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                ES.p1,
                {backgroundColor: '#9374D8'},
                ES.rounded,
                ES.px2,
                ES.bRadius5,
              ]}
              onPress={() => {
                setIsChoosingDestination(!isChoosingDestination),
                  setIsChoosingSource(false);
              }}>
              <Text style={[ES.textLight, ES.fwB, ES.f16]}>
                {isChoosingDestination ? 'Choose Destination' : 'Destination'}
              </Text>
            </TouchableOpacity>

            <View
              style={[
                source &&
                destination &&
                isChoosingDestination == false &&
                isChoosingSource == false
                  ? ES.dBlock
                  : ES.dNone,
              ]}>
              <TouchableOpacity
                style={[ES.p1, ES.bgDanger, ES.rounded, ES.px2, ES.bRadius5]}
                onPress={() => {
                  setSource(null);
                  setDestination(null);
                }}>
                <Text style={[ES.textLight, ES.fwB, ES.f16]}>Clear </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}
          <View
            style={[
              source &&
              destination &&
              isChoosingDestination == false &&
              isChoosingSource == false
                ? ES.dBlock
                : ES.dNone,
              ES.mb1,
            ]}>
            <TouchableOpacity
              style={[ES.p1, ES.bgLight, ES.rounded, ES.px2, ES.bRadius5]}
              onPress={()=>ShowDistance()}
              >
              <Text style={[ES.textDark, ES.fwB, ES.f16]}>{distance} km</Text>
            </TouchableOpacity>
          </View>

          {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

          <View style={[ES.w100, ES.h70,ES.p1,ES.bgLight,ES.bRadius5,ES.shadow10]}>
            <MapView
              style={[ES.w100, ES.h100]}
              region={currPossition || region} 
              showsUserLocation={true}
              onRegionChangeComplete={region => console.log(region)}
              onPress={handleMapPress}>
              <Marker
                coordinate={region || region} 
                title="Your Location"
              />
              {source != null ? (
                <Marker
                  coordinate={source} 
                  title="Source"
                  pinColor="green"
                  draggable={true}
                  onDragEnd={(e)=>setSource(e.nativeEvent.coordinate)}
                />
              ) : (
                ''
              )}

              {destination != null ? (
                <Marker
                  coordinate={destination} 
                  title="Destination"
                  pinColor="blue"
                  draggable={true}
                  onDragEnd={(e)=>setDestination(e.nativeEvent.coordinate)}
                />
              ) : (
                ''
              )}

              {source && destination ? (
                <Polyline coordinates={[source, destination]} />
              ) : (
                ''
              )}
            </MapView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Maps;

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },

  main: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: screenHeight,
  },

});
