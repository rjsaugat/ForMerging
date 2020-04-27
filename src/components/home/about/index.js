import React, { Component } from 'react';
import aboutImage from '../../../resources/images/exterior4.jpg';
import Flip from 'react-reveal/Flip';
import Slide from 'react-reveal/Slide';
import { firebaseAboutContent } from '../../../firebase';

class About extends Component {

    state = {
        content: {
            subtitle: "You don't get a second chance to make first impression.",
            paragraph_one: "Located in a vibrant, peaceful and a beautiful place, Dhulikhel Boutique hotel is trying to provide its service to the people in a friendly way. You can also enjoy the typical Nepali architecture as windows and exteriors are well carved from the experienced local architects to give you the feel of connecting to the Nepali culture. Its designed to reflect its traditional cultural setting along with the Nepali culture famous for its hospitality. ",
            paragraph_two: "Kathmandu yet not so near that you will be disturbed by the city life. we provide you with the service you deserve. you deserve. ",
            paragraph_three: "Nepalese historical architecture and culture and a modern lifestyle combined for a perfect stay and the best sleep you can get away from home. "
        }
    }

    componentDidMount(){
        firebaseAboutContent.once('value').then((snapshot) => {
            const contentObject = snapshot.val();
            this.setState({
                content: {
                    subtitle: contentObject.subtitle,
                    paragraph_one: contentObject.pg_one,
                    paragraph_two: contentObject.pg_two,
                    paragraph_three: contentObject.pg_three
                }
            })
        }).catch( e => {
            console.log(e)
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="container about-container">
                <Flip>
                    <h2 className="about-heading">About Dhulikhel Boutique</h2>   
                </Flip>
                
                <hr className="abt-line"></hr>
                <h6 style={{textAlign: 'center', marginBottom:"40px"}}>{this.state.content.subtitle}</h6>
                <div className="row">
                    <Slide left>
                    <div className="col-lg-6">
                        <p style={{
                            lineHeight:'24px',
                            fontFamily: 'lato',
                            fontSize: '14px',
                            fontWeight: 'normal',
            
                        }}
                        >
                            {this.state.content.paragraph_one}
                            <br/>
                            {this.state.content.paragraph_two}
                            <br/>
                            {this.state.content.paragraph_three}
                        </p>
                    </div>
                    </Slide>
                    <Slide right>
                    <div className="col-lg-6" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <img src={aboutImage} alt="about" style={{borderRadius: '5px'}}></img>
                    </div>
                    </Slide>
                </div>
                
            </div>
        );
    }
}

export default About;