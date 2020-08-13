import React from 'react';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <img className="main_img" id="image" src={require('../images/sunflower-3554567_1920.png')} alt="main" />
                <div className="last-nav-container"></div>
                <div className="curved-div">
                    <div className="row">
                        <div className="col-sm-4">
                            <h1>The best honey</h1>
                        </div>
                        <div className="col-sm-4">
                            <h1>The best honey</h1>
                        </div>
                        <div className="col-sm-4">
                            <h1>The best honey</h1>
                        </div>
                    </div>
                </div>
                <div className="main-text-up">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
                    Obcaecati a libero nesciunt deleniti unde asperiores sed facilis saepe nulla eos cumque quaerat <br /> 
                    maxime accusantium repellendus eius repellat voluptas veniam, <br />
                    explicabo repudiandae ullam iure amet! Error harum fugiat commodi temporibus sequi.
                    </p>
                    <img src={require('../images/bee-3360682_1920.png')} alt="test" />
                </div>
                <div className="main-text-down">
                    <img src={require('../images/forget-me-not-257176_1920.png')} alt="test" />
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. <br />
                    Obcaecati a libero nesciunt deleniti unde asperiores sed facilis saepe nulla eos cumque quaerat <br /> 
                    maxime accusantium repellendus eius repellat voluptas veniam, <br />
                    explicabo repudiandae ullam iure amet! Error harum fugiat commodi temporibus sequi.
                    </p>
                </div>
            </div>
        )
    }
}