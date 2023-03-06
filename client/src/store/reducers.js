import {combineReducers} from "redux";
import userSlice from "./slices/userSlice.js"
import productsSlice from "./slices/productsSlice.js";
import cartSlice from "./slices/cartSlice.js";


const rootReducer = combineReducers({
    user: userSlice,
    products: productsSlice,
    cart: cartSlice
})


export default rootReducer