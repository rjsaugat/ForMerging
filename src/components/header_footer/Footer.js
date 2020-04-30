import React from 'react';
import {HotelLogo} from '../ui/Logo';
import NewsLetter from './newsletter';
import Zoom from 'react-reveal/Zoom';
import Trip from '../../resources/images/trip.png';
import Booking from '../../resources/images/booking.png';
import Expedia from '../../resources/images/expedia.png';
import FACEBOOK from '../../resources/images/facebook.png';
import INSTAGRAM from '../../resources/images/instagram.png';



const Footer = () => {
    return (
        <footer className="footer-component">
            
            <div className="row">
                <div className="left col-md">
                    <Zoom>
                    <div className="footer-address">
                        <div className="rightfoot">
                            <h3>Hotel Address</h3>
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
                        height="120px"
                        bckSize="170px"
                    />
                    <NewsLetter/>
                    
                </div>
                <div className="right col-md">
                    <div className="connect-div">
                        <p className="connectwithus">Connect With US:</p>
                        <div className="row connect-row">
                           
                                <div className="booking-sites">
                                    <ul className="booking-links">
                                        <li className="booking">
                                            <a href="https://www.booking.com/hotel/np/dhulikhel-boutique-dhulikhel12.html">
                                                <img className="footer-img" src={Booking} alt="booking.png"></img>
                                            </a>
                                        </li>
                                        <li className="tripadvisor">
                                            <a href="https://www.tripadvisor.com/Hotel_Review-g317113-d13536950-Reviews-Dhulikhel_Boutique_Hotel-Dhulikhel_Bagmati_Zone_Central_Region.html">
                                                <img className="footer-img" src={Trip} alt="tripadvisor.png"></img>
                                            </a>
                                        </li>
                                        <li className="expedia">
                                            <a href="https://www.tripadvisor.com/Hotel_Review-g317113-d13536950-Reviews-Dhulikhel_Boutique_Hotel-Dhulikhel_Bagmati_Zone_Central_Region.html">
                                                <img className="footer-img" src={Expedia} alt="expedia.png"></img>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            
                            
                                <ul class="social-link">
                                <li className="facebook">
                                    <a href="https://www.facebook.com/dhulikhelboutique/">
                                    <img className="facebook-img" src={FACEBOOK} alt="facebook.png"></img>
                                    </a>
                                </li>
                                <li className="instagram">
                                    <a href="https://www.instagram.com/dhulikhelboutiquehotel/">
                                    <img className="facebook-img" src={INSTAGRAM} alt="instagram.png"></img>
                                     </a>
                                </li>
                                </ul>
                                
                            
                        </div>

                    </div>
                    
                </div>
            </div>
            <div class="sub-footer">
             <div class="container">   
                     <p> © 2020  Dhulikhel Boutique Hotel - All Rights Reserved </p>
             </div>
        </div>
        </footer>
       
         
    

    );
};

export default Footer;