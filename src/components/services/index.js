import React, { Component } from 'react';
import { firebaseServices, firebase } from '../../firebase';
import {firebaseLooper} from '../ui/misc';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Promise} from 'core-js';


class Services extends Component {

    state = {
        isLoading: true,
        services: []
    }

    componentDidMount(){
        firebaseServices.once('value').then((snapshot) => {
            const services = firebaseLooper(snapshot);
            let promises = [];

            for (let key in services){
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref(`services`)
                            .child(services[key].image).getDownloadURL()
                            .then((url) => {
                                services[key].url = url;
                                resolve();
                            })
                    })
                )
            }

            Promise.all(promises).then(()=>{
                this.setState({
                    isLoading: false,
                    services
                })
            })
            
        })
        
    }

    render() {
        console.log(this.state)
        return (
            <div className="services-container">
                <div className="container">
                    <div className="row services-row">
                        <h2 className="second-heading">Our Services</h2>
                        <hr class="service-line"/>
                        <h5 className="third-heading">"We offer exceptional services and make sure you will leave the hotel in your best mood and wanting more of the same"</h5>
                        {
                            !this.state.isLoading ? 
                            this.state.services.map((service, i) => {
                                if(i % 2 === 0){
                                    return (
                                        <div className="row service-single-item" key={i}>
                                            <div className="white-bg">
                                                <div className="item">
                                                    <figure className="col-lg-5 col-sm-4">
                                                        <img  src={service.url} alt={service.name}/>
                                                    </figure>
                                                    <div className="featured-box-col2 delay-04s">
                                                        <h3 className="carousel-h3">{service.name}</h3>
                                                        <p>{service.description} </p>
                                                    </div>    
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div className="row service-single-item" key={i}>
                                            <div className="white-bg">
                                                <div className="item">
                                                    <div className="featured-box-col2 delay-04s">
                                                        <h3 className="carousel-h3">{service.name}</h3>
                                                        <p>{service.description} </p>
                                                    </div>
                                                    <figure className="col-lg-5 col-sm-4">
                                                        <img  src={service.url} alt={service.name}/>
                                                    </figure>    
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                })
                            :null
                        }
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Services;