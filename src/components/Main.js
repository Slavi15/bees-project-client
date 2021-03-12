import React from 'react';
import styles from '../styles/Main.module.scss';
import Footer from './Footer.js';
import img from '../images/sunflower-3554567_1920.png';
import img2 from '../images/bee-3360682_1920.png';
import img3 from '../images/forget-me-not-257176_1920.png';

class Main extends React.Component {
    render() {
        return (
            <div>
                <img className={styles.mainimg} id="image" src={img} alt="main" />
                <div className={styles.uppertext}>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
                    Obcaecati a libero nesciunt deleniti unde asperiores sed facilis saepe nulla eos cumque quaerat <br /> 
                    maxime accusantium repellendus eius repellat voluptas veniam, <br />
                    explicabo repudiandae ullam iure amet! Error harum fugiat commodi temporibus sequi.
                    </p>
                    <img src={img2} alt="test" />
                </div>
                <div className={styles.downtext}>
                    <img src={img3} alt="test" />
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
                    Obcaecati a libero nesciunt deleniti unde asperiores sed facilis saepe nulla eos cumque quaerat <br /> 
                    maxime accusantium repellendus eius repellat voluptas veniam, <br />
                    explicabo repudiandae ullam iure amet! Error harum fugiat commodi temporibus sequi.
                    </p>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Main;