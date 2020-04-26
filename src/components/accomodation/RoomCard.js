import React from 'react';
import {Link} from 'react-router-dom';

const RoomCard = ({room, index}) => {
    return (
        <div className="col-md-4 gallery-grid" key={room.id}>
            <Link to={`/accomodation/${room.id}`}>
                <div className="grid">
                    <figure className="effect-apollo">
                            <img src={room.url} alt="" />
                        <figcaption>
                            <h5 className="room-name">{room.name}</h5>
                            <p>{room.description.substr(0,50) + '... Click to find more'}</p>
                        </figcaption>
                    </figure>
                </div>
            </Link>
            <Link to={`/accomodation/${room.id}`}>{room.name}</Link>
        </div>
    );
};

export default RoomCard;