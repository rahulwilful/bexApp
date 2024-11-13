import { View, Text,Image } from 'react-native'
import React, { useEffect } from 'react'


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
 } from '../../IconsImages'
import ES from '../../ES'

const ProductComponetHorizontal = (props) => {
  useEffect(()=>{
    console.log("top discount: ",props.product)
  },[props.product])
  return (
    <View style={[ ES.w100, ES.fx0, ES.alignItemsCenter]}>
    <View
      style={[
        ES.bgLightTea,
        ES.p1,
        ES.bRadius8,
        ES.w92,
        ES.shadow1, 
        ES.flexRow,
        
      ]}>
      <View style={[ES.fx1]}>
        <Image source={props.product?.image} style={[ES.w100,ES.objectFitCover]} />
      </View>
      <View style={[ES.fx2]}>
        <View style={[ES.fx2, ES.flexRow]}>
          <View style={[ES.fx8, ES.py06]}>
            <View style={[ES.fx3, ES.px1, ES.justifyContentCenter]}>
              <Text style={[ES.textDark, ES.f14, ES.textJustify]}>
                {props.product?.name}
              </Text>
            </View>
            <View style={[ES.fx2, ES.flexRow, ES.px06]}>
              <View style={[ES.fx1, ES.flexRow]}>
                <View style={[ES.fx1, ES.justifyContentEnd]}>
                  <Text style={[ES.f18, ES.fwM, ES.productTitleColor]}>
                    {' '}
                    ₹350
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
                    {' '}
                    ₹500{' '}
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
                  50% OFF
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
              <Image source={HeartBlueIcon} />
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