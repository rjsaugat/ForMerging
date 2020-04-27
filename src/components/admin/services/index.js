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

    addServices(service, i){
        return (
            <div className="col-md-4 service-card" key={i}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" src={service.url} alt={service.name}/>
                    <div className="card-body">
                        <p className="card-text">{service.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <Link to={`admin_services/add_service/${service.id}`}>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                </Link>
                                
                            </div>
                            <small className="text-muted">{service.name}</small>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

    render() {
        console.log(this.state)
        return (
            <AdminLayout>
                <div className="container">
                    <div className="row admin_service_container">
                        {this.state.isLoading ? 
                            <CircularProgress />
                            :null
                        }
                        {
                            !this.state.isLoading ?
                                this.state.services.length ?
                                    this.state.services.map((service, i) => (
                                        this.addServices(service,i)
                                    ))
                                :<p>Nothing on services</p>
                            :null
                        }
                        <div className="add_service">
                            <Link to="/admin_services/add_service">
                                <button className="btn btn-primary">Add A Service</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default AdminServices;