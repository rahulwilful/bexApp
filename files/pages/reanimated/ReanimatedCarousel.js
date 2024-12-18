import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ES from '../ES';
import {Banner1} from '../IconsImages';
import {useSelector} from 'react-redux';
import Animated from 'react-native-reanimated';

const ReanimatedCarousel = () => {
  const width = Dimensions.get('window').width;
  const data = [Banner1, Banner1, Banner1, Banner1, Banner1];
  const carouselRef = useRef(null); // Reference to the carousel
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide

  const banners = useSelector(state => state.banners);
  console.log('banners: ', banners[0].banners[0].bannerImage);

  const goToSlide = index => {
    carouselRef.current?.scrollTo({index,Animated:true}); // Use scrollTo method with an index
    setActiveIndex(index); // Update the active dot
  };

  return (
    <View style={s.main}>
     

<View style={[s.banners]}>
        <Carousel
          ref={carouselRef} // Attach ref to the carousel
          loop
          scrollAnimationDuration={2000}
          autoPlay={true}
          autoPlayInterval={5000}
          onSnapToItem={index => setActiveIndex(index)} // Track active slide
          data={banners}
          mode={"horizontal-stack"}
          modeConfig={{
              snapDirection: "left",
              stackInterval: 18,
          }}
          renderItem={({item}) => (
            <View style={[,ES.overflowHidden,ES.bRadius5]}>
                
            <Image
              source={{uri: item.banners[0].bannerImage}}
              style={{width: '100%', height: width / 2}}
              />
              </View>
          )}
          width={width }
          height={width / 2}
        />

        <View style={s.pagination}>
          {banners.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => goToSlide(index)}>
              <View
                style={[
                  s.dot,
                  activeIndex === index ? s.activeDot : s.inactiveDot,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={s.controls}>
        <TouchableOpacity
          style={s.button}
          onPress={() => carouselRef.current?.prev()} // Navigate to the previous slide
        >
          <Text style={s.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={s.button}
          onPress={() => carouselRef.current?.next()} // Navigate to the next slide
        >
          <Text style={s.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReanimatedCarousel;

// Styles
const s = StyleSheet.create({
  main: StyleSheet.flatten([ES.fx1, ES.relative]),

  heading: StyleSheet.flatten([ES.f24, ES.fw700, ES.mb2]),

  pagination:StyleSheet.flatten([ES.flexRow,ES.centerItems,ES.my06,ES.absolute,ES.w100,ES.bottom10]),

  banners: StyleSheet.flatten([ ES.relative]),

  activeDot: StyleSheet.flatten([
    ES.ws20,
    ES.hs10,
    ES.bRadius5,
    ES.mx06,
    {
      backgroundColor: '#007BFF', // Active dot color
    },
  ]),
  inactiveDot: StyleSheet.flatten([
    ES.ws10,
    ES.hs10,
    ES.bRadius5,
    ES.mx06,
    {
      backgroundColor: '#D3D3D3', // Active dot color
    },
  ]),
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});



 {/* <Image source={data[0]} style={{width: '100%', height: 200}} /> */}

      {/* <View style={[s.banners]}>
        <Carousel
          ref={carouselRef} // Attach ref to the carousel
          loop
          scrollAnimationDuration={2000}
          autoPlay={true}
          autoPlayInterval={5000}
          onSnapToItem={index => setActiveIndex(index)} // Track active slide
          data={banners}
          mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
          renderItem={({item}) => (
            <View style={[,ES.overflowHidden,ES.bRadius5]}>
                
            <Image
              source={{uri: item.banners[0].bannerImage}}
              style={{width: '100%', height: width / 2}}
              />
              </View>
          )}
          width={width }
          height={width / 2}
        />

        <View style={s.pagination}>
          {banners.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => goToSlide(index)}>
              <View
                style={[
                  s.dot,
                  activeIndex === index ? s.activeDot : s.inactiveDot,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View> */}