import React from 'react';
import styles from '../styles/Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Footer extends React.Component {
    render() {
        const scrollToTop = () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
        return (
            <div className={styles.footercontainer}>
                <div className={styles.semicircle} onClick={scrollToTop}>
                    <FontAwesomeIcon className={styles.chevronupIcon} icon="chevron-up" />
                </div>
                <div className={styles.footer}>
                    <div className={styles.options}>
                        <div className={styles.title}>About us</div>
                        <div>test</div>
                        <div>test</div>
                        <div>test</div>
                    </div>
                    <div className={styles.options}>
                        <div className={styles.title}>About us</div>
                        <div>test</div>
                        <div>test</div>
                        <div>test</div>
                    </div>
                    <div className={styles.options}>
                        <div className={styles.title}>Social media</div>
                        <div className={styles.variants}>
                            <FontAwesomeIcon className={styles.icon} icon={['fab', 'facebook']} />
                            <FontAwesomeIcon className={styles.icon} icon={['fab', 'instagram']} />
                            <FontAwesomeIcon className={styles.icon} icon={['fab', 'twitter']} />
                        </div>
                        <div>test</div>
                        <small>© 2020 - Honey Rezashki - All Rights Reserved.</small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;