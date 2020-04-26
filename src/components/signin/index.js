import React, { Component } from 'react';
import FormField from '../ui/formFields';

import {validate} from '../ui/misc';
import { firebase } from '../../firebase';

class Sign_In extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email:{
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email',
                    class: "form-control"
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password:{
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password',
                    class: "form-control"
                },
                validation:{
                    required: true
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
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            console.log(dataToSubmit);
            //to check whether the entered email is already on database
            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            ).then(()=>{
                //pushing users to different route through react router
                this.props.history.push('/dashboard');
            }).catch((e)=>{
                this.setState({
                    formError: true
                })
            })
            //this.resetFormSuccess()
        }else{
            this.setState({
                formError: true
            })
        }
    }




    render() {
        return (
            <div className="container">
                <div className="signin_wrapper">
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2>Please log in</h2>

                            <FormField
                                id={'email'}
                                formData = {this.state.formdata.email}
                                change = {(element)=>this.updateForm(element)}
                            />

                            <FormField
                                id={'password'}
                                formData = {this.state.formdata.password}
                                change = {(element)=>this.updateForm(element)}
                            />

                            {this.state.formError ?
                                    <div className="error_label">Something's wrong. Try Again!</div>
                                :null
                            }
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button className="sign_in_button btn btn-primary" onClick={(event) => this.submitForm(event)}>Sign In</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Sign_In;