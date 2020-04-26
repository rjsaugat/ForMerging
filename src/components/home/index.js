import React, { Component } from 'react';
import Main from './main';
import Contact from './contact';
import About from "./about";
import Reviews from "./reviews";

class Home extends Component {
    render() {
        return (
            
            <div className="hey">
                {/* <React.Fragment> */}
                <Main />
                <About/>
                <Reviews />
                <h2 className="contact-header">Let's Connect</h2>
                <hr className="abt-line"></hr>
                <Contact />
                {/* </React.Fragment>  */} 
            </div>
            
        );
    }
}

export default Home;