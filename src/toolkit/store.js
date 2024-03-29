import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import generalReducer from './generalSlice';

const store = configureStore({
  reducer:{
    user: userReducer,
    general: generalReducer
//multiple 
}
});


export default store