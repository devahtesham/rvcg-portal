import { combineReducers } from "redux";
import AuthReducer from "../slices/authSlice/authSlice"
import PropertyMangementReducer from "../slices/propertyManagementSlice/propertyManagementSlice"

const rootReducer = combineReducers({
    AuthReducer,
    PropertyMangementReducer
})

export default rootReducer