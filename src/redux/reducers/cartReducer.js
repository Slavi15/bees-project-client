import { FETCH_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUB_QUANTITY } from '../constants/index.js';

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
            
            try {
                if (existedProduct) {
                    addedItem.quantity += 1;
                    let newTotal = state.total + addedItem.price.value;
                    return {
                        ...state,
                        total: newTotal
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
            } catch(err) {
                console.log(err);
            }
            break;
        case REMOVE_FROM_CART:
            let productToRemove = state.addedProducts.find(prod => action._id === prod._id);
            let newProducts = state.addedProducts.filter(prod => action._id !== prod._id);

            try {
                let newTotal = state.total - (productToRemove.price.value * productToRemove.quantity);
                return {
                    ...state,
                    addedProducts: newProducts,
                    total: newTotal
                }
            } catch (err) {
                console.log(err);
            };
            break;
        case ADD_QUANTITY:
            addedItem = state.products.find(prod => prod._id === action._id);

            try {
                addedItem.quantity += 1;
                newTotal = state.total + addedItem.price.value;
                return {
                    ...state,
                    total: newTotal
                }
            } catch (err) {
                console.log(err);
            };
            break;
        case SUB_QUANTITY:
            addedItem = state.products.find(prod => prod._id === action._id);

            try {
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
            } catch (err) {
                console.log(err);
            };
            break;
        default:
            return state
    }
}

export default cartReducer;