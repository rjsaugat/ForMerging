import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FormField from "../../ui/formFields";
import {validate} from '../../ui/misc';
import { withRouter } from 'react-router-dom'

import {firebaseRooms, firebaseDB , firebase } from '../../../firebase';
import Fileuploader from '../../ui/fileUploader';


class AddEditRooms extends Component {

    state = {
        roomId : '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formdata:{
            name:{
                element:'input',
                value:'',
                config:{
                    name:'name_input',
                    type:'text',
                    label: 'Name of Room',
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
                    name:'desc_input',
                    type:'textarea',
                    label: 'Short description about room',
                    class: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            price:{
                element:'input',
                value:'',
                config:{
                    name:'price_input',
                    type:'text',
                    label: 'Price of the room',
                    class: 'form-control'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            amenities:{
                element:'textarea',
                value:'',
                config:{
                    name:'amenities_input',
                    type:'text',
                    label: 'List of available amenities',
                    class:'form-control',
                    placeholder: 'Add amenities seperated by comma( , ) eg: AC, TV etc.'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            },
            max_guests:{
                element:'input',
                value:'',
                config:{
                    name:'max_guests_input',
                    type:'text',
                    label: 'Max no of guests in a room',
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

    updateFields = (room, roomId, type, defaultImg) => {
        const newFormData = {...this.state.formdata}
        /* console.log(room)
        console.log(newFormData) */
        for(let key in newFormData){
            newFormData[key].value = room[key];
            newFormData[key].valid = true;
        }
        //as key and value are same
        this.setState({
            roomId,
            defaultImg,
            formType: type,
            formdata: newFormData
        })
    }


    componentDidMount(){
        const roomId = this.props.match.params.id;

        if(!roomId){
            this.setState({
                formType: 'Add Room'
            })
        }else{
            //edit room
            firebaseDB.ref(`rooms/${roomId}`).once('value').then((snapshot)=>{
                const roomData = snapshot.val();
                console.log(roomData)
                let promise = new Promise((resolve, reject) => {
                    firebase.storage().ref('/rooms')
                    .child(roomData.image).getDownloadURL()
                    .then( url => {
                        roomData.url = url;
                        resolve();
                    }).catch(error => {
                        reject(error)
                    })
                })
                promise.then(()=>{
                    console.log('update fields called')
                    this.updateFields(roomData, roomId, 'Edit Room', roomData.url)
                }) 
            })
        }
    }

    removingCode(){
        const roomId = this.props.match.params.id;
        firebaseDB.ref(`rooms/${roomId}`).once('value').then((snapshot)=>{
            const roomData = snapshot.val();
            firebase.storage().ref('/rooms')
                .child(roomData.image).getDownloadURL()
                .then( url => {
                    this.updateFields(roomData, roomId, 'Edit Room', url)
                })
            })
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

    successForm = (message) => {
        this.setState({
            formSuccess: message
        })
        setTimeout(()=>{
            this.setState({formSuccess: ''})
        }, 2000)
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
            if(this.state.formType === 'Edit Room'){
                firebaseDB.ref(`rooms/${this.state.roomId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Updated Successfully')
                }).catch((e)=>{
                    this.setState({formError: true})
                    console.log('erroe', e)
                })

            }else{
                firebaseRooms.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_rooms')
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


    render() {
        return (
            <AdminLayout>
                <div className="container">
                    <div className="row" style={{textAlign:'center', flexDirection: 'column'}}>
                        <h2>
                            {this.state.formType}
                        </h2>
                        <div className="add_room_form">
                            <form onSubmit={(event) => this.submitForm(event)}>

                            <Fileuploader 
                                dir="rooms"
                                tag={"Room image"}
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

                            <FormField 
                                id={'price'}
                                formData = {this.state.formdata.price}
                                change={(element)=>this.updateForm(element)}
                            />

                            <FormField 
                                id={'amenities'}
                                formData = {this.state.formdata.amenities}
                                change={(element)=>this.updateForm(element)}
                            />

                            <FormField 
                                id={'max_guests'}
                                formData = {this.state.formdata.max_guests}
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

export default withRouter(AddEditRooms);