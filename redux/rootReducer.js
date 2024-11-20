import { combineReducers } from "redux";
import { reducer,categoryReducer,cartReducer, topDealsReducer, topSellerReducer, bannerReducer } from "./reducer";

export default combineReducers({
    auth:reducer,
    category:categoryReducer,
    cart:cartReducer,
    topDeals:topDealsReducer,
    topSellers:topSellerReducer,
    banners:bannerReducer
})