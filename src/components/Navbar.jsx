import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Navbar extends React.Component {
    render() {
        const navSlide = () => {
            const burger = document.querySelector('.burger');
            const nav = document.querySelector('.text-below-nav');
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        }
        return (
            <div>
                <header>
                    <div className="above-nav">
                        <div className="lang-change">
                            EN / BG
                        </div>
                        <div className="above-nav-text">Honey Rezashki</div>
                        <div>
                            <Link to="/cart"><FontAwesomeIcon className="shopping-cart" icon="shopping-cart" /></Link>
                        </div>
                    </div>
                    <div className="below-nav">
                        <nav id="navbar">
                            <div className="logo1"><Link to="/"><picture><img className="logo1-img" src={require('../images/bee-2389834_1280.png')} alt="bee" /></picture></Link></div>
                            <div className="text-below-nav">
                                <Link to="/test"><div className="nav-links">Home</div></Link>
                                <Link to="/test"><div className="nav-links">About us</div></Link>
                                <div className="logo"><Link to="/"><picture><img className="logo-img" src={require('../images/bee-2389834_1280.png')} alt="bee" /></picture></Link></div>
                                <Link to="/about"><div className="nav-links">About us</div></Link>
                                <Link to="/store"><div className="nav-links">Store</div></Link>
                            </div>
                            <div className="burger" onClick={navSlide}>
                                <div className="line1"></div>
                                <div className="line2"></div>
                                <div className="line3"></div>
                            </div>
                        </nav>
                    </div>
                    <div className="last-nav-container"></div>
                </header>
            </div>
        )
    }
};