import { IS_LOGGED_IN } from "./constants";

export function toggleLogin(item){
    console.log("toggleLogin called ",item)
    return{
        type: IS_LOGGED_IN,
        data:item
    }
} 