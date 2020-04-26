import React from 'react';
import {Link} from  'react-router-dom';

import hotelLogo from '../../resources/images/dhulikhel-boutique-logo.png';

export const HotelLogo = (props) => {
    
    const template = <div
        className="img_cover"
        style={{
            width: props.width,
            height: props.height,
            background: `url(${hotelLogo}) no-repeat`,
            backgroundSize: props.bckSize,
            backgroundPosition: 'center'
        }}
    ></div>

    if(props.link){
        return(
            <Link to={props.linkTo} className="link_logo" style={{outline:'none'}}>
                {template}
            </Link>
        )
    }else{
        return template;
    }
}