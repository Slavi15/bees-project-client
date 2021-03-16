import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles/SignUp.module.scss';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async(e) => {
        e.preventDefault();

        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');

        emailError.textContent = '';
        passwordError.textContent = '';

        const data = {
            email: this.state.email,
            password: this.state.password
        };

        await axios.request({
            method: 'POST',
            url: 'https://beesproject-api.herokuapp.com/api/auth/signup',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
            withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            if(res.data.user) {
                window.location.assign('/');
            }
        })
        .catch(err => {
            if(err.response.data.errors) {
                emailError.textContent = err.response.data.errors.email;
                passwordError.textContent = err.response.data.errors.password;
            }
            console.log(err);
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        
        this.setState({ [name]: value });
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <div className={styles.wrapper}>
                    <div className={styles.formwrapper}>
                        <div className={styles.title}>Sign Up</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className={styles.email}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                <div id="email-error" className={styles.error}></div>
                            </div>
                            <div className={styles.password}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                <div id="password-error" className={styles.error}></div>
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