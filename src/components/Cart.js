import React from 'react';
import styles from '../styles/Cart.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeProduct, addQuantity, subQuantity } from '../redux/actions/cartActions.js';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from '../images/bee-5069115_1280.png';

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
        let addedProducts = this.props.products.length ? (
            this.props.products.map(prod => {
                return (
                    <div key={prod._id}>
                        <div className={styles.cartcontainer}>
                            <img className={styles.img} src={img} alt={prod.title} />
                            <div className={styles.titleDesc}>
                                <div className={styles.title}>{prod.title}</div>
                                <div className={styles.desc}>{prod.desc}</div>
                            </div>
                            <div className={styles.price}>Price: {`${prod.price.currency} ${prod.price.value}`}</div>
                            <div className={styles.addRemove}>
                                <Link className={styles.a} to="/cart"><FontAwesomeIcon className={styles.icon} onClick={() => { this.handleAddQuantity(prod._id) }} icon="chevron-up" /></Link>
                                <div className={styles.quantity}>Quantity: {prod.quantity}</div>
                                <Link className={styles.a} to="/cart"><FontAwesomeIcon className={styles.icon} onClick={() => { this.handleSubQuantity(prod._id) }} icon="chevron-down" /></Link>
                            </div>
                            <Link className={styles.a} to='/store'><button className={styles.button} onClick={() => { this.handleRemove(prod._id) }}>Remove</button></Link>
                        </div>
                        <div className={styles.total}>
                            <div className={styles.totalamount}>Total: {this.props.total} EUR</div>
                            <Link className={styles.a} to="/form"><button className={styles.button}>BUY</button></Link>
                        </div>
                    </div>
                )
            })
        ) : (<div className={styles.proderror}>No products selected!</div>);

        return (
            <div>
                <div className={styles.cart}>
                    {addedProducts}
                </div>
            </div>
        )
    }
}

Cart.propTypes = {
    removeProduct: PropTypes.func.isRequired,
    addQuantity: PropTypes.func.isRequired,
    subQuantity: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    products: state.cartReducer.addedProducts,
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