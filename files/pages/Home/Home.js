import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  Touchable,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import bex from '../../assets/Texts/BexGroup.png';
import ProfileIcons from '../../assets/Texts/ProfileIconsGroup.png';
import PlayIcon from '../../assets/Texts/PlayIcon.png';

import LinearGradient from 'react-native-linear-gradient';

import Carousel, {Pagination} from 'react-native-snap-carousel';

import {
  BellIcon,
  MenuIcon,
  SearchIcon,
  BexImage,
  Banner1,
  Poha1Product,
  Poha2Product,
  Poha3Product,
  Poha4Product,
  Poha5Product,
  Poha6Product,
  Poha7Product,
  BexPromiseIcon,
  ShareIcon,
  HeartIcon,
  HeartBlueIcon,
  RupeeSymbol,
  BexCoin,
  BexPromiseIconLg,
  RupeeBagIcon,
  BexCoinLgIcon,
  CookingIcon,
  BodyIcon,
  DrinksIcon,
  HomeIcon,
  HealthIcon,
  SnacksIcon,
  ActiyoLuxuryLogo,
} from '../IconsImages';

import {ProductsArray, NewLanchArray} from '../../components/Constants';

import ES from '../ES';
import {useNavigation} from '@react-navigation/native';

import {toggleLogin} from '../../../redux/action';
import {FlatList, ScrollView, TextInput} from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const sceenWidth = Dimensions.get('window').width;

import Header from '../../components/Header';
import Category from '../../components/Category';
import Body from '../../components/Body';
import Banner from '../../components/Banner';

import Products from '../../components/Products';
import ProductComponetHorizontal from '../../components/ProductComponetHorizontal';
import ProductComponetVertical from '../../components/ProductComponetVertical';

