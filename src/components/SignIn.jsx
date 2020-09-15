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

        await axios.post('http://localhost:8000/api/signin', data, { headers: { 'Content-Type': 'application/json' }, withCredentials: true })
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
                                <div id="email-error"></div>
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
                                <div id="password-error"></div>
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