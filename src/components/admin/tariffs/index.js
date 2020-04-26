import React, { Component } from 'react';
import FormField from '../../ui/formFields';
import {withRouter} from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout'

class AdminTariff extends Component {

    state = {
        tariffId : '',
        formType: '',
        formError: false,
        formSuccess: '',
        formdata: {
            persons:{
                element:'input',
                value:'',
                config:{
                    name:'persons_input',
                    type:'text',
                    label: 'No of person',
                    className: 'form-control',
                    placeholder: 'eg. 2p X'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            ep:{
                element:'input',
                value:'',
                config:{
                    name:'ep_input',
                    type:'text',
                    label: 'Price for EP',
                    className: 'form-control',
                    placeholder: 'eg. Rs 4000'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            bb:{
                element:'input',
                value:'',
                config:{
                    name:'bb_input',
                    type:'text',
                    label: 'Price for B&B',
                    className: 'form-control',
                    placeholder: 'eg. Rs 4000'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            map:{
                element:'input',
                value:'',
                config:{
                    name:'map_input',
                    type:'text',
                    label: 'Price for MAP',
                    className: 'form-control',
                    placeholder: 'eg. Rs 4000'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
        }
    }

    componentDidMount(){
        const tariffId = this.props.match.params.id;
        if(tariffId){
            this.setState({
                formType: 'Edit Tariff',
                tariffId: tariffId
            })
        }else{
            this.setState({
                formType: 'Add Tariff'
            })
        }
    }

    submitForm(){
        console.log('error no submit fuctionality')
    }

    render() {
        return (
            <AdminLayout>
                <div className="container tariff-container">
                    <div className="row">
                        <div className="tariff-form">
                            <form onSubmit={(e) => this.submitForm()}>
                                    <FormField 
                                        id={'persons'}
                                        formData = {this.state.formdata.persons}
                                        change={(element)=>this.updateForm(element)}
                                    />
                                    <FormField 
                                        id={'ep'}
                                        formData = {this.state.formdata.ep}
                                        change={(element)=>this.updateForm(element)}
                                    />
                                    <FormField 
                                        id={'bb'}
                                        formData = {this.state.formdata.bb}
                                        change={(element)=>this.updateForm(element)}
                                    />
                                    <FormField 
                                        id={'map'}
                                        formData = {this.state.formdata.map}
                                        change={(element)=>this.updateForm(element)}
                                    />

                                    <div className="success_label">{this.state.formSuccess}</div>
                                    {this.state.formError ? 
                                    <div className="error_label">
                                        Something is wrong
                                    </div>
                                    :null}
                                    <div className="admin_submit">
                                        <button className="btn btn-secondary" onClick={(event)=>this.submitForm(event)}>
                                            {this.state.formType}
                                        </button>
                                    </div>
                            </form>
                        </div> 
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withRouter(AdminTariff);