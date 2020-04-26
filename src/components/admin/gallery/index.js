import React, { Component } from 'react';
import { firebaseGallery } from '../../../firebase';
import Fileuploader from '../../ui/fileUploader';
import AdminLayout from '../../../HOC/AdminLayout';
import { withRouter } from 'react-router-dom'
import { validate } from "../../ui/misc";
import FormField from '../../ui/formFields';

class AdminGallery extends Component {

    state = {
        formError: false,
        formSuccess: '',
        defaultImg:'',
        formdata: {
            image:{
                element: 'image',
                value: '',
                validation:{
                    required: true,
                },
                valid: true
            },
            gallery_tag:{
                element:'select',
                value:'',
                config:{
                    name:'select_input',
                    type:'select',
                    label: 'Select which group image belongs to',
                    class: 'form-control',
                    options: [
                        {key:"interior", value:"interior"},
                        {key:"exterior", value:"exterior"},
                        {key:"rooms", value:"rooms"},
                        {key:"food", value:"food & drinks"}
                    ]
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage:'',
                showlabel: true
            }
        }
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

    resetImage(){
        const newFormData = {...this.state.formdata}
        newFormData['image'].value = '';
        newFormData['image'].valid = false;

        this.setState({
            defaultImg: '',
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
            firebaseGallery.push(dataToSubmit).then(()=>{
                this.props.history.push('/admin_gallery')
            }).catch((error)=>{
                console.log('Error occured', error);
                this.setState({formError: true})
            })
        }else{
            this.setState({
                formError: true
            })
        }
    }

    storeFilename(filename){
        this.updateForm({id:'image'}, filename)
    }

    render() {
        return (
            <AdminLayout>
                <h2 style={{textAlign: 'center'}} >Add images to gallery</h2>
                <div className="container">
                    <div className="row">
                        <form onSubmit={(event) => this.submitForm(event)}>
                            {/* upload to /gallery, if we dont specify directory the file will be uploaded to root of storage in firebase 

                            */}
                            <Fileuploader
                                dir="/gallery"
                                tag={"Add Gallery Image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formdata.image.value}
                                resetImage = {() => this.resetImage()}
                                filename={(filename) => this.storeFilename(filename)}
                            />

                            <FormField 
                                id={'gallery_tag'}
                                formData = {this.state.formdata.gallery_tag}
                                change={(element)=>this.updateForm(element)}
                            /> 

                        <div className="success_label">{this.state.formSuccess}</div>
                                {this.state.formError ? 
                                <div className="error_label">
                                    Something is wrong
                                </div>
                                :null}
                                <div className="admin_submit">
                                    <button onClick={(event)=>this.submitForm(event)}>
                                        Add Image
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

export default withRouter(AdminGallery);