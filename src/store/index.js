import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./main-slice";
import cartReducer from "./cart-slice";


const store = configureStore({
    reducer: {
        main: mainReducer,
        cart: cartReducer,
    },
});

export default store;