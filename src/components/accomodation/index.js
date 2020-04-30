import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { firebase, firebaseRooms } from '../../firebase'
import { firebaseLooper } from '../ui/misc'; 
import RoomCard from './RoomCard.js';
import Tariff from './Tariff';
import {withRouter} from 'react-router-dom'

class Accomodation extends Component {

    state = {
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
                        firebase.storage().ref('rooms')
                        .child(rooms[key].image).getDownloadURL()
                        .then((url)=>{
                            rooms[key].url = url;
                            resolve();
                        })
                    })
                )
            }
            Promise.all(promises)
            .then(()=>{
                this.setState({
                    isLoading: false,
                    rooms
                })
            })
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="accomodation-container container">
                <div className="accomodation-heading">
                    <h2 className="second-heading">Accomodation</h2>
                    <hr class="service-line"/>
                </div>
                <div className="gallery-grids row">
                    {
                        this.state.isLoading ? 
                            <CircularProgress />
                        : this.state.rooms.map((room, i) => (
                            <RoomCard 
                                room={room}
                                key={i}
                            />
                        ))

                    }
                </div>
                <Tariff />
            </div>
        );
    }
}

export default withRouter(Accomodation);