import {combineReducers} from "redux";
import userSlice from "./slices/authSlice.js"


const rootReducer = combineReducers({
    user: userSlice
})


export default rootReducer