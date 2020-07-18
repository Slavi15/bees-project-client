import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions.js';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

class Store extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
    }
    render() {

        const honey = require('../images/bee-5069115_1280.png')
        const productsBg = this.props.products.map(prod => (
            <div className="retail-prod" key={prod._id}>
                <div className="title">{prod.title}</div>
                <img style={{ maxWidth: "40%", margin: "10px auto" }} src={honey} alt={prod.title} />
                <div className="desc">{prod.desc}</div>
                <div className="price">{`${prod.price.currency} ${prod.price.value}`}</div>
                <div className="button">Add to cart</div>
            </div>
        ));
        const productsWholesale = this.props.productswholesale.map(prodw => (
            <div className="retail-prod-wholesale" key={prodw._id}>
                <div className="title">{prodw.title}</div>
                <img style={{ maxWidth: "40%", margin: "10px auto" }} src={honey} alt={prodw.title} />
                <div className="desc">{prodw.desc}</div>
                <div className="price">{`${prodw.price.currency} ${prodw.price.value}${prodw.price.amount}`}</div>
                <div className="button">Add to cart</div>
            </div>
        ));

        return (
            <div>
                <Navbar />
                <div className="store-container">
                    <div className="store-options">
                        <h1>Retail</h1>
                        {productsBg}
                        <h1>Wholesale</h1>
                        {productsWholesale}
                        <div></div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

Store.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    productswholesale: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    products: state.productReducer.products,
    productswholesale: state.productReducer.productswholesale
})

export default connect(mapStateToProps, { fetchProducts })(Store);