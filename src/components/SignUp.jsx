import React from 'react';
import Navbar from './Navbar.jsx';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <Navbar />
                <div className="signup-title">Sign Up</div>
                <form>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            required >
                        </input>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            required >
                        </input>
                    </div>
                    <div className="createAccount">
                        <button type="submit" className="button">Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;