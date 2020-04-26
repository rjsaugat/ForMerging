import React from 'react';
import {Route, Redirect} from 'react-router-dom'

//destructured props.
//only capital letters component can be rendered so component as comp
const PrivateRoutes = ({
    user,
    component: Comp,
    ...rest
}) => {
    /* the props are from reacct router like history etc */
    return <Route {...rest} component={(props) => (
        user ?
            <Comp user={user}/>
        :<Redirect to="/sign_in"/>
    )}/>
};

export default PrivateRoutes;