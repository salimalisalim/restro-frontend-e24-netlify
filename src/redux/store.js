import {configureStore} from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
import userAuth from "./userAuth";

const store = configureStore({
    reducer:{
        data:restaurantSlice,
        auth:userAuth, 
    }
});

export default store;