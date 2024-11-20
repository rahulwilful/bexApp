import { IS_LOGGED_IN,SET_CATEGORIES,ADD_TO_CART, SET_TOP_DEALS, SET_TOP_SELLERS, SET_BANNERS, REMOVE_FROM_CART } from "./constants";

const initialLoginState = null;
const initialCategoryState = [];
const initialCart = []
const initlaTopDeals = []
const initialTopSellers = []
const initialBanners = []

export const reducer =(state=initialLoginState,action) => {
    switch(action.type){
        case IS_LOGGED_IN:
            return action.data
        default:
            return state;
    }
}

export const categoryReducer = (state=initialCategoryState,action) =>{
    switch(action.type){
        case SET_CATEGORIES:
            return action.data
        default:
            return state
    }
}

export const topDealsReducer = (state=initlaTopDeals,action)=>{
    switch(action.type){
        case SET_TOP_DEALS:
            return action.data
        default:
            return state
    }
}

export const topSellerReducer = (state=initialTopSellers,action)=>{
    switch(action.type){
        case SET_TOP_SELLERS:
            return action.data
        default:
            return state
    }
}

export const bannerReducer = (state=initialBanners,action)=>{
    switch(action.type){
        case SET_BANNERS:
            return action.data
        default:
            return state
    }
}

export const cartReducer = (state=initialCart,action)=>{
    switch(action.type){
        case ADD_TO_CART:
            return [...state,action.data]
        case REMOVE_FROM_CART:
            return state.filter((item) => item._id !== action.data._id)
        default:
            return state
    }
}