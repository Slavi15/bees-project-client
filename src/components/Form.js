import React from 'react';
import styles from '../styles/Form.module.scss';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import img from '../images/bee-5069115_1280.png';
const Cookies = require('js-cookie');

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
            total: this.props.total
        };

        await axios.request({
            method: 'POST',
            url: 'http://localhost:8000/api/orders',
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

        const { firstName, lastName, email, address, tel, formErrors } = this.state;

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
                                    <span className={styles.errorMessage}>{formErrors.firstName}</span>
                                )}
                            </div>
                            <div className={styles.lastName}>
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
                                    <span className={styles.errorMessage}>{formErrors.lastName}</span>
                                )}
                            </div>
                            <div className={styles.email}>
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
                                    <span className={styles.errorMessage}>{formErrors.email}</span>
                                )}
                            </div>
                        <div className={styles.address}>
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
                                    <span className={styles.errorMessage}>{formErrors.address}</span>
                                )}
                            </div>
                            <div className={styles.tel}>
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
                                    <span className={styles.errorMessage}>{formErrors.tel}</span>
                                )}
                            </div>
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