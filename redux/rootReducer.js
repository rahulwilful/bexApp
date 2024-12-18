import { combineReducers } from "redux";
import { reducer,categoryReducer, topDealsReducer, topSellerReducer, bannerReducer, cartRenderKeyReducer } from "./reducer";
import { cartReducer } from "./CartReducer";

export default combineReducers({
    auth:reducer,
    category:categoryReducer,
    cart:cartReducer,
    topDeals:topDealsReducer,
    topSellers:topSellerReducer,
    banners:bannerReducer,
    cartRenderKey:cartRenderKeyReducer,
})