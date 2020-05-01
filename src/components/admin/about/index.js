import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';
import {withRouter} from 'react-router-dom'
import FormField from '../../ui/formFields';
import {validate} from '../../ui/misc';
import {firebaseAboutContent, firebaseDB} from '../../../firebase';



class AdminAbout extends Component {

    state = {
        contentid : '',
        formType: 'Edit Content',
        formError: false,
        formSuccess: '',
        formdata: {
            subtitle: {
                element:'input',
                value:'',
                config:{
                    name:'subtitle_input',
                    type:'text',
                    label: 'Content for subtitle',
                    class: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            pg_one: {
                element:'textarea',
                value:'',
                config:{
                    name:'pg_one_input',
                    type:'textarea',
                    label: 'First paragraph ',
                    class: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            pg_two: {
                element:'textarea',
                value:'',
                config:{
                    name:'pg_two_input',
                    type:'text',
                    label: 'Second paragraph ',
                    class: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            pg_three: {
                element:'textarea',
                value:'',
                config:{
                    name:'pg_three_input',
                    type:'text',
                    label: 'Third paragraph ',
                    class: 'form-control'
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
        firebaseAboutContent.once('value').then((snapshot) => {
            const contentObject = snapshot.val();
            this.updateFields(contentObject)
        }).catch( e => {
            console.log(e)
        })
    }

    updateFields = (content) => {
        const newFormData = {...this.state.formdata}
        /* console.log(room)
        console.log(newFormData) */
        for(let key in newFormData){
            newFormData[key].value = content[key];
            newFormData[key].valid = true;
        }
        //as key and value are same
        this.setState({
            formdata: newFormData
        })
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
            firebaseDB.ref(`aboutContent/${this.state.contentid}`)
            .update(dataToSubmit).then(()=>{
                this.successForm('Updated Successfully')
            }).catch((e)=>{
                this.setState({formError: true})
                console.log('erroe', e)
            })
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
                <div className="container admin-about-container">
                    <div className="row">
                        <h2>
                            {this.state.formType}
                        </h2>
                        <div className="add_room_form">
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <FormField 
                                    id={'subtitle'}
                                    formData = {this.state.formdata.subtitle}
                                    change={(element)=>this.updateForm(element)}
                                />
                                <FormField 
                                    id={'pg_one'}
                                    formData = {this.state.formdata.pg_one}
                                    change={(element)=>this.updateForm(element)}
                                />
                                <FormField 
                                    id={'pg_two'}
                                    formData = {this.state.formdata.pg_two}
                                    change={(element)=>this.updateForm(element)}
                                />
                                <FormField 
                                    id={'pg_three'}
                                    formData = {this.state.formdata.pg_three}
                                    change={(element)=>this.updateForm(element)}
                                />

                                <div className="success_label">{this.state.formSuccess}</div>
                                {this.state.formError ? 
                                <div className="error_label">
                                    Something is wrong
                                </div>
                                :null}
                                <div className="admin_submit">
                                    <button className="btn btn-primary" onClick={(event)=>this.submitForm(event)}>
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

export default withRouter(AdminAbout);