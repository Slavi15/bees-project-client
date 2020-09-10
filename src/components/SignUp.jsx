import React from 'react';
import Navbar from './Navbar.jsx';
import axios from 'axios';

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {
                email: '',
                password: ''
            }
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password
        };

        await axios.post('http://localhost:8000/api/signup', data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
            .then(res => {
                console.log(res.data);
                if(res.data.user) {
                    window.location.assign('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        const formErrors = { ...this.state.formErrors };

        switch (name) {
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
                break;
            case "password":
                formErrors.password = value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    }

    render() {
        const { email, password, formErrors } = this.state;
        return (
            <div>
                <Navbar />
                <div className="wrapper-signup">
                    <div className="form-wrapper">
                        <div className="signup-title">Sign Up</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    className={formErrors.email.length > 0 ? "error" : null}
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                {formErrors.email.length > 0 && (
                                    <span className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input
                                    className={formErrors.password.length > 0 ? "error" : null}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    minLength="6"
                                    required >
                                </input>
                                {formErrors.password.length > 0 && (
                                    <span className="errorMessage">{formErrors.password}</span>
                                )}
                            </div>
                            <div className="create-account">
                                <button type="submit" className="button">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;