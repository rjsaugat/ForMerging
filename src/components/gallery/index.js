import React, { Component } from 'react';
import { firebaseGallery, firebase } from '../../firebase';
import {firebaseLooper} from '../ui/misc'
import {Promise} from 'core-js';
import CircularProgress from '@material-ui/core/CircularProgress';

class Gallery extends Component {

    state={
        loading: true,
        gallery: [],
        filteredGallery: [],
        filterThrough: 'All'
    }

    componentDidMount(){
        firebaseGallery.once('value').then((snapshot)=>{
            const gallery = firebaseLooper(snapshot)
            let promises = [];
            for(let key in gallery){
                promises.push(
                    new Promise((resolve,reject) => {
                        firebase.storage().ref('gallery')
                        .child(gallery[key].image).getDownloadURL()
                        .then( url => {
                            gallery[key].url = url
                            resolve();
                        })
                    })
                )
            }
            Promise.all(promises).then(()=>{
                this.setState({
                    loading: false,
                    gallery: gallery,
                    filteredGallery: gallery
                })
            })
        }).catch((e)=>{
            console.log(e)
        })
    }

    showFiltered = (filter) => {
        const list = this.state.gallery.filter((photo) => {
            return photo.gallery_tag === filter
        })
        this.setState({
            filteredGallery: filter === 'All' ? this.state.gallery : list,
            filterThrough: filter
        })
    }

    addPhotosToPage = (photoObj, i) => {
        console.log(photoObj.url)
        return (<div className="col-md-4 gallery-image-wrapper" key={i}>
            <div className="gallery-single-image-wrapper">
                    <img className="gallery-image-single" 
                        src={photoObj.url} 
                        onLoad={()=> console.log('loadded')} 
                        alt={photoObj.id}
                    />
                </div>
            </div>
        )    
    }

    render() {
        return (
            <div className="gallery-container">
                <div className="container">
                    <div className="row row-first">
                        <h3>Gallery</h3>
                        <hr className="gallery-line"></hr>
                        <h6>Fresh photos of area in and out of Hotel.</h6>
                        <div className="gallery_filters">
                            <div className="filters_container">
                                <div className="portfolioFilter">  
                                    <ul className="Portfolio-nav">
                                        <li 
                                            className={`option ${this.state.filterThrough === 'All' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('All')}>All</li>
                                        <li 
                                            className={`option ${this.state.filterThrough === 'rooms' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('rooms')}>Rooms</li>
                                        <li 
                                            className={`option ${this.state.filterThrough === 'food' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('food')}>Food & Drinks</li>
                                        <li 
                                            className={`option ${this.state.filterThrough === 'exterior' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('exterior')}>Exteriors</li>
                                        <li 
                                            className={`option ${this.state.filterThrough === 'interior' ? 'active' : ''}`} 
                                            onClick={() => this.showFiltered('interior')}>Interior</li>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                        <div className="row row-second">
                            {!this.state.loading && this.state.gallery.length?
                                this.state.filteredGallery.map((photoObj, i) => (
                                    this.addPhotosToPage(photoObj, i)
                                ))
                        
                            : <CircularProgress />}
                            
                        </div>
                        
                    </div>    
                </div>
            </div>
        );
    }
}

export default Gallery;