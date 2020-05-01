import React from 'react';
import { MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import {Link} from 'react-router-dom';


const styles = theme => ({
    buttonBar:{
        [theme.breakpoints.down("xs")]:{
            display:"none"
        }
    }
})

const AppBarCollapse = (props) => {
    return (
        <div className="app-bar-collapse">
            <ButtonAppBarCollapse>
                <MenuItem>
                    <Link className="nav-buttons" to="/accomodation">
                        Accomodation
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link className="nav-buttons" to="/services">
                        Services
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link className="nav-buttons" to="/gallery">
                        Gallery
                    </Link>
                </MenuItem>
            </ButtonAppBarCollapse>
            <div className={props.classes.buttonBar} id="appbar-collapse">
                <Link className="nav-buttons" to="/accomodation">
                    <button className="btn nav-btn">Accomodation</button>
                </Link>
                <Link className="nav-buttons" to="/services">
                    <button className="btn nav-btn">Our Services</button>
                </Link>
                <Link className="nav-buttons" to="/gallery">
                    <button className="btn nav-btn">Gallery</button>
                </Link>
            </div>
        </div>
    );
};

export default withStyles(styles)(AppBarCollapse);