import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Footer extends React.Component {
    render() {
        const scrollToTop = () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
        return (
            <div>
                <div className="semicircle" onClick={scrollToTop}>
                    <FontAwesomeIcon className="chevronup-icon" icon="chevron-up" />
                </div>
                <div className="last-nav-container-orange"></div>
                <div className="footer">
                    <div className="row">
                        <div className="col-sm-4">
                            <h1 className="col-h1">About Us</h1>
                            <div className="footer-options">
                                <p>something</p>
                                <p>something</p>
                                <p>something</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h1 className="col-h1">Partners</h1>
                            <div className="footer-options">
                                <p>something</p>
                                <p>something</p>
                                <p>something</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h1 className="col-h1">Social media</h1>
                            <div className="icons">
                                <div className="fab-facebook">
                                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                                </div>
                                <div className="fab-instagram">
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </div>
                                <div className="fab-twitter">
                                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                                </div>
                            </div>
                            <p className="copyright-text">© 2020 - Honey Rezashki - All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}