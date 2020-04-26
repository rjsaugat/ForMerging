import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBarCollapse from "./AppBarCollapse";
import {HotelLogo} from '../../ui/Logo';


class Navigation extends Component {

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
            <AppBar 
                position="fixed"
                style={{
                    backgroundColor: this.state.headerTransparent ? "transparent" : "#f7f7ff",
                    boxShadow:"none",
                    padding: '10px 0',
                    borderColor: '2px solid #70798c'
                }}
            >
                <Toolbar style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <Typography
                        variant="title"
                        color="inherit"
                        className=""
                    >
                        <div style={{flexGrow:1}}>
                            <div className="logo">
                                <HotelLogo
                                    link={true}
                                    linkTo="/"
                                    width ="100px"
                                    height="100px" 
                                    bckSize= "100px"
                                />
                            </div>
                        </div>
                    </Typography>
                    <AppBarCollapse />
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navigation;