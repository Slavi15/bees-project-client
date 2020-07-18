import React from 'react';
import Navbar from './Navbar.jsx';

export default class PageNotFound extends React.Component {
    render(){
        return(
            <div>
                <Navbar />
                <h1 className="pagenotfound">404: Page Not Found!</h1>
            </div>
        )
    }
}