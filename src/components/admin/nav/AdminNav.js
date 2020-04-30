import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import {firebase} from '../../../firebase'

const AdminNav = () => {

    const links = [
        {
            title: 'Messages',
            linkTo: '/admin_messages'
        },
        {
            title: 'Add Photos',
            linkTo: '/admin_gallery'
        },
        {
            title: 'Tariffs',
            linkTo: '/tariffs'
        },
        {
            title: 'Add Tariffs',
            linkTo: '/tariffs/add_tariff'
        },
        {
            title: 'Rooms',
            linkTo: '/admin_rooms'
        },
        {
            title: 'Add Rooms',
            linkTo: '/admin_rooms/add_room'
        },
        {
            title: 'Services',
            linkTo: '/admin_services'
        },
        {
            title: 'About Content',
            linkTo: '/admin_about'
        }
    ]

    const style = {
        color: '#ffffff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    }

    const renderItems = () => (
        links.map((link) => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )

    const logOutHandler = () => {
        firebase.auth().signOut().then(()=>{
            console.log('logged out suucesfully')
        }).catch((e)=>{
            console.log('somethings wrong', e)
        })
    }

    return (
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={()=> logOutHandler()}>
                Log Out
            </ListItem>
        </div>
    );
};

export default AdminNav;