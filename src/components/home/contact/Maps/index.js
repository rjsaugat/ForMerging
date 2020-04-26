import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./Marker";



class Maps extends Component {

    static defaultProps = {
        center: {
            lat: 27.615388,
            lng: 85.555673
        },
        zoom: 11
    }

    render() {
        return (
            <div className="col-md-6">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBiesek-kucdesvQX8hALbeDP8p_KHThUw' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    >
                    {/* <AnyReactComponent
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                        text="Dhulikhel Boutique"
                    /> */}
                    <Marker
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                        name="Dhulikhel Boutique"
                        color= "blue"
                    />
                    
                </GoogleMapReact>
            </div>
        );
    }
}

export default Maps;
