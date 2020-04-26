import React, { Component } from 'react';
/* import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import {HotelLogo} from '../ui/Logo'; */

import Navigation from '../header_footer/navigation';

//to make a different layout for mobile menu we can lookinto this site https://goshakkk.name/different-mobile-desktop-tablet-layouts-react/

class Header extends Component {

    state = {
        headerTransparent : true
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll)
    }

    //if not needed to make header transparent
    /* componentWillUnmount(){
        window.removeEventListener('scroll');
    } */

    handleScroll = () => {
        if(window.scrollY > 0){
            this.setState({
                headerTransparent: false
            })
        }else{
            this.setState({
                headerTransparent: true
            })
        }
    }

    render() {
        return (
            <div>
                {/* <AppBar 
                    position="fixed"
                    style={{
                        backgroundColor: this.state.headerTransparent ? "transparent" : "#ffb949",
                        boxShadow:"none",
                        padding: '10px 0',
                        borderColor: '2px solid #00285e'
                    }}
                >
                    <ToolBar styles={{display: 'flex'}}>
                        <div style={{flexGrow:1}}>
                            <div className="logo">
                                <HotelLogo
                                    link={true}
                                    linkTo="/"
                                    width ="100px"
                                    height="50px"
                                    bckSize= "100px"
                                />
                            </div>
                        </div>
                        <Link className="nav-buttons" to="/accomodation">
                            <Button variant="outlined" color="#3da066">Accomodation</Button>
                        </Link>
                        <Link className="nav-buttons" to="/services">
                            <Button variant="outlined" color="#3da066">Our Services</Button>
                        </Link>
                        <Link className="nav-buttons" to="/gallery">
                            <Button variant="outlined" color="#3da066">Gallery</Button>
                        </Link>
                    </ToolBar>
                </AppBar> */}
                <Navigation />
            </div>
        );
    }
}

export default Header;