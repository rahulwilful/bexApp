import axios from 'axios';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    FlatList,
    ToastAndroid,
    Alert,
} from 'react-native';
import { ActivityIndicator, Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../api';
import BackButtonHeader from '../../components/BackButtonHeader';
import EventButton from '../../components/EventButton';
import Header2 from '../../components/Header2';
import CartItem from '../../components/UI/CartItem';
import OrderButton from '../../components/UI/OrderButton';
import Images from '../../constants/Images';
import { AuthContext } from '../../navigations/routes';
import { getCartList } from '../../redux/Actions/Cart';
import Theme from './../../utils/Theme';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RadioButton } from 'react-native-paper';
import SummaryCard from '../../components/UI/SummaryCard';
import Button from '../../components/Button';
// import RazorpayCheckout from 'react-native-razorpay';
import logo from '../../assets/Images/razorlogo.png';
import ProductCard from '../bex_partner/ProductCard';
import Loader from '../../components/UI/Loader';
import { showSnackBar } from '../../redux/Actions/Alerts';
import { getUserData, getUserDataProfile } from '../../redux/Actions/Auth';
import numbro from 'numbro';
import { CheckBox } from 'react-native-elements';
// import RNPgReactNativeSdk from 'react-native-pg-react-native-sdk';
import { HomeTitle } from '../../components/CustomText';
import FastImage from 'react-native-fast-image';
import AccountHeader from '../../components/AccountHeader';
import {
    CFEnvironment,
    CFSession,
    CFPaymentModes,
    CFPaymentComponentBuilder,
    CFThemeBuilder,
    CFDropCheckoutPayment
} from 'cashfree-pg-api-contract';
import {
    CFCallback,
    CFErrorResponse,
    CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const CheckoutScreen = ({ navigation, route }) => {
    const params = route.params;
    const { defaultAddress, CoinUsedFlag, newGT, newSaving, coinDiscount } = params;
    const [walletData, setWalletData] = useState({})


    const dispatch = useDispatch();
    const cartState = useSelector(({ cart }) => cart);
    const partnerCartState = useSelector(({ partnerCart }) => partnerCart);

    const {
        productList,
        packageId,
        cartPricing,
        cartDetails
    } = partnerCartState;

    const { isCartLoading, cartList, cartCount, productQty, cartErr, pricing, promoCode, codeApply, isCODAllowed } = cartState;

    const authState = useSelector(({ auth }) => auth);
    const { userData, settingObj } = authState;
    let BexPartner = null
    BexPartner = Promise.all(userData.bexPartnerLevel.Level !== 0 ? 'true' : 'false')

    const authContext = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [cartProductsList, setProductList] = useState(Object.keys(cartList).length ? cartList.cartProducts : []);

    const assignStockist = data => {
        return new Promise((resolve, reject) => {
            let ls = [];
            cartProductsList.map(item => {
                let productExists = data.find(i => {
                    return i.productId === item._id
                });
                let obj = {
                    ...item,
                    "eligibleStockists": productExists ? productExists.stockists : []
                }
                ls.push(obj);
            });
            resolve(ls);
        });
    }

    const checkEligibleStockist = () => {
        let productList = [];
        cartList.cartProducts.map((item, index) => {
            productList.push(item._id);
        });
        axios.get(`${API.BASE_URL}api/checkout/eligibleStockists?pincode=${defaultAddress.pincode}&products=${productList.join(",")}`, {
            headers: {
                'Authorization': `Bearer ${authContext.userToken}`
            }
        }).then(({ data }) => {
            let resData = data.data;
            assignStockist(resData).then(res => {
                setProductList(res);
            });
        }).catch(err => {
            console.log(err.response, 'ahi');
        });
    }

    // wallet data fetching
    const getStats = () => {
        setLoader(true)
        axios.get(`${API.BASE_URL}api/wallet`, {
            headers: {
                'Authorization': `Bearer ${authContext.userToken}`
            }
        }).then(res => {
            setWalletData(res.data.data.walletAmount);
            setLoader(false)
        }).catch(err => {
            setLoader(false)
            console.log('error', err);
        })
    }

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loader, setLoader] = useState(false);

    const checkOnlinePayment = (order_id) => {
        axios.get(`https://sandbox.cashfree.com/pg/orders/${order_id}/payments`, {
            headers: {
                'x-client-id': API.CFAppId,
                'x-client-secret': '1a5d290896820c29be49aae53c98dc4e19ff2a5b',
                'x-api-version': '2022-01-01'
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err.response, 'ahai');
        });
    }

    useEffect(() => {
        CFPaymentGatewayService.setEventSubscriber({
            onReceivedEvent(eventName: string, map: Map<string, string>): void {
                console.log(
                    'Event recieved on screen: ' +
                    eventName +
                    ' map: ' +
                    JSON.stringify(map)
                );
            },
        });
        
        const unsbscribe = CFPaymentGatewayService.setCallback({
            onVerify(orderID: string): void {
                debounce(orderVerification(orderID), 500);
            },
            onError(error: CFErrorResponse, orderID: string): void {
                onErrorLog(error, orderID);
            },

        });

        return () => {
            CFPaymentGatewayService.removeCallback();
            AsyncStorage.removeItem('block');
            unsbscribe;
        }
    }, []);

    function debounce(func, timeout = 500) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const onErrorLog = (error, id) => {

        let amt = 0;
        if (cartCount > 0 && params.isPackage === undefined) {
            amt = pricing.totalOfferPrice;
        } else {
            amt = cartPricing.totalOfferPrice;
        }

        catchLog(amt, error, id, true).then(res => {
            dispatch(showSnackBar("An error occured while processing order,any amount deducted will be refunded within 3-7 buisness days", Theme.snackErr));
            setButtonDisabled(false);
            setLoader(false);
            CFPaymentGatewayService.removeCallback();
        });
    }
    const [cashfreeRes, setCashFreeRes] = useState({});
    const [logRes, setLogRes] = useState({});

    const checkOut = async () => {
        setButtonDisabled(true);
        if (Platform.OS === 'android') {
            setLoader(true);
        };
        AsyncStorage.setItem('block', String("true"));
        let requestData = {
            "deliveryAddress": defaultAddress._id,
            "modeOfPayment": paymentMethod,
            "onlinePaymentOrderLogId": logRes._id,
            "isCoinsDiscount": CoinUsedFlag
        };
        if (cartCount > 0 && params.isPackage === undefined) {
            if (Object.keys(promoCode).length > 0 && codeApply) {
                requestData.promoCodeId = `${promoCode._id}`;
            }
            let products = [];
            cartProductsList.map((val, index) => {
                let data = {
                    "product": val._id,
                    "productType": `${val.productType}`,
                    // "eligibleStockists": val.eligibleStockists
                }
                if (val.productType !== 'simple') {
                    data.variant = {
                        "_id": `${val.variant._id}`,
                        "quantity": val.variant.cartQuantity,
                    }
                } else {
                    data.quantity = val.cartQuantity;
                }
                products.push(data);
            });
            requestData.products = products;
            requestData.cartId = cartList._id;
        } else {
            requestData.products = productList;
            requestData.packageId = cartDetails._id;
            requestData.cartId = "";
        }
        axios.post(`${API.BASE_URL}api/checkout`, requestData, {
            headers: {
                'Authorization': `Bearer ${authContext.userToken}`
            }
        }).then(res => {
            let data = res.data.data;
            if (res.data.status) {
                if (paymentMethod === 'ONLINE') {
                    let cfData = data.cashfreeOrderData.data;
                    let cashfree = data.cashfreeOrder;
                    let cfToken = data.cashfreePaymentToken;
                    let paymentCFSessionId = cfData.payment_session_id;
                    setCashFreeRes(cfData);
                    catchLog(cfData.order_amount, cfData, cfData.order_id).then(res => {
                        setLogRes(res.data);
                    });
                    const session = new CFSession(
                        paymentCFSessionId,
                        cfData.order_id,
                        CFEnvironment.SANDBOX
                    );
                    const paymentModes = new CFPaymentComponentBuilder()
                        .add(CFPaymentModes.CARD)
                        .add(CFPaymentModes.UPI)
                        .add(CFPaymentModes.NB)
                        // .add(CFPaymentModes.WALLET)
                        // .add(CFPaymentModes.PAY_LATER)
                        .build();
                    const theme = new CFThemeBuilder()
                        .setNavigationBarBackgroundColor(Theme.primary)
                        .setNavigationBarTextColor('#FFFFFF')
                        .setButtonBackgroundColor(Theme.primary)
                        .setButtonTextColor('#FFFFFF')
                        .setPrimaryTextColor('#212121')
                        .setSecondaryTextColor('#757575')
                        .build();
                    const dropPayment = new CFDropCheckoutPayment(
                        session,
                        paymentModes,
                        theme
                    );
                    CFPaymentGatewayService.doPayment(dropPayment);
                    setButtonDisabled(false);
                } else {
                    dispatch(getUserDataProfile(authContext.userToken));
                    dispatch(getUserData(userData._id));
                    dispatch(getCartList(authContext.userToken));
                    setButtonDisabled(false);
                    setLoader(false);
                    navigation.push('PlaceOrderScreen', { data: res.data.data })
                }
            } else {
                setButtonDisabled(false);
                setLoader(false);
                dispatch(showSnackBar(res.data.messsage, Theme.snackErr));
            }
        }).catch(err => {
            catchLog(cashfreeRes.order_amount, err, cashfreeRes.order_id, true).then(res => {
                dispatch(showSnackBar("An error occured while processing order,any amount deducted will be refunded within 3-7 buisness days", Theme.snackErr));
                setButtonDisabled(false);
                setLoader(false);
            });
        }).finally(() => {
            setButtonDisabled(false);
            setLoader(false);

        });
    }

    const orderVerification = async (orderId) => {

        let block = await AsyncStorage.getItem('block');
        let requestData = {
            "deliveryAddress": defaultAddress._id,
            "modeOfPayment": paymentMethod,
            "isCoinsDiscount": CoinUsedFlag
        };

        if (cartCount > 0 && params.isPackage === undefined) {
            if (Object.keys(promoCode).length > 0 && codeApply) {
                requestData.promoCodeId = `${promoCode._id}`;
            }
            let products = [];
            cartProductsList.map((val, index) => {
                let data = {
                    "product": val._id,
                    "productType": `${val.productType}`,
                    "eligibleStockists": val.eligibleStockists
                }
                if (val.productType !== 'simple') {
                    data.variant = {
                        "_id": `${val.variant._id}`,
                        "quantity": val.variant.cartQuantity,
                    }
                } else {
                    data.quantity = val.cartQuantity;
                }
                products.push(data);
            });
            requestData.products = products;
            requestData.cartId = cartList._id;
        } else {
            requestData.products = productList;
            requestData.packageId = cartDetails._id;
            requestData.cartId = "";
        }

        let reqData = {
            "paymentData": requestData,
            "onlinePaymentOrderLogId": logRes._id
        }

        reqData.cashfreePaymentInfo = {
            orderId: orderId
        }

        if (block === 'true') {
            setLoader(true);
            AsyncStorage.removeItem('block');
            axios.post(`${API.BASE_URL}api/checkout/order-verification`, reqData, {
                headers: {
                    'Authorization': `Bearer ${authContext.userToken}`
                }
            }).then(res => {
                dispatch(getUserDataProfile(authContext.userToken));
                dispatch(getUserData(userData._id));
                navigation.push('PlaceOrderScreen', { data: res.data.data })
                setButtonDisabled(false);
                setLoader(false);
            }).catch(err => {
                catchLog(cashfreeRes.order_amount, err, cashfreeRes.order_id, true).then(res => {
                    setButtonDisabled(false);
                    setLoader(false);
                    dispatch(showSnackBar("An error occured while processing payment,any amount deducted will be refunded within 3-7 buisness days", Theme.snackErr));
                });

            });
            AsyncStorage.removeItem('block');
        }
        // else {
        //     setButtonDisabled(false);
        //     setLoader(false);
        // }
    }
    const [paymentMethod, setPaymentMethod] = useState("ONLINE");

    useLayoutEffect(() => {
        // checkOnlinePayment('bex_order_oIufWVtwiDAyM4ASpQoAn');
        if (params.isPackage === undefined) {
            checkEligibleStockist();
        }
        setButtonDisabled(false);
        setLoader(false);
    }, []);


    useEffect(() => {
        setTotalCoins();
        getStats();
    }, []);

    // useEffect(() => {
    //     setTotalCoins();
    //     getStats();
    // }, [buttonDisabled]);

    const [totalBexCoins, setTotalBexCoins] = useState(0);
    const [bexCoins, setBEXCoins] = useState(0);

    const catchLog = (amount, errRes, orderId, isFailure) => {
        return new Promise((resolve, reject) => {
            let errReq = {
                "amount": amount,
                "cashfreeOrderId": orderId,
                // "razorpayId": resData.razorpay_order_id,
                "paymentGatewayResponseInfo": JSON.stringify(errRes),
            }
            if (isFailure !== undefined) {
                errReq.isFailure = true;
            }

            axios.post(`${API.BASE_URL}api/order/onlinePaymentOrderLog`, errReq, {
                headers: {
                    'Authorization': `Bearer ${authContext.userToken}`
                }
            }).then(({ data }) => {
                resolve(data);
            }).catch(errErr => {
                resolve();
            });
        })
    }
    const setTotalCoins = () => {
        if (Object.keys(cartList).length > 0) {
            let coins = Object.keys(settingObj).length > 0 ? cartList.totalCoins * settingObj.multiplier : cartList.totalCoins;
            // coins = qty * coins;

            coins = numbro(coins).format({ thousandSeparated: true });
            setTotalBexCoins(coins);

            let coins1 = Object.keys(settingObj).length > 0 ? cartList.totalCoins * settingObj.multiplier : cartList.totalCoins;
            // coins = qty * coins;
            coins1 = coins1 / 2;
            coins1 = numbro(coins1).format({ thousandSeparated: true });
            setBEXCoins(coins1);
        } else {
            setTotalBexCoins(0);
            setBEXCoins(0);
        }
    }
    const [UpiApp, setUpiApp] = useState([]);

    return (
        <View style={styles.container}>
            <AccountHeader search title headerTitle='Checkout Screen' navigation={navigation} />
            <Loader isVisible={loader} />
            {/* <ScrollView> */}
            {
                loading ?
                    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                        <ActivityIndicator color={Theme.primary} size='large' />
                    </View>
                    :
                    cartCount > 0 && params.isPackage === undefined ?
                        <>
                            <View style={styles.addressView}>
                                {/* <Text allowFontScaling={false} style={styles.title}>Add Payment Method</Text> */}
                                <HomeTitle>Select Payment Method</HomeTitle>

                                <TouchableOpacity
                                    style={[styles.methodContainer, { backgroundColor: '#FFF2CA', borderWidth: 0 }]}
                                    onPress={() => setPaymentMethod('ONLINE')}
                                    activeOpacity={0.4}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {
                                            Platform.OS === 'ios'
                                                ?
                                                <CheckBox
                                                    onPress={() => setPaymentMethod('ONLINE')}
                                                    checked={paymentMethod === 'ONLINE' ? true : false}
                                                    checkedIcon="dot-circle-o"
                                                    uncheckedIcon="circle-o"
                                                    checkedColor={Theme.primary}
                                                />
                                                :
                                                <RadioButton
                                                    value='ONLINE'
                                                    onPress={() => setPaymentMethod('ONLINE')}
                                                    status={paymentMethod === 'ONLINE' ? 'checked' : 'unchecked'}
                                                    color={Theme.primary}
                                                />
                                        }
                                        <View>
                                            <Text numberOfLines={2} allowFontScaling={false} style={[styles.payText, { width: Theme.wp('70%') }, Platform.OS === 'ios' ? { marginLeft: -10 } : {}]}>
                                                Pay online and get DOUBLE the BEX Coins,
                                            </Text>
                                            {
                                                Object.keys(cartList).length > 0 && (
                                                    <View style={{ marginTop: Theme.hp('0.5%'), flexDirection: 'row', alignItems: 'center' }}>
                                                        <Image
                                                            source={Images.bexCoin}
                                                            style={{
                                                                width: Theme.wp('5%'),
                                                                height: Theme.wp('5%'),

                                                            }}
                                                            resizeMode='contain'
                                                        />
                                                        <Text allowFontScaling={false} style={{
                                                            fontFamily: Theme.fontFamilyTitle,
                                                            color: Theme.text,
                                                            letterSpacing: 0.7
                                                        }}>
                                                            &nbsp;{totalBexCoins} with this order
                                                        </Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </View>

                                </TouchableOpacity>
                                {
                                    isCODAllowed &&
                                    <Text style={{ margin: 5, marginLeft: 10 }} >
                                        Pay on delivery not available for this order
                                    </Text>
                                }
                                {
                                    !isCODAllowed && (
                                        <TouchableOpacity
                                            onPress={() => setPaymentMethod('COD')}
                                            style={[styles.methodContainer, { borderColor: 'rgba(0,0,0,0.05)' }]}
                                            activeOpacity={0.4}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                {
                                                    Platform.OS === 'ios'
                                                        ?
                                                        <CheckBox
                                                            onPress={() => setPaymentMethod('COD')}
                                                            checked={paymentMethod === 'COD' ? true : false}
                                                            checkedIcon="dot-circle-o"
                                                            uncheckedIcon="circle-o"
                                                            checkedColor={Theme.primary}
                                                        />
                                                        :
                                                        <RadioButton
                                                            color={Theme.primary}
                                                            value='COD'
                                                            onPress={() => setPaymentMethod('COD')}
                                                            status={paymentMethod === 'COD' ? 'checked' : 'unchecked'}
                                                        />
                                                }
                                                <Text style={{ flexDirection: 'row', alignItems: 'center', width: Theme.wp('70%'), alignSelf: 'center' }}>
                                                    <Text allowFontScaling={false} style={[styles.payText, Platform.OS === 'ios' ? { marginLeft: -10 } : ""]}>
                                                        Pay On Delivery,
                                                    </Text>
                                                    {
                                                        Object.keys(cartList).length > 0 && (
                                                            <>
                                                                <Image
                                                                    source={Images.bexCoin}
                                                                    style={{
                                                                        width: Theme.wp('5%'),
                                                                        height: Theme.wp('5%'),

                                                                    }}
                                                                    resizeMode='contain'
                                                                />
                                                                <Text allowFontScaling={false} style={{
                                                                    fontFamily: Theme.fontFamilyTitle,
                                                                    color: Theme.text,
                                                                    letterSpacing: 0.7,

                                                                }}>
                                                                    &nbsp;{bexCoins} with this order
                                                                </Text>
                                                            </>
                                                        )
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                            <ScrollView style={{ marginTop: 10, paddingBottom: Theme.hp('15%'), backgroundColor: Theme.newBack }}>
                                {
                                    Object.keys(pricing).length > 0 && (
                                        <SummaryCard
                                            productQuantity={productQty}
                                            mrpPrice={`₹${pricing.totalPrice}`}
                                            totalOfferPrice={pricing.totalOfferPrice}
                                            discount={`₹${pricing.totalDiscountAmount}`}
                                            shippingFee={'FREE'}
                                            couponDiscount={Object.keys(promoCode).length > 0 ? pricing.promoDiscountAmount : false}
                                            bexCoinDiscount={coinDiscount}
                                            // wallet={'₹0'}
                                            // horzLine={true}
                                            youSaved={newSaving}
                                            totalPrice={newGT}
                                        />
                                    )
                                }
                                {
                                    Object.keys(pricing).length > 0 && params.item === undefined && (
                                        <OrderButton
                                            style={{ marginTop: 10, backgroundColor: Theme.newBack }}
                                            textStyle={{ marginLeft: Theme.wp('37%') }}
                                            totalSaving={cartList.pricing.totalPrice - cartList.pricing.totalOfferPrice} title={'Check Out'} disabled={buttonDisabled} loading={buttonDisabled}
                                            totalPrice={pricing.totalOfferPrice}
                                            // onPress={ (walletPAct && (newPay === 0)) ? orderVerification : checkOut}
                                            onPress={() => BexPartner && paymentMethod === 'ONLINE' && walletData >= 1 ? navigation.navigate('CheckoutOnline', { defaultAddress: defaultAddress, CoinUsedFlag: CoinUsedFlag, newGT: newGT, newSaving: newSaving, coinDiscount: coinDiscount }) : checkOut()}
                                            couponDiscount={Object.keys(promoCode).length > 0 && codeApply ? cartList.pricing.promoDiscountAmount : 0}
                                        />
                                    )
                                }
                            </ScrollView>
                            {/* </ScrollView> */}
                        </>
                        :
                        params.isPackage !== undefined
                            ?
                            (
                                <>
                                    <ScrollView>
                                        <View style={styles.addressView}>
                                            <Text allowFontScaling={false} style={styles.title}>Add Payment Method</Text>

                                            <View
                                                style={[styles.methodContainer, { backgroundColor: '#FFF2CA', borderWidth: 0 }]}
                                            >
                                                <View style={{ flexDirection: 'row' }}>
                                                    <RadioButton
                                                        value='ONLINE'
                                                        onPress={() => setPaymentMethod('ONLINE')}
                                                        status={paymentMethod === 'ONLINE' ? 'checked' : 'unchecked'}
                                                        color={Theme.primary}
                                                    />
                                                    <Text allowFontScaling={false} style={{ fontFamily: Theme.fontFamilyBold, fontSize: 16, letterSpacing: 0.7, alignSelf: 'center' }}>Online Payment</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <ProductCard item={params.item} navigation={navigation} color={Theme.white} actionDisabled={true} />
                                        <View style={{ marginTop: 5, paddingBottom: Theme.hp('5%'), }}>
                                            {
                                                Object.keys(cartPricing).length > 0 && (
                                                    <SummaryCard
                                                        productQuantity={1}
                                                        mrpPrice={`₹${cartPricing.totalPrice}`}
                                                        totalOfferPrice={cartPricing.totalOfferPrice}
                                                        discount={`₹0`}
                                                        shippingFee={'FREE'}
                                                        youSaved={`₹${cartPricing.totalPrice - cartPricing.totalOfferPrice}`}
                                                        bexCoinDiscount={coinDiscount}
                                                        // wallet={'₹0'}
                                                        // horzLine={true}
                                                        totalPrice={cartPricing.totalOfferPrice}
                                                        couponDiscount={0}
                                                    />
                                                )
                                            }
                                            {
                                                Object.keys(cartPricing).length > 0 && params.item !== undefined && (
                                                    <OrderButton
                                                        disabled={buttonDisabled}
                                                        style={{ marginTop: Theme.hp('0.3%'), backgroundColor: Theme.newBack }}
                                                        totalSaving={cartPricing.totalPrice - cartPricing.totalOfferPrice}
                                                        title={'Check Out'}
                                                        totalPrice={cartPricing.totalOfferPrice}
                                                        onPress={checkOut}
                                                    />
                                                )
                                            }
                                        </View>
                                    </ScrollView>
                                </>
                            )
                            :
                            <View style={{ backgroundColor: Theme.white, flex: 1 }}>
                                <Image
                                    source={require('../../assets/Images/cartFailGif.gif')}
                                    style={{
                                        height: 170,
                                        width: 250,
                                        alignSelf: 'center',
                                        marginTop: Theme.hp('20%'),
                                    }}
                                    resizeMode='contain'
                                />
                                <Text allowFontScaling={false} style={[styles.shopping, { color: Theme.subText }]}>Your shopping cart is empty</Text>
                                <View
                                    style={{
                                        width: '45%',
                                        alignSelf: 'center',
                                        marginTop: Theme.hp('3%'),
                                    }}>
                                    <Button onPress={() => navigation.navigate('HomeScreen')} text="Browse products" />
                                </View>
                            </View>
            }
            {/* </ScrollView> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.newBack,
    },

    addressView: {
        paddingVertical: 10,
        backgroundColor: Theme.white,
        paddingHorizontal: 16,
    },
    deliverToView: {
        marginTop: Theme.hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 10.67,
        height: 13.33,
        tintColor: Theme.text,
    },
    text: {
        fontFamily: Theme.fontfamilyRegular,
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 16.8,
        color: Theme.text,
        marginVertical: Theme.hp('0.7%'),
    },
    title: {
        color: Theme.text,
        fontSize: 16,
        lineHeight: 19.2,
        fontFamily: Theme.fontFamilyPrimary,
        fontStyle: 'normal',
        fontWeight: '700',
        paddingVertical: 5,
    },
    button: {
        paddingTop: 10,
        paddingLeft: 0,
        paddingBottom: 10,
        paddingRight: 0,
        borderColor: Theme.subText,
        borderWidth: 1,
        width: 106,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        // marginVertical: 10,
    },
    btnchng: {
        marginLeft: 15,
        width: 152,
        borderColor: Theme.primaryLight,
    },
    btnText: {
        fontFamily: Theme.fontFamilyPrimary,
        fontWeight: '700',
        fontStyle: 'normal',
        fontSize: 16,
        lineHeight: 19.2,
        color: Theme.subText,
    },
    pView: {
        padding: 6,
        marginHorizontal: 16,
        // padding: 15,
        // borderRadius: 8,
        // backgroundColor: Theme.white,
        // marginHorizontal: 16,
        // marginVertical: 8,
    },
    pImage: {
        height: 70,
        width: 59,
    },
    titleView: {
        flexDirection: 'row',
        width: '60%',
        marginLeft: Theme.wp('10%'),
        justifyContent: 'space-between',
    },
    debatic: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    fit: {
        fontSize: 14,
        color: Theme.subText,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buBtn: {
        width: Theme.wp('27.5%'),
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: Theme.primary,
    },
    buy: {
        height: 18,

        width: 16,
    },
    buyText: {
        color: Theme.white,
        marginLeft: 10,
        fontSize: 16,
    },
    whatsappBtn: {
        flexDirection: 'row',
        width: Theme.wp('27.5%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
        borderRadius: 4,
    },
    bu1: {
        height: 21,
        width: 21,
    },
    plusView: {
        width: 26,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: Theme.border,
    },
    minusView: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainBorder: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Theme.border,
        height: 25,
        alignItems: 'center',
        borderRadius: 4,
        width: 80,
        marginTop: 8,
    },
    whatsappText: {
        marginLeft: 10,
        color: Theme.subText,
        fontSize: 16,
    },
    pmainView: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    addressView2: {
        paddingHorizontal: 16,
        backgroundColor: Theme.white,
        paddingVertical: 24,
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    text1: {
        fontFamily: Theme.fontFamilyPrimary,
        fontWeight: '700',
        fontSize: 16,
        fontStyle: 'normal',
        color: Theme.text,
        lineHeight: 19.2,
    },
    text2: {
        fontWeight: '400',
        fontSize: 14,
    },
    marginAdded: {
        fontFamily: Theme.fontFamilyPrimary,
        fontWeight: '500',
        fontSize: 14,
        fontStyle: 'normal',
        color: Theme.success,
        lineHeight: 15.2,
    },
    horizonline: {
        borderWidth: 0.5,
        borderColor: Theme.subText,
        marginVertical: 5,
    },
    summaryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginVertical: 4,
        backgroundColor: Theme.white,
        paddingVertical: 16,
        justifyContent: 'space-between',
        height: 92,
        alignItems: 'center',
    },
    procsedbtn: {
        width: 120,
        height: 40,
        backgroundColor: Theme.primary,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    img: {
        marginLeft: 10,
    },
    Proprice: {
        fontFamily: Theme.fontFamilyPrimary,
        fontWeight: '700',
        fontSize: 18,
        fontStyle: 'normal',
        color: Theme.secondary,
        lineHeight: 21.6,
    },
    textSummary: {
        fontFamily: Theme.fontFamilyPrimary,
        fontWeight: '400',
        fontSize: 14,
        fontStyle: 'normal',
        color: Theme.subText,
        lineHeight: 18.6,
        textAlign: 'center',
    },
    addressText: {
        color: Theme.subText,
        fontFamily: Theme.fontfamilyRegular,
        fontSize: 14,
        marginTop: Theme.hp('0.7%')
    },
    methodContainer: {
        padding: 12,
        // flexDirection: 'row',
        borderWidth: 1,
        borderColor: Theme.subText,
        justifyContent: 'space-between',
        margin: 5,
        borderRadius: 8
    },
    paddingView: {
        padding: 15,
        backgroundColor: Theme.white,
    },
    myShopping: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    easytextTitle: {
        fontFamily: Theme.fontFamilyBold,
        fontWeight: '700',
        fontSize: 16,
        fontWeight: 'normal',
        lineHeight: 19.2,
        fontStyle: 'normal',
        color: Theme.black,
    },
    applyCoupn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Theme.white,
        height: 60,
        marginTop: 4,
        paddingHorizontal: 12,
    },
    select: {
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 19.2,
        color: Theme.primary,
        fontFamily: Theme.fontFamilyPrimary,
    },
    shopping: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '59%',
        marginTop: Theme.hp('4%'),
        alignSelf: 'center',
    },
    payText: {
        fontFamily: Theme.fontFamilyTitle,
        fontSize: 15,
        letterSpacing: 0.7,
        alignSelf: 'center'
    }
});

export default CheckoutScreen;
