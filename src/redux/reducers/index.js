import { combineReducers } from 'redux';
import productReducer from './productReducer.js';
import cartReducer from './cartReducer.js';

const rootReducer = combineReducers({
    productReducer: productReducer,
    cartReducer: cartReducer
});

export default rootReducer;