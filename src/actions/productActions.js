import { FETCH_PRODUCTS } from '../constants/index.js';
import axios from 'axios';

export const fetchProducts = () => dispatch => {
    axios.all([
        axios.get('http://localhost:8000/api/bees-products-en'),
        axios.get('http://localhost:8000/api/bees-products-wholesale-en')
    ])
    .then(res => 
        dispatch({
            type: FETCH_PRODUCTS,
            products: res[0].data,
            productswholesale: res[1].data
        })
    )
    .catch(err => {
        console.log(err);
    })
}