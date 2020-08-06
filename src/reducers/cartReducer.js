import { ADD_TO_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUB_QUANTITY } from '../constants/index.js';
import { FETCH_PRODUCTS } from '../constants/index.js';

const initialState = {
    products: [],
    addedProducts: [],
    total: 0
}

const cartReducer = (state = initialState, action) => {
    let addedItem;
    let newTotal;
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.products
            }
        case ADD_TO_CART:
            addedItem = state.products.find(prod => prod._id === action._id);
            let existedProduct = state.addedProducts.find(prod => action._id === prod._id);
            if (existedProduct) {
                addedItem.quantity += 1;
                return {
                    ...state,
                    total: state.total + addedItem.price.value
                }
            } else {
                addedItem.quantity = 1;
                let newTotal = state.total + addedItem.price.value;

                return {
                    ...state,
                    addedProducts: [...state.addedProducts, addedItem],
                    total: newTotal
                }
            }
        case REMOVE_FROM_CART:
            let productToRemove = state.addedProducts.find(prod => action._id === prod._id);
            let newProducts = state.addedProducts.filter(prod => action._id !== prod._id);
            newTotal = state.total - (productToRemove.price.value * productToRemove.quantity);
            console.log(productToRemove);

            return {
                ...state,
                addedProducts: newProducts,
                total: newTotal
            }
        case ADD_QUANTITY:
            addedItem = state.products.find(prod => prod._id === action._id);
            addedItem.quantity += 1;
            newTotal = state.total + addedItem.price.value;

            return {
                ...state,
                total: newTotal
            }
        case SUB_QUANTITY:
            addedItem = state.products.find(prod => prod._id === action._id);
            if (addedItem.quantity === 1) {
                let newProducts = state.addedProducts.filter(prod => prod._id !== action._id);
                let newTotal = state.total - addedItem.price.value;
                return {
                    ...state,
                    addedProducts: newProducts,
                    total: newTotal
                }
            } else {
                addedItem.quantity -= 1;
                let newTotal = state.total - addedItem.price.value;
                return {
                    ...state,
                    total: newTotal
                }
            }
        default:
            return state
    }
}

export default cartReducer;