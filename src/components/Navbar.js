import React from 'react';
import styles from '../styles/Navbar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Cookies = require('js-cookie');

class Navbar extends React.Component {
    render() {
        const navSlide = () => {
            const nav = document.querySelector('#links');
            nav.classList.toggle('nav-active');
            //console.log(nav);
        }

        //console.log(Cookies.get('jwt'));

        const renderButtons = () => {
            if(Cookies.get('jwt')) {
                return (
                    <div className={styles.innercontainer}>
                        <a className={styles.a} href="http://localhost:8000/api/logout"><div className={styles.logout}>Log Out</div></a>
                        <Link className={styles.a} to="/cart"><FontAwesomeIcon className={styles.shopicon} icon="shopping-cart" /></Link>
                    </div>
                )
            } else {
                return (
                    <div className={styles.innercontainer}>
                        <Link className={styles.a} to="/signin"><div className={styles.signin}>Sign In</div></Link>
                        <Link className={styles.a} to="/signup"><div className={styles.signup}>Sign Up</div></Link>
                    </div>
                )
            }
        }

        return (
            <div>
                <div className={styles.nav}>
                    <Link className={styles.a} to='/'><div className={styles.title}>bees name</div></Link>
                    <div className={styles.links} id="links">
                        <Link className={styles.a} to="/"><div className={styles.link}>Home</div></Link>
                        <Link className={styles.a} to="/test"><div className={styles.link}>About us</div></Link>
                        <Link className={styles.a} to="/about"><div className={styles.link}>About us</div></Link>
                        <Link className={styles.a} to="/store"><div className={styles.link}>Store</div></Link>
                    </div>
                    <div className={styles.righticons}>
                        {renderButtons()}
                        <FontAwesomeIcon onClick={navSlide} className={styles.icon} icon="bars" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;