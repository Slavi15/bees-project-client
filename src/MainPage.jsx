import React from 'react';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx'

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