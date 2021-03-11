import React from 'react';
import axios from 'axios';
import styles from '../styles/SignIn.module.scss';

class SignIn extends React.Component {
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

    handleSubmit = async (e) => {
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
            url: 'http://localhost:8000/api/signin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
            withCredentials: true
        })
        .then(res => {
            console.log(res.data);
            if(res.data) {
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
                        <div className={styles.title}>Sign In</div>
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
                                <div id="email-error"></div>
                            </div>
                            <div className={styles.password}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    minLength="6"
                                    required >
                                </input>
                                <div id="password-error"></div>
                            </div>
                            <div className={styles.signinButton}>
                                <button type="submit" className={styles.button}>Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;