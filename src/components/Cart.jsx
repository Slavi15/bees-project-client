import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeProduct, addQuantity, subQuantity } from '../actions/cartActions.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './Navbar.jsx';

class Cart extends React.Component {

    handleRemove = (_id) => {
        this.props.removeProduct(_id);
    }

    handleAddQuantity = (_id) => {
        this.props.addQuantity(_id);
    }

    handleSubQuantity = (_id) => {
        this.props.subQuantity(_id);
    }

    render() {
        const honey = require('../images/bee-5069115_1280.png');

        let addedProducts = this.props.products.length ? (
            this.props.products.map(prod => {
                return (
                    <div className="cart-container" key={prod._id}>
                        <div className="cartprod-img">
                            <img style={{ maxWidth: "40%", margin: "auto" }} src={honey} alt={prod.title} />
                        </div>
                        <div className="cartprod-details">
                            <div className="cartprod-title">{prod.title}</div>
                            <div className="cartprod-desc">{prod.desc}</div>
                        </div>
                        <div className="cartprod-price">Price: {`${prod.price.currency} ${prod.price.value}`}</div>
                        <div className="cartprod-add-remove">
                            <Link to="/cart"><FontAwesomeIcon className="cartprod-uparr" onClick={() => { this.handleAddQuantity(prod._id) }} icon="chevron-up" /></Link>
                            <div className="cartprod-quantity">Quantity: {prod.quantity}</div>
                            <Link to="/cart"><FontAwesomeIcon className="cartprod-downarr" onClick={() => { this.handleSubQuantity(prod._id) }} icon="chevron-down" /></Link>
                        </div>
                        <button className="button lowest-button" onClick={() => { this.handleRemove(prod._id) }}>Remove</button>
                    </div>
                )
            })
        ) : (<div></div>);

        let addedProductsW = this.props.productswholesale.length ? (
            this.props.productswholesale.map(prodw => {
                return (
                    <div className="cart-container-w" key={prodw._id}>
                        <div className="cartprod-img">
                            <img style={{ maxWidth: "40%", margin: "auto" }} src={honey} alt={prodw.title} />
                        </div>
                        <div className="cartprod-details">
                            <div className="cartprod-title">{prodw.title}</div>
                            <div className="cartprod-desc">{prodw.desc}</div>
                        </div>
                        <div className="cartprod-price">Price: {`${prodw.price.currency} ${prodw.price.value}`}</div>
                        <div className="cartprod-add-remove">
                            <Link to="/cart"><FontAwesomeIcon className="cartprod-uparr" onClick={() => { this.handleAddQuantity(prodw._id) }} icon="chevron-up" /></Link>
                            <div className="cartprod-quantity">Quantity: {prodw.quantity}</div>
                            <Link to="/cart"><FontAwesomeIcon className="cartprod-downarr" onClick={() => { this.handleSubQuantity(prodw._id) }} icon="chevron-down" /></Link>
                        </div>
                        <button className="button lowest-button" onClick={() => { this.handleRemove(prodw._id) }}>Remove</button>
                    </div>
                )
            })
        ) : (<div></div>);
        
        return (
            <div>
                <Navbar />
                <div className="cart-info">
                    {addedProducts}
                </div>
                <div className="cart-info">
                    {addedProductsW}
                </div>
                <div className="line-break" style={{ maxWidth: "80%", height: 6 }}></div>
                <div className="fortotal">
                    <div className="total-prod">Total: {this.props.total} EUR</div>
                    <button className="button">BUY</button>
                </div>
            </div>
        )
    }
}

Cart.propTypes = {
    removeProduct: PropTypes.func.isRequired,
    addQuantity: PropTypes.func.isRequired,
    subQuantity: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    productswholesale: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    products: state.cartReducer.addedProducts,
    productswholesale: state.cartReducer.addedProductsW,
    total: state.cartReducer.total
});

const mapDispatchToProps = (dispatch) => {
    return {
        removeProduct: (_id) => { dispatch(removeProduct(_id)) },
        addQuantity: (_id) => { dispatch(addQuantity(_id)) },
        subQuantity: (_id) => { dispatch(subQuantity(_id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);