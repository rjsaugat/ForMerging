import React, { Component } from 'react';
import Roll from 'react-reveal/Roll';
import FormField from '../../../ui/formFields';
import {validate} from '../../../ui/misc';
import Button from '@material-ui/core/Button';
import {firebaseMessages} from '../../../../firebase'; 

class MessageUs extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            name:{
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Your name',
                    class: 'form-control'
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage: ''
            },
            email:{
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'email as example@email.com',
                    class: 'form-control'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            message:{
                element: 'textarea',
                value: '',
                config: {
                    name: 'message_input',
                    type: 'text',
                    placeholder: 'Your Message',
                    class: 'form-control text-area'
                },
                validation:{
                    required: true,
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateForm(element){
        //not good to mutate the state so copy the state and work on this
        const newFormData = { ...this.state.formdata};
        //get the email state
        const newElement = {...newFormData[element.id]}
    
        newElement.value = element.event.target.value;

        let validData = validate(newElement)
        
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormData[element.id] = newElement;
        
        
        this.setState({
            formError: false,
            formdata: newFormData
        })
        //console.log(this.state.formdata.email.value)
    }

    resetFormSuccess(){
        //not good to mutate the state so copy the state and work on this
        const newFormData = { ...this.state.formdata};

        for(let key in newFormData){
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }

        this.setState({
            formError: false,
            formdata: newFormData,
            formSuccess: 'Congratulations'
        })

        this.clearSuccessMessage();
    }

    clearSuccessMessage(){
        setTimeout(()=>{
            this.setState({formSuccess: ''});
        },2000)
    }

    submitForm(event){
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            console.log(dataToSubmit)
            firebaseMessages.push(dataToSubmit)
            
            this.resetFormSuccess()
        }else{
            this.setState({
                formError: true
            })
        }

        
    }

    render() {
        return (
            <Roll right>
                <div className="message-us" style={{textAlign: 'center'}}>
                    <form onSubmit={(event) => this.submitForm(event)} className="message-us-form">
                            <FormField 
                            id={'name'}
                            formData = {this.state.formdata.name}
                            change={(element)=>this.updateForm(element)}
                        />                            
                        <FormField 
                            id={'email'}
                            formData = {this.state.formdata.email}
                            change={(element)=>this.updateForm(element)}
                        />
                        <FormField 
                            id={'message'}
                            formData = {this.state.formdata.message}
                            change={(element)=>this.updateForm(element)}
                        />
                        {this.state.formError ?
                                <div className="error_label">Something's wrong. Try Again!</div>
                            :null
                        }
                        <div className="success_label">{this.state.formSuccess}</div>
                        <Button 
                            variant="contained"  
                            size="large"
                            onClick={(event) => this.submitForm(event)}
                        >Send Message</Button>
                    </form>
                </div>
            </Roll>
        );
    }
}

export default MessageUs;