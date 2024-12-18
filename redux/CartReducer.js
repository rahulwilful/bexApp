import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_QUANTITY,
    DECREARSE_QUANTITY,
    EMPTY_THE_CART,
  } from './constants';


const initialCart = [];

const initialCartRenderKey = 0;

export const cartReducer = (state = initialCart, action) => {
    switch (action.type) {
      case ADD_TO_CART: {
        const existingItemIndex = state.findIndex(
          item => item._id === action.data._id,
        );
        if (existingItemIndex !== -1) {
          return state.map((item, index) =>
            index === existingItemIndex
              ? {...item, quantity: item.quantity + 1,totalOfferPrice:item.totalOfferPrice + action.data.pricing.offerPrice ,totalPrice:item.totalPrice + action.data.pricing.price}
              : item,
          );
        }
        return [...state, {...action.data, quantity: 1,totalOfferPrice:action.data.pricing.offerPrice ,totalPrice:action.data.pricing.price}];
      }
      case REMOVE_FROM_CART: {
        return state.filter(item => item._id !== action.data._id);
      }
      case INCREASE_QUANTITY: {
        return state.map(item =>
          item._id === action.data._id
            ? {...item, quantity: item.quantity + 1,totalOfferPrice:item.totalOfferPrice + action.data.pricing.offerPrice, totalPrice:item.totalPrice +action.data.pricing.price}
            : item,
        );
      }
      case DECREARSE_QUANTITY: {
        return state.map(item =>
          item._id === action.data._id
            ? {...item, quantity: item.quantity - 1,totalOfferPrice:item.totalOfferPrice - action.data.pricing.offerPrice ,totalPrice:item.totalPrice  - action.data.pricing.price}
            : item,
        );
      }
      case EMPTY_THE_CART:{
        return [];
      }
      default:
        return state;
    }
  };