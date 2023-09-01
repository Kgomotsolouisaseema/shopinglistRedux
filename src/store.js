// src/store.js
// import { createStore} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import rootReducer from "./redux/reducers";


// Create the Redux store
 export const store = configureStore({reducer :rootReducer});
//  export const store = configureStore({ reducer: { user: userReducer, }, });

// export default store;
