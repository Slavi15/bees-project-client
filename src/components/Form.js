import React from 'react';
import styles from '../styles/Form.module.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import img from '../images/bee-5069115_1280.png';
const Cookies = require('js-cookie');

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            tel: ""
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        if(!Cookies.get('jwt')) {
            document.getElementById('buy-error').textContent = 'You need to be logged in!';
        }

        const emailError = document.getElementById('email-error');
        const firstNameError = document.getElementById('first-error');
        const lastNameError = document.getElementById('last-error');
        const addressError = document.getElementById('address-error');
        const telError = document.getElementById('tel-error');

        emailError.textContent = '';
        firstNameError.textContent = '';
        lastNameError.textContent = '';
        addressError.textContent = '';
        telError.textContent = '';

        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            phoneNumber: this.state.tel,
            products: this.props.products,
            total: this.props.total
        };

        await axios.request({
            method: 'POST',
            url: 'https://beesproject-api.herokuapp.com/api/orders',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`
            },
            data: data
        })
        .then(res => {
            console.log(res.data);
            if(res.data.order) {
                window.location.assign('/');
            }
        })
        .catch(err => {
            if(err.response.data.errors) {
                emailError.textContent = err.response.data.errors.email;
                firstNameError.textContent = err.response.data.errors.firstName;
                lastNameError.textContent = err.response.data.errors.lastName;
                addressError.textContent = err.response.data.errors.address;
                telError.textContent = err.response.data.errors.phoneNumber;
            }
            console.log(err);
        });
    };

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    render() {
        const addedProducts = this.props.products.map(prod => {
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
                            <div className={styles.quantity}>Quantity: {prod.quantity}</div>     
                        </div>
                    </div>                    
                    <div className={styles.total}>
                        <div className={styles.totalamount}>Total: {this.props.total} EUR</div>
                    </div>
                </div>
            )
        })

        const { firstName, lastName, email, address, tel } = this.state;

        return (
            <div>
                <div className={styles.cart}>
                    {addedProducts}
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.formwrapper}>
                        <div className={styles.title}>Create Order</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className={styles.firstName}>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    placeholder="First Name"
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                <div id="first-error" className={styles.error}></div>
                            </div>
                            <div className={styles.lastName}>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    placeholder="Last Name"
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                <div id="last-error" className={styles.error}></div>
                            </div>
                            <div className={styles.email}>
                                <label htmlFor="email">Email</label>
                                <input
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                <div id="email-error" className={styles.error}></div>
                            </div>
                            <div className={styles.address}>
                                <label htmlFor="address">Address</label>
                                <input
                                    placeholder="Address"
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                <div id="address-error" className={styles.error}></div>
                            </div>
                            <div className={styles.tel}>
                                <label htmlFor="tel">Phone Number</label>
                                <input
                                    placeholder="0891234567"
                                    type="tel"
                                    name="tel"
                                    value={tel}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                <div id="tel-error" className={styles.error}></div>
                            </div>
                            <div id="buy-error" className={styles.buyerror}></div>
                            <div className={styles.orderBtn}>
                                <button type="submit" className={styles.button}>Create Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Form.propTypes = {
    products: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    products: state.cartReducer.addedProducts,
    total: state.cartReducer.total
});

export default connect(mapStateToProps)(Form);