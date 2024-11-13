import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';

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
} from '../../IconsImages';

import ES from '../../ES';

const Products = props => {
  useEffect(() => {
    console.log('Product: ', props.product);
  }, [props.product]);

  return (
    <View
      style={[ES.bgLight, ES.w48, ES.bRadius5, ES.shadow1, ES.py2, ES.px04,ES.mt1]}>
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
            <Image source={HeartIcon} style={{width: 24, height: 24}} />
          </View>

          <View
            style={[
              ES.fx0,
              ES.justifyContentCenter,
              ES.alignItemsCenter,
              ES.p1,
            ]}>
            <Image source={props.product.image} style={{width: 130, height: 130}} />
          </View>
        </View>

        <View style={[ES.fx0, ES.alignItemsCenter]}>
          <View style={[ES.px1, ES.w100]}>
            <Text
              style={[
                ES.f14,
                ES.fwM,
                ES.productTitleColor,
                ES.textJustify,
                ES.letterSpace1,
              ]}>
              <Text>{props.product.name}</Text>
            </Text>
          </View>
          <View style={[ES.flexRow, ES.px1, ES.mt1]}>
            <View style={[ES.fx1, ES.flexRow, ES.gap1]}>
              <View style={[]}>
                <Text style={[ES.f18, ES.fwM, ES.productTitleColor]}>
                ₹{props.product.discount}
                </Text>
              </View>
              <View
                style={[ES.lineThrough, ES.f10, ES.fx0, ES.justifyContentEnd]}>
                <Text>₹{props.product.price}</Text>
              </View>
            </View>

            <View
              style={[ES.fx1, ES.justifyContentEnd, ES.f10, ES.alignItemsCenter]}>
              <Text style={[ES.textEnd, {color: '#25D366'}, ES.fwB]}>
                {props.product.offPercent}% OFF
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default Products;
