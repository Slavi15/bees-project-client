import { FETCH_PRODUCTS } from '../constants/index.js';

const initialState = {
    products: []
};

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        default:
            return state
    }
}

export default productReducer;