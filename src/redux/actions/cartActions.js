import { ADD_TO_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUB_QUANTITY } from '../constants/index.js';

export const addToCart = (_id) => {
    return {
        type: ADD_TO_CART,
        _id
    }
}

export const removeProduct = (_id) => {
    return {
        type: REMOVE_FROM_CART,
        _id
    }
}

export const addQuantity = (_id) => {
    return {
        type: ADD_QUANTITY,
        _id
    }
}

export const subQuantity = (_id) => {
    return {
        type: SUB_QUANTITY,
        _id
    }
}