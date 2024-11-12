import { IS_LOGGED_IN } from "./constants";

const initialLoginState = null;

export const reducer =(state=initialLoginState,action) => {
    switch(action.type){
        case IS_LOGGED_IN:
            return action.data
        default:
            return state;
    }
}