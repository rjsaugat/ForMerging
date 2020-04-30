import React from 'react';

const SingleRoom = ({room}) => {

    const splitAmenities = (amenities) => {
        let splitCharacter = ','
        let amenitiesArray = amenities.split(splitCharacter);
        return amenitiesArray.map((amenity, i) => (
            <li key={i} className="amenities-item">{amenity}</li>
        ))
        
    }

    return (
        <div className="single-room">
            <div className="row single-room-row">
                <div className="col-md-7">
                    <figure className="single-room-figure">
                        <img src={room.url} alt={room.name} />
                    </figure>
                </div>
                <div className="col-md-5">
                    <p>{room.name}</p>
                    <p><strong>Description</strong>{room.description}</p>
                    <ul><strong>Amenities</strong>
                        {splitAmenities(room.amenities)}
                    </ul>
                    <p><strong>Max no of guests in this room</strong>{room.max_guests}</p>
                    <p><strong>*Price</strong>{room.price}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleRoom;