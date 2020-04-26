import React, { Component } from 'react';
import Maps from './Maps';
import MessageUs from './MessageUs';

class Contact extends Component {
    render() {
        return (
            <div className="container">
                <div className="row contact" style={{height: '400px'}}>
                    <Maps/>
                    <div className="col-md-6">
                        <MessageUs />
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;