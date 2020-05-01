import React from 'react';
import {HotelLogo} from '../ui/Logo'

const NotFound = () => {
    return (
        <div className="error_page">
            <div>OOPS!!</div>
            <div>Looks like you are on a wrong page</div>
            <HotelLogo 
                width="200px"
                height="150px"
                bckSize="100px"
                link={true}
                linkTo="/"
            />
            <p>Click on logo for home page</p>
        </div>
    );
};

export default NotFound;