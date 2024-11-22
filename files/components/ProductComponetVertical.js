import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

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
  BexPromiseIcon,
  ShareIcon,
  HeartIcon,
  RupeeSymbol,
  BexCoin,
  RedHeartIcon
} from '../pages/IconsImages';

import ES from '../pages/ES';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCartRenderKey } from '../../redux/action';

const ProductComponetVertical = props => {
   const [isProductImages, setIsProductImages] = useState(false)
   const [itemInCart,setItemInCart] = useState(false)
   const cart = useSelector(state => state.cart)
  
   const dispatch = useDispatch();
    useEffect(() => {
        //console.log('Product thumbnailImage : ', props.product.thumbnailImage.filePath);
        if(props.product.thumbnailImage.filePath) setIsProductImages(true)
          for(let i in cart){
            if(cart[i]._id == props.product._id){
            
              setItemInCart(true)
            }
          }
      }, [props.product]);

      

    

     
      const handleAddToCart = () => {
       
        dispatch(addToCart(props.product))
        
        setItemInCart(true)
      }

      const handleRemoveFromCart = () => {
       
        dispatch(removeFromCart(props.product))
        setItemInCart(false)

        if(props.renderCart == true )   dispatch(updateCartRenderKey())

      
      }
    
      return (
        <View
          style={[ES.bgLight, ES.bRadius5, ES.shadow1, ES.py1, ES.px04,ES.mt04,props.width ? {width:props.width}:null]}>
          <View>
            <View style={[ES.relative]}>
              <View style={[ES.absolute, ES.left0, ES.z1, ES.ps06, ES.pt06]}>
                <Image source={BexPromiseIcon} style={{width: 64, height: 19}} />
              </View>
    
              <View style={[ES.absolute, ES.right0, ES.z1, ES.pe06, ES.pt06]}>
                <Image source={ShareIcon} style={{width: 34, height: 34}} />
              </View>
    
              <View
                style={[
                  ES.absolute,
                  ES.right0,
                  ES.top50,
                  ES.z10,
                  ES.pe06,
                  ES.pt06,
                ]}>
                  <TouchableOpacity onPress={()=>{ itemInCart? handleRemoveFromCart(): handleAddToCart()}}> 
                    <Image source={itemInCart ? RedHeartIcon : HeartIcon} style={[{width: 24, height: 24},ES.objectFitContain]} />
                  </TouchableOpacity>
              </View>
    
              <View
                style={[
                  ES.fx0,
                  ES.justifyContentCenter,
                  ES.alignItemsCenter,
                  ES.p1,
                 
                ]}>
                  <Image source={isProductImages ?{uri:props.product.thumbnailImage.filePath}: {uri:'https://bex-dev-bucket.s3.ap-south-1.amazonaws.com/400x400-image-1686744310296.png'} } style={{width: 130, height: 130}} />
              </View>
            </View>
    
            <View style={[ES.fx0, ES.alignItemsCenter]}>
              <View style={[ES.px1, ES.w100,ES.hs37,ES.justifyContentCenter]}>
                <Text
                  style={[
                    ES.f14,
                    ES.fwM,
                    ES.productTitleColor,
                    ES.textJustify,
                    ES.letterSpace1,
                  ]}>
                  <Text>{props.product?.name.length<=27 ? props.product?.name : props.product?.name.slice(0,27)+"..."}</Text>
                </Text>
              </View>
              <View style={[ES.flexRow, ES.px1, ES.mt1]}>
                <View style={[ES.fx1, ES.flexRow, ES.gap1]}>
                  <View style={[]}>
                    <Text style={[ES.f18, ES.fwM, ES.productTitleColor]}>
                    ₹{props.product?.pricing?.offerPrice || "100"}
                    </Text>
                  </View>
                  <View
                    style={[ES.lineThrough, ES.f10, ES.fx0, ES.justifyContentEnd]}>
                    <Text>₹{props.product?.pricing?.price || "100"}</Text>
                  </View>
                </View>
    
                <View
                  style={[ES.fx1, ES.justifyContentEnd, ES.f10, ES.alignItemsCenter]}>
                  <Text style={[ES.textEnd, {color: '#25D366'}, ES.fwB]}>
                    {props.product?.pricing?.offerPercentage.toFixed(2) || ""}% OFF
                  </Text>
                </View>
              </View>
    
              <View style={[ES.flexRow, ES.w100, ES.mt1]}>
                <View
                  style={[ES.fx1, ES.flexRow, ES.justifyContentCenter, ES.gap1]}>
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
                  ]}></View>
                <View
                  style={[ES.fx1, ES.flexRow, ES.justifyContentCenter, ES.gap1]}>
                  <Image source={BexCoin} />
                  <View style={[]}>
                    <Text style={[ES.textGreen]}> 150 </Text>
                  </View>
                </View>
                <View
                  style={[ES.fx1, ES.flexRow, ES.justifyContentCenter, ES.gap1,props.product?.quantity? ES.dBlock:ES.dNone]}>
                 
                  <View style={[]}>
                    <Text style={[ES.textGreen]}>{props.product?.quantity}</Text>
                  </View>
                </View>
              </View> 
            </View>
          </View>
        </View>
      );
    };
    
export default ProductComponetVertical;
