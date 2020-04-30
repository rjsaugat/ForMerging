import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';
import { Link } from 'react-router-dom';
import { firebase, firebaseDB, firebaseRooms } from '../../../firebase';
import {firebaseLooper, reverseArray} from '../../ui/misc';


class AdminRooms extends Component {

    state= {
        isLoading: true,
        rooms: []
    }

    componentDidMount(){
        firebaseRooms.once('value').then((snapshot) => {
            const rooms = firebaseLooper(snapshot);
            let promises = [];
            for(let key in rooms){
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('/rooms')
                        .child(rooms[key].image).getDownloadURL()
                        .then( url => {
                            rooms[key].url = url
                            resolve();
                        }).catch( e => {
                            console.log('error occured', e)
                            reject(e);
                        })
                    }) 
                )
            }
            Promise.all(promises).then(() => {
                this.setState({
                    isLoading: false,
                    rooms: reverseArray(rooms)
                })
            })
        }).catch((error) => {
            console.log('firebase rooms error', error);
        })
    }

    addRooms(room, i){        
        return(
            <div className="col-md-4" key={i}>
                <div className="card mb-4 box-shadow">
                    <img className="card-img-top" src={room.url} alt={room.name}/>
                    <div className="card-body">
                        <p className="card-text">{room.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <Link to={`accomodation/${room.id}`}>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                </Link>
                                <Link to={`admin_rooms/add_rooms/${room.id}`}>
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                </Link>
                                
                            </div>
                            <small className="text-muted">{room.name}</small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        
        return (
            <AdminLayout>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            
                            {this.state.rooms ?
                                this.state.rooms.map((room, i)=>(
                                    /* firebaseDB.ref(`rooms/${room.id}`).once('value').then((snapshot) => {
                                        const roomData = snapshot.val();
                                            firebase.storage().ref('/rooms')
                                            .child(roomData.image).getDownloadURL()
                                            .then( url => {
                                                this.addRooms(room, i, url)
                                        })
                                    })
                                     */
                                    this.addRooms(room, i)
                                ))
                                :null
                            }
                        </div>
                    </div>    
                </div>
            </AdminLayout>
        );
    }
}

export default AdminRooms;