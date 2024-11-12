import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const sceenWidth = Dimensions.get('window').width;

const ES = StyleSheet.create({
  main: {
    backgroundColor: '#6443AF',
    width: '100%',
    height: screenHeight,
  },

  productTitleColor:{
    color:'#431A70'
  },

  textGreen:{
    color:'#00603C'
  },

  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  dBlock: {
    display: 'block',
  },
  dNone: {
    display: 'none',
  },

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  relative: {
    position: 'relative',
  },

  absolute: {
    position: 'absolute',
  },

  sticky: {
    position: 'sticky',
  },

  static: {
    position: 'static',
  },

  fixed: {
    position: 'fixed',
  },

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  z1: {
    zIndex: 1,
  },
  z2: {
    zIndex: 2,
  },
  z3: {
    zIndex: 3,
  },
  z4: {
    zIndex: 4,
  },
  z5: {
    zIndex: 5,
  },
  z6: {
    zIndex: 6,
  },
  z7: {
    zIndex: 7,
  },
  z10: {
    zIndex: 10,
  },
  z11: {
    zIndex: 11,
  },
  z12: {
    zIndex: 12,
  },
  z13: {
    zIndex: 13,
  },
  z14: {
    zIndex: 14,
  },
  z15: {
    zIndex: 15,
  },
  z16: {
    zIndex: 16,
  },
  z17: {
    zIndex: 17,
  },
  z18: {
    zIndex: 18,
  },
  z19: {
    zIndex: 19,
  },
  z20: {
    zIndex: 20,
  },
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  right0: {
    right: 0,
  },
  right10: {
    right: 10,
  },
  right20: {
    right: 20,
  },
  right30: {
    right: 30,
  },
  right40: {
    right: 40,
  },
  right50: {
    right: 50,
  },
  right60: {
    right: 60,
  },
  right70: {
    right: 70,
  },
  right80: {
    right: 80,
  },
  right90: {
    right: 90,
  },
  right100: {
    right: 100,
  },

  left0: {
    left: 0,
  },
  left10: {
    left: 10,
  },
  left20: {
    left: 20,
  },
  left30: {
    left: 30,
  },
  left40: {
    left: 40,
  },
  left50: {
    left: 50,
  },
  left60: {
    left: 60,
  },
  left70: {
    left: 70,
  },
  left80: {
    left: 80,
  },
  left90: {
    left: 90,
  },
  left100: {
    left: 100,
  },

  top0: {
    top: 0,
  },
  top10: {
    top: 10,
  },
  top20: {
    top: 20,
  },
  top30: {
    top: 30,
  },
  top40: {
    top: 40,
  },
  top50: {
    top: 50,
  },
  top60: {
    top: 60,
  },
  top70: {
    top: 70,
  },
  top80: {
    top: 80,
  },
  top90: {
    top: 90,
  },
  top100: {
    top: 100,
  },

  bottom0: {
    bottom: 0,
  },
  bottom10: {
    bottom: 10,
  },
  bottom20: {
    bottom: 20,
  },
  bottom30: {
    bottom: 30,
  },
  bottom40: {
    bottom: 40,
  },
  bottom50: {
    bottom: 50,
  },
  bottom60: {
    bottom: 60,
  },
  bottom70: {
    bottom: 70,
  },
  bottom80: {
    bottom: 80,
  },
  bottom90: {
    bottom: 90,
  },
  bottom100: {
    bottom: 100,
  },
    /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  shadow1: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Offset in x and y directions
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 3.84, // How blurred the shadow is
    elevation: 3,
  },
  shadow2: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.1, // Opacity of the shadow
    shadowRadius: 1.41, // How blurred the shadow is
    elevation: 3,
  },
  shadow3: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.2, // Opacity of the shadow
    shadowRadius: 2.82, // How blurred the shadow is
    elevation: 4,
  },
  shadow4: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.3, // Opacity of the shadow
    shadowRadius: 4.24, // How blurred the shadow is
    elevation: 5,
  },
  shadow5: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.4, // Opacity of the shadow
    shadowRadius: 5.65, // How blurred the shadow is
    elevation: 6,
  },
  shadow6: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.5, // Opacity of the shadow
    shadowRadius: 6.27, // How blurred the shadow is
    elevation: 8,
  },
  shadow7: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.6, // Opacity of the shadow
    shadowRadius: 7.08, // How blurred the shadow is
    elevation: 9,
  },
  shadow8: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.7, // Opacity of the shadow
    shadowRadius: 8.17, // How blurred the shadow is
    elevation: 10,
  },
  shadow9: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.8, // Opacity of the shadow
    shadowRadius: 9.26, // How blurred the shadow is
    elevation: 11,
  },
  shadow10: {
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 0}, // Offset in x and y directions
    shadowOpacity: 0.9, // Opacity of the shadow
    shadowRadius: 9, // How blurred the shadow is
    elevation: 10,
  },

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
  bgLight: {
    backgroundColor: '#ffffff',
  },
  bgPrimary: {
    backgroundColor: '#007bff',
  },
  bgWarning: {
    backgroundColor: '#ffc107',
  },
  bgSuccess: {
    backgroundColor: '#28a745',
  },
  bgInfo: {
    backgroundColor: '#17a2b8',
  },
  bgDark: {
    backgroundColor: '#343a40',
  },
  bgSecondary: {
    backgroundColor: '#6c757d',
  },
  bgDanger: {
    backgroundColor: '#dc3545',
  },
  bgTransparent: {
    backgroundColor: 'transparent',
  },
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
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

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  objectFitCover: {
    objectFit: 'cover',
  },

  objectFitContain: {
    objectFit: 'contain',
  },

  onjectFitNone: {
    objectFit: 'none',
  },

  objectFitScaleDown: {
    objectFit: 'scale-down',
  },

  objectFitFill: {
    objectFit: 'fill',
  },

  objectFitScaleUp: {
    objectFit: 'scale-up',
  },

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
  bex: {},

  overflowHidden: {
    overflow: 'hidden',
  },

  textCenter: {
    textAlign: 'center',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textStart: {
    textAlign: 'left', // For LTR languages, use 'right' for RTL languages
  },
  textEnd: {
    textAlign: 'right', // For LTR languages, use 'left' for RTL languages
  },

  letterSpace1:{
    letterSpacing:1,
  },
  letterSpace2:{
    letterSpacing:2,
  },
  letterSpace3:{
    letterSpacing:3,
  },
  letterSpace4:{
    letterSpacing:4,
  },
  letterSpace5:{
    letterSpacing:5,
  },

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  bRadius5: {
    borderRadius: 5,
  },

  bRadius8: {
    borderRadius: 8,
  },

  bRadius10: {
    borderRadius: 10,
  },

  bRadius12: {
    borderRadius: 12,
  },
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
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

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
  capitalize: {
    textTransform: 'capitalize',
  },

  lowercase: {
    textTransform: 'lowercase',
  },

  uppercase: {
    textTransform: 'uppercase',
  },

  lineThrough:{
    textDecorationLine:'line-through',
  },

  textLight: {
    color: 'white',
  },

  textDark: {
    color: 'black',
  },
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
  borderPrimary: {
    borderColor: '#007bff', // Blue
    borderWidth: 2,
  },
  borderDark: {
    borderColor: '#000000', // Blue
    borderWidth: 2,
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

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  borderTop: {},

  wfull: {
    width: '100%',
  },

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  p02: {
    padding: 2,
  },

  p04: {
    padding: 4,
  },

  p06: {
    padding: 6,
  },
  p08: {
    padding: 8,
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


  px02: {
    paddingHorizontal: 2,
  },
  px04: {
    paddingHorizontal: 4,
  },
  px06: {
    paddingHorizontal: 6,
  },
  px08: {
    paddingHorizontal: 8,
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
  py02: {
    paddingVertical: 2,
  },
  py04: {
    paddingVertical: 4,
  },
  py06: {
    paddingVertical: 6,
  },
  py08: {
    paddingVertical: 8,
  },
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
  ps02: {
    paddingStart: 2,
  },
  ps04: {
    paddingStart: 4,
  },
  ps06: {
    paddingStart: 6,
  },
  ps08: {
    paddingStart: 8,
  },
  
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
  pe02: {
    paddingEnd: 2,
  },
  pe04: {
    paddingEnd: 4,
  },
  pe06: {
    paddingEnd: 6,
  },
  pe08: {
    paddingEnd: 8,
  }
,  
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
  pt02: {
    paddingTop: 2,
  },
  pt04: {
    paddingTop: 4,
  },
  pt06: {
    paddingTop: 6,
  },
  pt08: {
    paddingTop: 8,
  }
,  
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
  pb02: {
    paddingBottom: 2,
  },
  pb04: {
    paddingBottom: 4,
  },
  pb06: {
    paddingBottom: 6,
  },
  pb08: {
    paddingBottom: 8,
  },
  
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
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
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
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
  fwR: {
    fontWeight: 'regular',
  },
  fwM: {
    fontWeight: 'medium',
  },
  fwB: {
    fontWeight: 'bold',
  },
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
  f10: {
    fontSize: 10,
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
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  gap1: {
    gap: 5,
  },

  gap2: {
    gap: 10,
  },

  gap3: {
    gap: 15,
  },

  gap4: {
    gap: 20,
  },

  gap5: {
    gap: 25,
  },
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  alignItemsCenter: {
    alignItems: 'center',
  },

  alignItemsStart: {
    alignItems: 'start',
  },

  alignItemsEnd: {
    alignItems: 'end',
  },

  alignItemsStretch: {
    alignItems: 'stretch',
  },

  alignItemsBaseline: {
    alignItems: 'baseline',
  },

  justifyContentCenter: {
    justifyContent: 'center',
  },

  justifyContentStart: {
    justifyContent: 'start',
  },

  justifyContentEnd: {
    justifyContent: 'flex-end',
  },

  justifyContentStretch: {
    justifyContent: 'stretch',
  },

  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },

  justifyContentSpaceAround: {
    justifyContent: 'space-around',
  },

  justifyContentSpaceEvenly: {
    justifyContent: 'space-evenly',
  },

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  flexRow: {
    flexDirection: 'row',
  },

  flexColumn: {
    flexDirection: 'column',
  },

  flexRowReverse: {
    flexDirection: 'row-reverse',
  },

  flexColumnReverse: {
    flexDirection: 'column-reverse',
  },

  flexNoWrap: {
    flexWrap: 'nowrap',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
  fx0: {
    flex: 0,
  },

  fx1: {
    flex: 1,
  },
  fx2: {
    flex: 2,
  },
  fx3: {
    flex: 3,
  },
  fx4: {
    flex: 4,
  },
  fx5: {
    flex: 5,
  },
  fx6: {
    flex: 6,
  },
  fx7: {
    flex: 7,
  },
  fx8: {
    flex: 8,
  },
  fx9: {
    flex: 9,
  },
  fx10: {
    flex: 10,
  },

  /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

  w1: {
    width: '1%',
  },
  w2: {
    width: '2%',
  },
  w3: {
    width: '3%',
  },
  w4: {
    width: '4%',
  },
  w5: {
    width: '5%',
  },
  w6: {
    width: '6%',
  },
  w7: {
    width: '7%',
  },
  w8: {
    width: '8%',
  },
  w9: {
    width: '9%',
  },
  w10: {
    width: '10%',
  },
  w11: {
    width: '11%',
  },
  w12: {
    width: '12%',
  },
  w13: {
    width: '13%',
  },
  w14: {
    width: '14%',
  },
  w15: {
    width: '15%',
  },
  w16: {
    width: '16%',
  },
  w17: {
    width: '17%',
  },
  w18: {
    width: '18%',
  },
  w19: {
    width: '19%',
  },
  w20: {
    width: '20%',
  },
  w21: {
    width: '21%',
  },
  w22: {
    width: '22%',
  },
  w23: {
    width: '23%',
  },
  w24: {
    width: '24%',
  },
  w25: {
    width: '25%',
  },
  w26: {
    width: '26%',
  },
  w27: {
    width: '27%',
  },
  w28: {
    width: '28%',
  },
  w29: {
    width: '29%',
  },
  w30: {
    width: '30%',
  },
  w31: {
    width: '31%',
  },
  w32: {
    width: '32%',
  },
  w33: {
    width: '33%',
  },
  w34: {
    width: '34%',
  },
  w35: {
    width: '35%',
  },
  w36: {
    width: '36%',
  },
  w37: {
    width: '37%',
  },
  w38: {
    width: '38%',
  },
  w39: {
    width: '39%',
  },
  w40: {
    width: '40%',
  },
  w41: {
    width: '41%',
  },
  w42: {
    width: '42%',
  },
  w43: {
    width: '43%',
  },
  w44: {
    width: '44%',
  },
  w45: {
    width: '45%',
  },
  w46: {
    width: '46%',
  },
  w47: {
    width: '47%',
  },
  w48: {
    width: '48%',
  },
  w49: {
    width: '49%',
  },
  w50: {
    width: '50%',
  },
  w51: {
    width: '51%',
  },
  w52: {
    width: '52%',
  },
  w53: {
    width: '53%',
  },
  w54: {
    width: '54%',
  },
  w55: {
    width: '55%',
  },
  w56: {
    width: '56%',
  },
  w57: {
    width: '57%',
  },
  w58: {
    width: '58%',
  },
  w59: {
    width: '59%',
  },
  w60: {
    width: '60%',
  },
  w61: {
    width: '61%',
  },
  w62: {
    width: '62%',
  },
  w63: {
    width: '63%',
  },
  w64: {
    width: '64%',
  },
  w65: {
    width: '65%',
  },
  w66: {
    width: '66%',
  },
  w67: {
    width: '67%',
  },
  w68: {
    width: '68%',
  },
  w69: {
    width: '69%',
  },
  w70: {
    width: '70%',
  },
  w71: {
    width: '71%',
  },
  w72: {
    width: '72%',
  },
  w73: {
    width: '73%',
  },
  w74: {
    width: '74%',
  },
  w75: {
    width: '75%',
  },
  w76: {
    width: '76%',
  },
  w77: {
    width: '77%',
  },
  w78: {
    width: '78%',
  },
  w79: {
    width: '79%',
  },
  w80: {
    width: '80%',
  },
  w81: {
    width: '81%',
  },
  w82: {
    width: '82%',
  },
  w83: {
    width: '83%',
  },
  w84: {
    width: '84%',
  },
  w85: {
    width: '85%',
  },
  w86: {
    width: '86%',
  },
  w87: {
    width: '87%',
  },
  w88: {
    width: '88%',
  },
  w89: {
    width: '89%',
  },
  w90: {
    width: '90%',
  },
  w91: {
    width: '91%',
  },
  w92: {
    width: '92%',
  },
  w93: {
    width: '93%',
  },
  w94: {
    width: '94%',
  },
  w95: {
    width: '95%',
  },
  w96: {
    width: '96%',
  },
  w97: {
    width: '97%',
  },
  w98: {
    width: '98%',
  },
  w99: {
    width: '99%',
  },
  w100: {
    width: '100%',
  },

  h1: {height: '1%'},
  h2: {height: '2%'},
  h3: {height: '3%'},
  h4: {height: '4%'},
  h5: {height: '5%'},
  h6: {height: '6%'},
  h7: {height: '7%'},
  h8: {height: '8%'},
  h9: {height: '9%'},
  h10: {height: '10%'},
  h11: {height: '11%'},
  h12: {height: '12%'},
  h13: {height: '13%'},
  h14: {height: '14%'},
  h15: {height: '15%'},
  h16: {height: '16%'},
  h17: {height: '17%'},
  h18: {height: '18%'},
  h19: {height: '19%'},
  h20: {height: '20%'},
  h21: {height: '21%'},
  h22: {height: '22%'},
  h23: {height: '23%'},
  h24: {height: '24%'},
  h25: {height: '25%'},
  h26: {height: '26%'},
  h27: {height: '27%'},
  h28: {height: '28%'},
  h29: {height: '29%'},
  h30: {height: '30%'},
  h31: {height: '31%'},
  h32: {height: '32%'},
  h33: {height: '33%'},
  h34: {height: '34%'},
  h35: {height: '35%'},
  h36: {height: '36%'},
  h37: {height: '37%'},
  h38: {height: '38%'},
  h39: {height: '39%'},
  h40: {height: '40%'},
  h41: {height: '41%'},
  h42: {height: '42%'},
  h43: {height: '43%'},
  h44: {height: '44%'},
  h45: {height: '45%'},
  h46: {height: '46%'},
  h47: {height: '47%'},
  h48: {height: '48%'},
  h49: {height: '49%'},
  h50: {height: '50%'},
  h51: {height: '51%'},
  h52: {height: '52%'},
  h53: {height: '53%'},
  h54: {height: '54%'},
  h55: {height: '55%'},
  h56: {height: '56%'},
  h57: {height: '57%'},
  h58: {height: '58%'},
  h59: {height: '59%'},
  h60: {height: '60%'},
  h61: {height: '61%'},
  h62: {height: '62%'},
  h63: {height: '63%'},
  h64: {height: '64%'},
  h65: {height: '65%'},
  h66: {height: '66%'},
  h67: {height: '67%'},
  h68: {height: '68%'},
  h69: {height: '69%'},
  h70: {height: '70%'},
  h71: {height: '71%'},
  h72: {height: '72%'},
  h73: {height: '73%'},
  h74: {height: '74%'},
  h75: {height: '75%'},
  h76: {height: '76%'},
  h77: {height: '77%'},
  h78: {height: '78%'},
  h79: {height: '79%'},
  h80: {height: '80%'},
  h81: {height: '81%'},
  h82: {height: '82%'},
  h83: {height: '83%'},
  h84: {height: '84%'},
  h85: {height: '85%'},
  h86: {height: '86%'},
  h87: {height: '87%'},
  h88: {height: '88%'},
  h89: {height: '89%'},
  h90: {height: '90%'},
  h91: {height: '91%'},
  h92: {height: '92%'},
  h93: {height: '93%'},
  h94: {height: '94%'},
  h95: {height: '95%'},
  h96: {height: '96%'},
  h97: {height: '97%'},
  h98: {height: '98%'},
  h99: {height: '99%'},
  h100: {height: '100%'},
});

export default ES;
