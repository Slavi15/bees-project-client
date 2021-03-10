import React from 'react';
import styles from '../styles/Products.module.scss';
import Footer from './Footer.js';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/actions/productActions.js';
import { addToCart } from '../redux/actions/cartActions.js';
import { bindActionCreators } from 'redux';
import img from '../images/bee-5069115_1280.png';

class Products extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    handleClick = (_id) => {
        this.props.addToCart(_id);
    }

    render() {
        const products = this.props.products.map(prod => (
            <div className={styles.product} key={prod._id}>
                <div className={styles.title}>{prod.title}</div>
                <img className={styles.img} src={img} alt={prod.title} />
                <div className={styles.desc}>{prod.desc}</div>
                <div className={styles.price}>{`${prod.price.currency} ${prod.price.value}`}</div>
                <Link className={styles.a} to='/cart'><button className={styles.button} onClick={() => { this.handleClick(prod._id) }}>Add to cart</button></Link>
            </div>
        ));

        return (
            <div>
                <div className={styles.container}>{products}</div>
                <Footer />
            </div>
        )
    }
}

Products.propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    products: state.productReducer.products
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProducts: bindActionCreators(fetchProducts, dispatch),
        addToCart: (_id) => { dispatch(addToCart(_id)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);