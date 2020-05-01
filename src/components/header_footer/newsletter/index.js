import React, { Component } from 'react';
import {Zoom} from 'react-reveal';
import FormField from '../../ui/formFields';
import {validate} from '../../ui/misc';
import { firebasePromotions } from '../../../firebase';

class NewsLetter extends Component {

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
                    placeholder: 'Enter Your Email'
                },
                validation:{
                    required: true,
                    email: true
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

    resetFormSuccess(type){
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
            formSuccess: type ? 'Congratulations' : 'Already Registered!!'
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
            //console.log(dataToSubmit);
            //to check whether the entered email is already on database
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once("value")
            .then((snapshot)=>{
                //console.log(snapshot.val())
                if(snapshot.val() === null){
                    firebasePromotions.push(dataToSubmit);
                    this.resetFormSuccess(true)
                }else{
                    this.resetFormSuccess(false)
                }
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
            <Zoom>
                <div className="footer_newsletter">
                    <p>Sign up for latest offers!! </p>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <div className="newsletter_input">
                            <FormField
                                id={'email'}
                                formData = {this.state.formdata.email}
                                change = {(element)=>this.updateForm(element)}
                            />

                            {this.state.formError ?
                                    <div className="error_label">Something's wrong. Try Again!</div>
                                :null
                            }
                            <div className="success_label">{this.state.formSuccess}</div>
                            {/* <Button variant="contained" color="primary" onClick={(event) => this.submitForm(event)}>Enroll</Button> */}
                            <button className="btn nav-btn">Enroll</button> 
                        </div>
                    </form>
                </div>
            </Zoom>
        );
    }
}

export default NewsLetter;