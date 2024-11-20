import { IS_LOGGED_IN,SET_CATEGORIES,ADD_TO_CART, SET_TOP_DEALS, SET_TOP_SELLERS, SET_BANNERS, REMOVE_FROM_CART } from "./constants";

export function toggleLogin(item){
    //console.log("toggleLogin called ",item)
    return{
        type: IS_LOGGED_IN,
        data:item
    }
} 

export function setCategories (item){
   
    return{
        type: SET_CATEGORIES,
        data:item
    }
}

export function setTopDeals (item){
   
    return{
        type: SET_TOP_DEALS,
        data:item
    }
}

export function setTopSellers (item){
   
    return{
        type: SET_TOP_SELLERS,
        data:item
    }
}

export function setBanners (item){
   
    return{
        type: SET_BANNERS,
        data:item
    }
}

export function addToCart (item){
   
    return{
        type: ADD_TO_CART,
        data:item
    }
}

export function removeFromCart (item){
   
    return{
        type: REMOVE_FROM_CART,
        data:item
    }
}


