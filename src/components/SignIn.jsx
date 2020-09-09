import React from 'react';
import Navbar from './Navbar.jsx';
import axios from 'axios';

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

    handleSubmit = (e) => {
        e.preventDefault();

        const emailError = document.querySelector('.email-error');
        const passwordError = document.querySelector('.password-error');

        emailError.textContent = '';
        passwordError.textContent = '';

        const data = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post('http://localhost:8000/api/signin', data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
        .then(res => {
            console.log(res.data);
            if (res.data.errors) {
                emailError.textContent = res.data.errors.email;
                passwordError.textContent = res.data.errors.password;
            }
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

        this.setState({ [name]: value });
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <Navbar />
                <div className="wrapper-signin">
                    <div className="form-wrapper">
                        <div className="signin-title">Sign In</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required >
                                </input>
                                <div className="email-error"></div>
                            </div>
                            <div className="password">
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
                                <div className="password-error"></div>
                            </div>
                            <div className="create-account">
                                <button type="submit" className="button">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;