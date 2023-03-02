import {combineReducers} from "redux";
import userSlice from "./slices/userSlice.js"
import productsSlice from "./slices/productsSlice.js";


const rootReducer = combineReducers({
    user: userSlice,
    products: productsSlice
})


export default rootReducer