import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import Navbar from './Navbar.jsx';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });
    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });
    return valid;
};

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            tel: "",
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                address: "",
                tel: ""
            }
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log("Data is valid");
        } else {
            console.error("Data is invalid");
        };

        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            phoneNumber: this.state.tel,
            products: this.props.products,
            productswholesale: this.props.productswholesale,
            total: this.props.total
        };

        await axios.post('http://localhost:8000/api/bees-orders', data, { headers: { 'Content-Type': 'application/json' }})
            .then(res => {
                console.log(res.data);
                if(res.data.order) {
                    window.location.assign('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName = value.length < 2 ? "minimum 2 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName = value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
                break;
            case "address":
                formErrors.address = value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            case "tel":
                formErrors.tel = value.length < 7 ? "minimum 7 characters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    };

    render() {
        const honey = require('../images/bee-5069115_1280.png');

        const addedProducts = this.props.products.map(prod => {
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
                        <div className="cartprod-quantity">Quantity: {prod.quantity}</div>
                    </div>
                </div>
            )
        })

        const addedProductsW = this.props.productswholesale.map(prodw => {
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
                        <div className="cartprod-quantity">Quantity: {prodw.quantity}</div>
                    </div>
                </div>
            )
        })

        const { firstName, lastName, email, address, tel, formErrors } = this.state;

        return (
            <div>
                <Navbar />
                <div className="cart-info-form">
                    {addedProducts}
                </div>
                <div className="cart-info-form">
                    {addedProductsW}
                </div>
                <div className="line-break" style={{ maxWidth: "80%", height: 6 }}></div>
                <div className="fortotal-form">
                    <div className="total-prod">Total: {this.props.total} EUR</div>
                </div>
                <div className="line-break-2" style={{ maxWidth: "45%", height: 2.8 }}></div>
                <div className="wrapper">
                    <div className="form-wrapper">
                        <div className="form-title">Create Order</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="firstName">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    className={formErrors.firstName.length > 0 ? "error" : null}
                                    placeholder="First Name"
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={this.handleChange}
                                    minLength="2"
                                    required >
                                </input>
                                {formErrors.firstName.length > 0 && (
                                    <span className="errorMessage">{formErrors.firstName}</span>
                                )}
                            </div>
                            <div className="lastName">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    className={formErrors.lastName.length > 0 ? "error" : null}
                                    placeholder="Last Name"
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    onChange={this.handleChange}
                                    minLength="3"
                                    required >
                                </input>
                                {formErrors.lastName.length > 0 && (
                                    <span className="errorMessage">{formErrors.lastName}</span>
                                )}
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    className={formErrors.email.length > 0 ? "error" : null}
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                {formErrors.email.length > 0 && (
                                    <span className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>
                            <div className="address">
                                <label htmlFor="address">Address</label>
                                <input
                                    className={formErrors.address.length > 0 ? "error" : null}
                                    placeholder="Address"
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={this.handleChange}
                                    minLength="6"
                                    required >
                                </input>
                                {formErrors.address.length > 0 && (
                                    <span className="errorMessage">{formErrors.address}</span>
                                )}
                            </div>
                            <div className="tel">
                                <label htmlFor="tel">Phone Number</label>
                                <input
                                    className={formErrors.tel.length > 0 ? "error" : null}
                                    placeholder="0891234567"
                                    type="tel"
                                    name="tel"
                                    value={tel}
                                    onChange={this.handleChange}
                                    minLength="7"
                                    maxLength="15"
                                    required >
                                </input>
                                {formErrors.tel.length > 0 && (
                                    <span className="errorMessage">{formErrors.tel}</span>
                                )}
                            </div>
                            <div className="createOrder">
                                <button type="submit" className="button">Create Order</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="line-break-3" style={{ maxWidth: "45%", height: 3 }}></div>
            </div>
        )
    }
}

Form.propTypes = {
    products: PropTypes.array.isRequired,
    productswholesale: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    products: state.cartReducer.addedProducts,
    productswholesale: state.cartReducer.addedProductsW,
    total: state.cartReducer.total
});

export default connect(mapStateToProps)(Form);