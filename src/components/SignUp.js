import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/SignUp.module.scss';

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
                <div className={styles.wrapper}>
                    <div className={styles.formwrapper}>
                        <div className={styles.title}>Sign Up</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className={styles.email}>
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
                                    <span className={styles.errorMessage}>{formErrors.email}</span>
                                )}
                            </div>
                            <div className={styles.password}>
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
                                    <span className={styles.errorMessage}>{formErrors.password}</span>
                                )}
                            </div>
                            <div className={styles.signupButton}>
                                <button type="submit" className={styles.button}>Sign Up</button>
                            </div>
                            <div className={styles.lines}>
                              <div className={styles.line}></div>
                              <div className={styles.or}>or</div>
                              <div className={styles.line}></div>
                            </div>
                            <div className={styles.signinBtn}>
                                <Link to="/signin" className={styles.a}><button className={styles.signin}>Sign In</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;