import { View, Text,Image } from 'react-native'
import React, { useEffect, useState } from 'react'


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
  RedHeartIcon
 } from '../pages/IconsImages'
import ES from '../pages/ES'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { addToCart, removeFromCart } from '../../redux/action';

const ProductComponetHorizontal = (props) => {
  const [itemInCart,setItemInCart] = useState(false)
  const [isProductImages, setIsProductImages] = useState(false)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  
  useEffect(() => {
   // console.log('Product Horizontal thumbnailImage : ', props.product.thumbnailImage.filePath);
    if(props.product.thumbnailImage.filePath) setIsProductImages(true)
      if(props.product.thumbnailImage.filePath) setIsProductImages(true)
        for(let i in cart){
          if(cart[i]._id == props.product._id){
            console.log(props.product.name," is in cart")
            setItemInCart(true)
          }
        }
  }, [props.product]);

  const handleAddToCart = () => {
    console.log("handleAddToCart called ",props.product._id)
    dispatch(addToCart(props.product))
    setItemInCart(true)
  }

  const handleRemoveFromCart = () => {
    console.log("handleRemoveFromCart called ",props.product._id)
    dispatch(removeFromCart(props.product))
    setItemInCart(false)
  }
  return (
    <View style={[ ES.w100, ES.fx0, ES.alignItemsCenter]}>
    <View
      style={[
      
        props.color ? { backgroundColor:props.color } : ES.bgLightTea,
        ES.p1,
        ES.bRadius8,
        ES.w92,
        props.shadow ? { ...ES.shadow1 } : null, 
        ES.flexRow,
        
      ]}>
      <View style={[ES.fx1]}>
        <View style={[ES.w100,ES.hs120,ES.bRadius8,ES.bgLight,{overflow:'hidden'}]}>
        <Image source={isProductImages ?{uri:props.product.thumbnailImage.filePath}: {uri:'https://bex-dev-bucket.s3.ap-south-1.amazonaws.com/400x400-image-1686744310296.png'} } style={[ES.w100,ES.h100]} /* style={[ES.w100,ES.objectFitCover]} */ />
        </View>
      </View>
      <View style={[ES.fx2]}>
        <View style={[ES.fx2, ES.flexRow]}>
          <View style={[ES.fx8, ES.p06]}>
            <View style={[ES.fx3, ES.px1, ES.justifyContentCenter]}>
              <Text style={[ES.textDark, ES.f14, ES.textJustify]}>
              {props.product?.name.length<=27 ? props.product?.name : props.product?.name.slice(0,27)+"..."}
              </Text>
            </View>
            <View style={[ES.fx2, ES.flexRow, ES.px06]}>
              <View style={[ES.fx1, ES.flexRow]}>
                <View style={[ES.fx1, ES.justifyContentEnd]}>
                  <Text style={[ES.f18, ES.fwM, ES.productTitleColor]}>
                  ₹{props.product?.pricing?.offerPrice || "100"}
                   
                  </Text>
                </View>
                <View style={[ES.fx1, ES.justifyContentEnd]}>
                  <Text
                    style={[
                      ES.lineThrough,
                      ES.f14,
                      ES.fx0,
                      ES.justifyContentEnd,
                    ]}>
                  <Text>₹{props.product?.pricing?.price || "100"}</Text>
                  </Text>
                </View>
              </View>
              <View style={[ES.fx1, ES.justifyContentEnd]}>
                <Text
                  style={[
                    ES.textStart,
                    ES.px04,
                    {color: '#25D366'},
                    ES.fw900,
                  ]}>
                  {props.product?.pricing?.offerPercentage.toFixed(2) || ""}% OFF
                </Text>
              </View>
            </View>
            <View
              style={[
                ES.fx2,

                ES.flexRow,
                ES.alignItemsCenter,
                ES.gap1,
                ES.px06,
              ]}>
              <View style={[ES.fx1, ES.flexRow, ES.gap1]}>
                <Image source={RupeeSymbol} />
                <View style={[]}>
                  <Text style={[ES.textGreen]}> ₹14.84 </Text>
                </View>
              </View>
              <View
                style={[
                  ES.borderSecondary,
                  ES.borderEnd,
                  ES.borderEndWidth1,
                  ES.h70,
                ]}></View>
              <View style={[ES.fx1, ES.flexRow, ES.gap1]}>
                <Image source={BexCoin} />
                <View style={[]}>
                  <Text style={[ES.textBlueCoin]}> 150 </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[ES.fx2]}>
            <View style={[ES.fx2, ES.centerItems]}>
              <Image source={ShareIcon} />
            </View>
            <View style={[ES.fx2, ES.centerItems]}>
              <TouchableOpacity
                onPress={()=> {itemInCart ? handleRemoveFromCart() : handleAddToCart()}}
              >

              <Image source={itemInCart ? RedHeartIcon : HeartBlueIcon} style={[{width: 24, height: 24},ES.objectFitContain]} />
              </TouchableOpacity>
            </View>
            <View style={[ES.fx1, ES.centerItems]}></View>
          </View>
        </View>

        
      </View>
    </View>
  </View>
  )
}

export default ProductComponetHorizontal