export default function Home({route}) {
  const [search, setSearch] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const [originalData, setOriginalData] = useState([]);
  const [renderKey, setRenderKey] = useState(0);
  const [topSellers, setTopSellers] = useState([]);

  const [showAllTopDeals, setShowAllTopDeals] = useState(false);
  const [showAllNewLaunches, setShowAllNewLaunches] = useState(false);
  const [showAllTopSellers, setShowAllTopSellers] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const topDeals = useSelector(state => state.topDeals);
  const tempTopSellers = useSelector(state => state.topSellers);
  const banners = useSelector(state => state.banners);
  const cart = useSelector(state => state.cart);
  const [cartSize, setCartSize] = useState(cart.length);

  const updateRenderKey = () => {
    console.log('home updateRenderKey renderKey: ', renderKey);
    setRenderKey(renderKey + 1);
  };

  useEffect(() => {
    updateRenderKey();
    console.log('home renderKey: ', renderKey);
  }, [cart]);

  useEffect(() => {
    let temp = [];
    for (let i in tempTopSellers.topProducts) {
      temp.push(tempTopSellers.topProducts[i].product);
    }
    setTopSellers(temp);
  }, []);

  useEffect(() => {
    //console.log('home topSellers: ', topSellers.topProducts[0]?.product.thumbnailImage.filePath);
  }, [topSellers]);

  const navigation = useNavigation();
  const name = route.params?.name;
  let login = false;
  const dispatch = useDispatch();

  const varifyUser = async () => {
    const token = await AsyncStorage.getItem('token');
    //console.log('token : ', token);
  };

  useEffect(() => {
    varifyUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(toggleLogin(login));
  };

  const handleSearch = async searchValue => {
    console.log('seacrh value: ', searchValue);
  };

  useEffect(() => {
    console.log(ProductsArray);

    setRenderKey(renderKey + 1);
  }, [ProductsArray]);

  const renderItem = ({item}) => {
    let isProductImages = false;

    if (item.banners[0].bannerImage) isProductImages = true;

    return (
      <View style={[ES.w100, ES.overflowHidden, ES.bRadius5, ES.shadow1]}>
        <Banner banner={item} />
      </View>
    );
  };
  let tempData = [
    Banner1,
    Banner1,
    Banner1,
    Banner1,
    Banner1,
    Banner1,
    Banner1,
  ];

  useEffect(() => {
    console.log('home');
  }, []);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={[s.main]} contentContainerStyle={{flexGrow: 1}}>
        <View style={[ES.w100]}>
          <Header handleSearch={handleSearch} />
        </View>

        <View style={[s.container]}>
          <View style={[ES.w100]}>
            <Category />
          </View>

          <View style={[ES.my1, ES.hs210, ES.relative, ES.w100]}>
            <View style={[ES.w100]}>
              <Carousel
                data={banners}
                renderItem={renderItem}
                sliderWidth={sceenWidth}
                itemWidth={sceenWidth}
                loop={true} // Enables infinite scrolling
                onSnapToItem={index => setActiveSlide(index)}
                parallaxFactor={banners.length}
                showSpinner={true}
                layout={'default'}
              />
            </View>
            <View style={[ES.absolute, ES.top70, ES.z10, ES.w100, ES.pt08]}>
              <Pagination
                dotsLength={banners.length} // Number of items
                activeDotIndex={activeSlide} // Active dot index
                dotStyle={[
                  {
                    width: 20,
                    height: 6,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgb(211, 211, 211)',
                  },
                  ES.shadow3,
                ]}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
            </View>
          </View>

          <View style={[ES.w100, ES.py06, ES.my1]}>
            <View style={[ES.hs180]}>
              <View style={[ES.fx3, ES.centerItems]}>
                <View
                  style={[
                    ES.bgLightGreen,
                    ES.w92,
                    ES.bRadius5,
                    ES.flexRow,
                    ES.centerItems,
                    ES.h90,
                    ES.gap4,
                  ]}>
                  <View style={[]}>
                    <Image source={RupeeBagIcon} style={[]} />
                  </View>
                  <View style={[]}>
                    <Text style={[ES.fwSB, ES.f18, ES.textLight]}>
                      {' '}
                      Total Savings:{' '}
                    </Text>
                  </View>
                  <View style={[]}>
                    <Text style={[ES.fwSB, ES.f20, ES.textLight]}> ₹3500</Text>
                  </View>
                </View>
              </View>
              <View style={[ES.fx4, ES.alignItemsCenter]}>
                <View
                  style={[
                    ES.flexRow,
                    ES.h100,
                    ES.w92,
                    ES.justifyContentCenter,
                  ]}>
                  <View style={[ES.fx1, ES.py1]}>
                    
                      <LinearGradient
                        colors={['#3F1869', '#602A9A']} // Define your gradient colors
                        style={[ES.w95, ES.h98, ES.bRadius5,]}>
                        <View style={[ES.fx1, ES.p02, ES.centerItems]}>
                          <Text style={[ES.textCenter, ES.f12, ES.textLight]}>
                            Don’t Just Collect
                          </Text>

                          <Text style={[ES.textCenter, ES.f12, ES.textLight]}>
                            Buy With BEX Coins
                          </Text>
                        </View>
                      <View style={[ES.fx1, ES.centerItems]}>
                        <Image source={BexCoinLgIcon} />
                      </View>
                      </LinearGradient>
                    
                  </View>
                  <View style={[ES.fx1, ES.py1, ES.alignItemsEnd]}>
                    <LinearGradient   colors={['#016565', '#008282']} style={[ES.w95, ES.h98, ES.bRadius5, ES.bgDarkGreen]}>
                      <View style={[ES.fx1, ES.p02, ES.centerItems]}>
                        <Text style={[ES.textCenter, ES.f12, ES.textLight]}>
                          Get Lowest Prices
                        </Text>

                        <Text style={[ES.textCenter, ES.f12, ES.textLight]}>
                          In The Market With
                        </Text>
                      </View>
                      <View style={[ES.fx1, ES.centerItems]}>
                        <Image source={BexPromiseIconLg} />
                      </View>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={[{backgroundColor: '#EBF0F6'}, ES.w100, ES.pb2]}>
            <View style={[ES.fx0, ES.py1]}>
              <Text style={[ES.subHeadingText, ES.textCenter]}>
                Top Discounts
              </Text>
            </View>

            <View style={[ES.w100]} key={cart.length}>
              <FlatList
                data={showAllTopDeals ? topDeals : topDeals.slice(0, 4)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={[ES.w100, {paddingHorizontal: '2.5%'}]}
                /* columnWrapperStyle={s.columnWrapper} */
                renderItem={({item}) => {
                  return (
                    <View style={[ES.m04, {flex: 0.5}]}>
                      <ProductComponetVertical product={item} />
                    </View>
                  );
                }}
              />
            </View>
            <View style={[ES.py1]}>
              <TouchableOpacity
                onPress={() => setShowAllTopDeals(!showAllTopDeals)}>
                <Text style={[ES.f14, ES.fwM, ES.textCenter, ES.textDark]}>
                  {showAllTopDeals ? 'View Less' : 'View All'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[ES.fx0, ES.gap2, ES.mb1, ES.bgLight, ES.w100]}>
            <View style={[ES.fx0, ES.pt1]}>
              <Text style={[ES.subHeadingText, ES.textCenter]}>
                New Launches
              </Text>
            </View>

            <View style={[ES.w100, ES.fx0, ES.gap1]} key={cart.length}>
              <FlatList
                data={showAllNewLaunches ? topDeals : topDeals.slice(0, 3)}
                contentContainerStyle={[ES.fx0, ES.gap3, ES.pb1]}
                renderItem={({item}) => (
                  <ProductComponetHorizontal product={item} shadow={false} />
                )}
              />
            </View>

            <View style={[ES.py1]}>
              <TouchableOpacity
                onPress={() => {
                  setShowAllNewLaunches(!showAllNewLaunches);
                }}>
                <Text style={[ES.f14, ES.fwM, ES.textCenter, ES.textDark]}>
                  {showAllNewLaunches ? 'View Less' : 'View All'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[{backgroundColor: '#F0E8E5'}, ES.w100, ES.pb2]}>
            <View style={[ES.fx0, ES.py1]}>
              <Text style={[ES.subHeadingText, ES.textCenter]}>
                TOP SELLERS
              </Text>
            </View>

            <View
              style={[
                ES.w100,
                ES.fx0,
                ES.flexRow,
                ES.flexWrap,
                ES.justifyContentCenter,
                ES.gap1,
              ]}
              key={cart.length}>
              <FlatList
                data={showAllTopSellers ? topSellers : topSellers.slice(0, 4)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={[ES.w100, {paddingHorizontal: '2.5%'}]}
                renderItem={({item}) => {
                  return (
                    <View style={[ES.m04, {flex: 0.5}]}>
                      <ProductComponetVertical product={item} />
                    </View>
                  );
                }}
              />
            </View>
            <View style={[ES.py1]}>
              <TouchableOpacity
                onPress={() => {
                  setShowAllTopSellers(!showAllTopSellers);
                }}>
                <Text style={[ES.f14, ES.fwM, ES.textCenter, ES.textDark]}>
                  {showAllTopSellers ? 'View Less' : 'View All'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[ES.w92, ES.my2]}>
            <View style={[ES.w100]}>
              <Image
                source={Banner1}
                style={[ES.w100, ES.objectFitCover, ES.bRadius5]}
              />
            </View>

            <View style={[ES.mt1, ES.flexRow, ES.hs270]}>
              <View style={[ES.fx1]}>
                <View style={[ES.fx1, ES.justifyContentCenter]}>
                  <View
                    style={[
                      ES.w96,
                      ES.h89,
                      ES.flexRow,
                      ES.justifyContentCenter,
                      ES.alignItemsCenter,
                      ES.gap2,
                      ES.bRadius10,
                      {backgroundColor: '#EBC6AC'},
                    ]}>
                    <Image source={CookingIcon} />
                    <Text style={[ES.fwM, ES.f18, ES.textDark]}>Cooking</Text>
                  </View>
                </View>
                <View style={[ES.fx1, ES.justifyContentCenter]}>
                  <View
                    style={[
                      ES.w96,
                      ES.h89,

                      ES.flexRow,
                      ES.justifyContentCenter,
                      ES.alignItemsCenter,
                      ES.gap2,
                      ES.bRadius10,
                      {backgroundColor: '#D9D3FF'},
                    ]}>
                    <Image source={BodyIcon} />
                    <Text style={[ES.fwM, ES.f18, ES.textDark]}>Body</Text>
                  </View>
                </View>
                <View style={[ES.fx1, ES.justifyContentCenter]}>
                  <View
                    style={[
                      ES.w96,
                      ES.h89,

                      ES.flexRow,
                      ES.justifyContentCenter,
                      ES.alignItemsCenter,
                      ES.gap2,
                      ES.bRadius10,
                      {backgroundColor: '#F2E481'},
                    ]}>
                    <Image source={DrinksIcon} />
                    <Text style={[ES.fwM, ES.f18, ES.textDark]}>Drinks</Text>
                  </View>
                </View>
              </View>

              <View style={[ES.fx1]}>
                <View
                  style={[ES.fx1, ES.justifyContentCenter, ES.alignItemsEnd]}>
                  <View
                    style={[
                      ES.w96,
                      ES.h89,

                      ES.flexRow,
                      ES.justifyContentCenter,
                      ES.alignItemsCenter,
                      ES.gap2,
                      ES.bRadius10,
                      {backgroundColor: '#EBC6AC'},
                    ]}>
                    <Image source={HomeIcon} />
                    <Text style={[ES.fwM, ES.f18, ES.textDark]}>Home</Text>
                  </View>
                </View>
                <View
                  style={[ES.fx1, ES.justifyContentCenter, ES.alignItemsEnd]}>
                  <View
                    style={[
                      ES.w96,
                      ES.h89,

                      ES.flexRow,
                      ES.justifyContentCenter,
                      ES.alignItemsCenter,
                      ES.gap2,
                      ES.bRadius10,
                      {backgroundColor: '#A2FAFB'},
                    ]}>
                    <Image source={HealthIcon} />
                    <Text style={[ES.fwM, ES.f18, ES.textDark]}>Health</Text>
                  </View>
                </View>
                <View
                  style={[ES.fx1, ES.justifyContentCenter, ES.alignItemsEnd]}>
                  <View
                    style={[
                      ES.w96,
                      ES.h89,

                      ES.flexRow,
                      ES.justifyContentCenter,
                      ES.alignItemsCenter,
                      ES.gap2,
                      ES.bRadius10,
                      {backgroundColor: '#BFEAA5'},
                    ]}>
                    <Image source={SnacksIcon} />
                    <Text style={[ES.fwM, ES.f18, ES.textDark]}>Snacks</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={[ES.w100]}>
            <View style={[{backgroundColor: '#EBF0F6'}, ES.w100, ES.py2]}>
              <View style={[ES.fx0, ES.py1]}>
                <Text style={[ES.textCenter, ES.subHeadingText]}>COMBOS</Text>
              </View>
              <View style={[ES.w100]} key={cart.length}>
                <ProductComponetHorizontal
                  product={topDeals[0]}
                  color="#ffffff"
                  shadow={false}
                />
              </View>

              <View style={[ES.mt1, ES.w100, ES.alignItemsCenter]}>
                <View
                  style={[
                    ES.w92,
                    ES.flexRow,
                    ES.gap1,
                    ES.justifyContentSpaceBetween,
                  ]}>
                  <View style={[ES.w32]}>
                    <Image source={Poha7Product} style={[ES.w100]} />
                  </View>
                  <View style={[ES.w32]}>
                    <Image source={Poha5Product} style={[ES.w100]} />
                  </View>
                  <View style={[ES.w32]}>
                    <Image source={Poha6Product} style={[ES.w100]} />
                  </View>
                </View>
              </View>
              <View style={[ES.py1]}>
                <Text style={[ES.f14, ES.fwM, ES.textCenter, ES.textDark]}>
                  View All
                </Text>
              </View>
            </View>
          </View>

          <View style={[{backgroundColor: '#C19044'}, ES.py1, ES.w100]}>
            <View style={[ES.w100, ES.alignItemsCenter, ES.mt1]}>
              <Image source={ActiyoLuxuryLogo} />
              <Text
                style={[ES.textLight, ES.f16, ES.fwM, ES.mt08, ES.textLight]}>
                {' '}
                Premium & Gental Body Care{' '}
              </Text>
            </View>

            <View style={[ES.mt2, ES.w100]}>
              <View style={[ES.w100, ES.gap2, ES.px04]} key={cart.length}>
                <FlatList
                  data={topDeals}
                  horizontal
                  bounces={true}
                  contentContainerStyle={[ES.tempBorder]}
                  renderItem={({item}) => (
                    <View style={[ES.ws200, ES.px04]}>
                      <ProductComponetVertical product={item} />
                    </View>
                  )}
                />
              </View>
            </View>

            <View style={[ES.py1]}>
              <Text style={[ES.f14, ES.fwM, ES.textCenter, ES.textLight]}>
                View All
              </Text>
            </View>
          </View>

          <View
            style={[
              ,
              ES.w100,
              ES.alignItemsCenter,
              ES.py5,
              {backgroundColor: '#EBF0F6'},
            ]}>
            <View
              style={[
                ES.w92,
                ES.flexRow,
                ES.gap1,
                ES.justifyContentSpaceBetween,
              ]}>
              <View style={[ES.w32]}>
                <Image source={Poha7Product} style={[ES.w100]} />
              </View>
              <View style={[ES.w32]}>
                <Image source={Poha5Product} style={[ES.w100]} />
              </View>
              <View style={[ES.w32]}>
                <Image source={Poha6Product} style={[ES.w100]} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  main: {
    width: '100%',

    paddingBottom: 140,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
  },

  gridContainer: {
    alignItems: 'start',
  },

  columnWrapper: {
    justifyContent: 'space-around',
  },

  productContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 8,
  },

  card1: {
    //backgroundColor: 'blue',
    backgroundColor: 'linear-gradient(to right, #4facfe, #00f2fe)',
  },
});
