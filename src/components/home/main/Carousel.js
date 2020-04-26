import React from 'react';
import Slider from 'react-slick';
import slide_one from '../../../resources/images/first.jpg'
import slide_two from '../../../resources/images/second.jpg'
import slide_three from '../../../resources/images/third.JPG'

const Carousel = () => {

    const settings = { 
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 700
    }

    return (
        <div className="carousel_wrapper"
            style={{
                height:`${window.innerHeight}px`,
                overflow: 'hidden',
                            }}
        >
            <Slider {...settings} >
                <div>
                    <div 
                        className="carousel_image"
                        style={{
                            background: `url(${slide_three})`,
                            height:`${window.innerHeight}px`,
                        }}
                    ></div>
                </div>
                <div>
                    <div 
                        className="carousel_image"
                        style={{
                            background: `url(${slide_two}) center no-repeat`,
                            backgroundPosition: "center center",
                            height:`${window.innerHeight}px`,
                        }}
                    ></div>
                </div>
                <div>
                    <div 
                        className="carousel_image"
                        style={{
                            background: `url(${slide_one})`,
                            height:`${window.innerHeight}px`,
                        }}
                    ></div>
                </div>

            </Slider>
        </div>
    );
};

export default Carousel;