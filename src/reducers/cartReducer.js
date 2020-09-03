import { FETCH_PRODUCTS, ADD_TO_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUB_QUANTITY } from '../constants/index.js';

const initialState = {
    products: [],
    productswholesale: [],
    addedProducts: [],
    addedProductsW: [],
    total: 0
}

const cartReducer = (state = initialState, action) => {
    let addedItem;
    let addedItemW;
    let newTotal;
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.products,
                productswholesale: action.productswholesale
            }
        case ADD_TO_CART:
            addedItem = state.products.find(prod => prod._id === action._id);
            addedItemW = state.productswholesale.find(prodw => prodw._id === action._id);
            let existedProduct = state.addedProducts.find(prod => action._id === prod._id);
            let existedProductW = state.addedProductsW.find(prodw => action._id === prodw._id);
            
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

            }

            try {
                if (existedProductW) {
                    addedItemW.quantity += 1;
                    let newTotal = state.total + addedItemW.price.value;
                    return {
                        ...state,
                        total: newTotal
                    }
                } else {
                    addedItemW.quantity = 1;
                    let newTotal = state.total + addedItemW.price.value;

                    return {
                        ...state,
                        addedProductsW: [...state.addedProductsW, addedItemW],
                        total: newTotal
                    }
                }
            } catch (err) {

            };
            break;
        case REMOVE_FROM_CART:
            let productToRemove = state.addedProducts.find(prod => action._id === prod._id);
            let productToRemoveW = state.addedProductsW.find(prodw => action._id === prodw._id);
            let newProducts = state.addedProducts.filter(prod => action._id !== prod._id);
            let newProductsW = state.addedProductsW.filter(prodw => action._id !== prodw._id);

            try {
                let newTotal = state.total - (productToRemove.price.value * productToRemove.quantity);
                return {
                    ...state,
                    addedProducts: newProducts,
                    total: newTotal
                }
            } catch (err) {

            };

            try {
                let newTotal = state.total - (productToRemoveW.price.value * productToRemoveW.quantity);
                return {
                    ...state,
                    addedProductsW: newProductsW,
                    total: newTotal
                }
            } catch (err) {

            }
            break;
        case ADD_QUANTITY:
            addedItem = state.products.find(prod => prod._id === action._id);
            addedItemW = state.productswholesale.find(prodw => prodw._id === action._id);

            try {
                addedItem.quantity += 1;
                newTotal = state.total + addedItem.price.value;
                return {
                    ...state,
                    total: newTotal
                }
            } catch (err) {

            };

            try {
                addedItemW.quantity += 1;
                newTotal = state.total + addedItemW.price.value;
                return {
                    ...state,
                    total: newTotal
                }
            } catch (err) {

            };
            break;
        case SUB_QUANTITY:
            addedItem = state.products.find(prod => prod._id === action._id);
            addedItemW = state.productswholesale.find(prodw => prodw._id === action._id);

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

            };

            try {
                if (addedItemW.quantity === 1) {
                    let newProductsW = state.addedProductsW.filter(prodw => prodw._id !== action._id);
                    let newTotal = state.total - addedItemW.price.value;
                    return {
                        ...state,
                        addedProductsW: newProductsW,
                        total: newTotal
                    }
                } else {
                    addedItemW.quantity -= 1;
                    let newTotal = state.total - addedItemW.price.value;
                    return {
                        ...state,
                        total: newTotal
                    }
                }
            } catch (err) {
                
            };
            break;
        default:
            return state
    }
}

export default cartReducer;