import React from 'react';
import Navbar from './Navbar.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx'

export default class MainPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Main />
                <Footer />
            </div>
        )
    }
}