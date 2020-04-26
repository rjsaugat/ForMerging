import React from 'react';
import {HotelLogo} from '../ui/Logo';
import NewsLetter from './newsletter';
import Zoom from 'react-reveal/Zoom'

const Footer = () => {
    return (
        <footer className="footer-component">
            
            <div className="row">
                <div className="left col-md">
                    <Zoom>
                    <div className="footer-address">
                        <div className="">
                            <h3><i className="footer-icons fas fa-map-pin"></i>Hotel Address</h3>
                        </div>
                        <div>
                            <p><i className="footer-icons fas fa-map-marker-alt"></i>Emathe Marg
                                <span>Municipality Road Dhulikhel, 45200.</span>
                            </p>
                            <p className="phone"><i className="footer-icons fas fa-phone-volume"></i>Phone : <a class="footer-phone" href="tel:011491144">01 1491144</a></p>
                            <p><i className="footer-icons fas fa-envelope"></i>Email : <a class="footer-email" href="mailto:dhulikhelboutiquehotel@gmail.com">dhulikhelboutiquehotel@gmail.com</a></p>
                        </div>
                    </div>
                    </Zoom>
                </div>
                <div className="middle col-md">
                    <HotelLogo 
                        width="250px"
                        height="200px"
                        bckSize="180px"
                    />
                    <ul class="social-link">
                        <li className="facebook"><a href="https://www.facebook.com/dhulikhelboutique/"><i className="fab fa-facebook"></i></a></li>
                        <li className="instagram"><a href="https://www.instagram.com/dhulikhelboutiquehotel/"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
                <div className="right col-md">
                    <NewsLetter/>
                </div>
            </div>
            
            
        </footer>
    );
};

export default Footer;