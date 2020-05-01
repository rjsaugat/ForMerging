import React, { Component } from 'react';
import Slider from 'react-slick';
import Spin from 'react-reveal/Spin';

class Reviews extends Component {

    state= {
        fb_reviews_object_array: [
            {
                src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fparashd2%2Fposts%2F2268255999878713&width=500',
                width: "500",
                height: "208"
            },
            {
                src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsanjeev.giri1%2Fposts%2F10214038017397978%3A0&width=500',
                width: '500',
                height: '336'
            },
            {
                src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fratnaman.dangol%2Fposts%2F2012669245437715&width=auto',
                width: '500',
                height: '278'
            },
            {
                src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsujan.byanju.9%2Fposts%2F1702176123158614%3A0&width=500',
                width: '500',
                height: '336'
            },
            {
                src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fcarrie.lai.71%2Fposts%2F10156581963514271%3A0&width=500',
                width: '500',
                height: '355'
            },
            {
                src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsuman.lama.5895834%2Fposts%2F2441104222780933%3A0&width=500',
                width: '500',
                height: '355'
            },
            {
                src: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3D1954668921515600%26id%3D100009175331967%26substory_index%3D0&width=500',
                width: '500',
                height: '374'
            }
        ]
    }


    render() {
        const settings = { 
            dots: false,
            infinite: true,
            autoplay: true,
            speed: 500,
            arrows: true,
            
        }

        
        return (
            <section id="review">
                <div className="container">
                    <Spin>
                        <b className="quote-right"><i className="fa fa-quote-right"></i></b>
                    </Spin>
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="review-part-head">See what our guests say</h2>
                        </div>
                        <div id="myCarousel" class="carousel" style={{position:'relative', height: '400px', width:'100%'}}>
                            <div className="reviews-slider" style={{overflow: 'hidden'}}>
                                <Slider {...settings} >
                                    {this.state.fb_reviews_object_array.map((item, i) => (
                                        <div key={i} className="item">
                                            <iframe 
                                                title={item.key}
                                                src={item.src} 
                                                width={item.width}
                                                height={item.height}
                                                style={{border:'none',overflow:'hidden'}} 
                                                scrolling="no" 
                                                frameBorder="0" 
                                                /* allowTransparency="true"  */
                                            >
                                            </iframe> 
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Reviews;