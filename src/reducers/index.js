import { combineReducers } from 'redux';
import productReducer from './productReducer.js';
import cartReducer from './cartReducer.js';

export default combineReducers({
    productReducer: productReducer,
    cartReducer: cartReducer
});