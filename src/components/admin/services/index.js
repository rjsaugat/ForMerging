import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';
import { Link } from 'react-router-dom';
import { firebaseServices } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import CircularProgress from '@material-ui/core/CircularProgress'

class AdminServices extends Component {
    state= {
        isLoading: true,
        services: []
    }

    componentDidMount(){
        firebaseServices.once('value').then((snapshot) => {
            const services = firebaseLooper(snapshot)
            this.setState({
                isLoading: false,
                services
            })
        })
    }

    render() {
        return (
            <AdminLayout>
                <div className="container">
                    <div className="row admin_services">
                        {this.state.isLoading ? 
                            <CircularProgress />
                            :null
                        }
                        {
                            !this.state.isLoading ?
                                this.state.services.length ?
                                    <p>Coming soon</p>
                                :<p>Nothing on services</p>
                            :null
                        }
                        <Link to="/admin_services/add_service">
                            <button className="btn btn-primary">Add A Service</button>
                        </Link>
                        
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminServices;