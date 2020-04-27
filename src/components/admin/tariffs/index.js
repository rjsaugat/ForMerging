import React, { Component } from 'react';
import FormField from '../../ui/formFields';
import {withRouter} from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout'
import { firebase, firebaseDB, firebaseTariffs } from '../../../firebase';
import { validate } from "../../ui/misc";

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

    updateFields(tariff, tariffId, type){
        const newFormData = {...this.state.formdata}
        for(let key in newFormData){
            newFormData[key].value = tariff[key];
            newFormData[key].valid = true;
        }
        this.setState({
            tariffId,
            formType: type,
            formdata: newFormData
        })
    }

    componentDidMount(){
        const tariffId = this.props.match.params.id;
        if(tariffId){
            firebaseDB.ref(`tariffs/${tariffId}`).once('value')
            .then((snapshot) => {
                const tariff = snapshot.val();
                this.updateFields(tariff, tariffId, 'Edit Tariff')
            })
        }else{
            this.setState({
                formType: 'Add Tariff'
            })
        }
    }

    updateForm(element, content=""){
        //not good to mutate the state so copy the state and work on this
        const newFormData = { ...this.state.formdata};
        const newElement = {...newFormData[element.id]}
        if(content === ''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }
        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]
        newFormData[element.id] = newElement;
        this.setState({
            formError: false,
            formdata: newFormData
        })
    }

    submitForm(event){
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            //as formisValid is changing for each element
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            if(this.state.formType === 'Edit Tariff'){
                firebaseDB.ref(`tariffs/${this.state.tariffId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Updated Successfully')
                }).catch((e)=>{
                    this.setState({formError: true})
                    console.log('erroe', e)
                })
            }else{
                firebaseTariffs.push(dataToSubmit).then(()=>{
                    this.successForm('Added Successfully');
                }).catch((error)=>{
                    console.log('Error occured', error);
                    this.setState({formError: true})
                })
            }
        }else{
            this.setState({
                formError: true
            })
        }
    }

    successForm = (message) => {
        this.setState({
            formSuccess: message
        })
        setTimeout(()=>{
            this.setState({formSuccess: ''})
        }, 2000)
    }

    render() {
        console.log(this.state)
        return (
            <AdminLayout>
                <div className="container tariff-container">
                    <div className="row">
                        <div className="tariff-form">
                            <h2>
                                {this.state.formType}
                            </h2>
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