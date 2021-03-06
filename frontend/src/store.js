import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, productDetailsReducer, productReducer, productsReducer} from "./reducers/productReducer";
import { userDetailsReducer, userReducer } from "./reducers/userReducer";



const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    product: productsReducer,
    newProduct: newProductReducer,
    
})

let initialState = {
    // cart:{
    //     cartItems: localStorage.getItem("cartItems")
    //     ? JSON.parse(localStorage.getItem("cartItems"))
    //     : [],
    //     shippingInfo: localStorage.getItem("shippingInfo")
    //     ? JSON.parse(localStorage.getItem("shippingInfo")):
    //     {}
    // }
};

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
 )


export default store;