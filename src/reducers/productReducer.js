import { FETCH_PRODUCTS } from '../constants/index.js';

const initialState = {
    products: [],
    productswholesale: []
};

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.products,
                productswholesale: action.productswholesale
            }
        default:
            return state
    }
}

export default productReducer;