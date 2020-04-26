import React from 'react';
import Carousel from './Carousel';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button' 
import {Bounce} from 'react-reveal'; 

const Main = () => {
    return (
        <div style={{position:"relative"}}>
            <Carousel/>
            {/* <p className="main_text_subtitle">We are a hotel that loves crafting beautiful foods and environment for you to relax.</p> */}
            

            <div className="main-container">
                <Bounce bottom>
                    <div className="main_text">
                        <div className="wrapper">
                            <h1>
                                <p className="welcome">Welcome</p>
                                <p className="to">To</p>
                                <p className="DB">DhuliKhel Boutique</p>
                                </h1>
                        </div>
                        
                    </div>
                    <p className="main_text_subtitle">We are a hotel that loves crafting beautiful foods and environment for you to relax.</p>
                </Bounce>                
                <Link className="book_now_btn" to="/book_now">
                    <Button variant="contained" size="large">Book Now</Button>
                </Link>
            </div>
            
        </div>
    );
};

export default Main;