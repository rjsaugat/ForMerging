import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FormField from "../../ui/formFields";
import {validate} from '../../ui/misc';
import { withRouter } from 'react-router-dom'

import {firebaseServices, firebaseDB, firebase } from '../../../firebase';
import Fileuploader from '../../ui/fileUploader';

class AddEditServices extends Component {

    state = {
        serviceId : '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata: {
            name:{
                element:'input',
                value:'',
                config:{
                    name:'name_input',
                    type:'text',
                    label: 'Name of Service',
                    class: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            description:{
                element:'textarea',
                value:'',
                config:{
                    name:'name_input',
                    type:'textarea',
                    label: 'Description of Service',
                    class: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            image: {
                element: 'image',
                value: '',
                validation:{
                    required: true
                },
                valid:true
            }
        }
    }

    updateFields = (service, serviceId, type, defaultImg) => {
        const newFormData = {...this.state.formdata}
        /* console.log(room)
        console.log(newFormData) */
        for(let key in newFormData){
            newFormData[key].value = service[key];
            newFormData[key].valid = true;
        }
        //as key and value are same
        this.setState({
            serviceId,
            defaultImg,
            formType: type,
            formdata: newFormData
        })
    }

    componentDidMount(){
        const serviceId = this.props.match.params.id;
        if(!serviceId){
            this.setState({
                formType : 'Add Service'
            })
        }else{
            firebaseDB.ref(`services/${serviceId}`).once('value').then((snapshot) => {
                const service = snapshot.val();
                console.log(service)
                let promise = new Promise((resolve, reject) => {
                    firebase.storage().ref('services')
                    .child(service.image).getDownloadURL()
                    .then((url) => {
                        service.url = url;
                        resolve();
                    }).catch( error => {
                        reject(error);
                    })
                })
                promise.then(()=>{
                    this.updateFields(service, serviceId, 'Edit Service', service.url)
                })
            }).catch( e => {
                console.log(e)
            })
        }
    }

    resetImage(){
        const newFormData = {...this.state.formdata}
        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        this.setState({
            defaultImg: '',
            formdata: newFormData
        })
    }

    storeFilename(filename){
        this.updateForm({id:'image'}, filename)
    }

    updateForm(element, content=""){
        //not good to mutate the state so copy the state and work on this
        const newFormData = { ...this.state.formdata};
        //get the email state
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
        console.log(newFormData)
        
        
        this.setState({
            formError: false,
            formdata: newFormData
        })
        //console.log(this.state.formdata.email.value)
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
            if(this.state.formType === 'Edit Service'){
                firebaseDB.ref(`services/${this.state.serviceId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Updated Successfully')
                }).catch((e)=>{
                    this.setState({formError: true})
                    console.log('erroe', e)
                })
            }else{
                firebaseServices.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_services')
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
        return (
            <AdminLayout>
                <div className="container">
                    <div className="row admin_services">
                        <h2>
                            {this.state.formType}
                        </h2>
                        <div className="add_service_form">
                            <form onSubmit={(event) => this.submitForm(event)}>

                            <Fileuploader 
                                dir="services"
                                tag={"Services image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName = {this.state.formdata.image.value}
                                resetImage = {() => this.resetImage()}
                                filename={(filename) => this.storeFilename(filename)}
                            />

                            <FormField 
                                id={'name'}
                                formData = {this.state.formdata.name}
                                change={(element)=>this.updateForm(element)}
                            />

                            <FormField 
                                id={'description'}
                                formData = {this.state.formdata.description}
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

export default withRouter(AddEditServices);