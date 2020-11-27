import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Card.scss';
import CreateIcon from '@material-ui/icons/Create';

const ContactCard = ({user, link}) => {
    
    return (
        <div className='card'>
            <div className='cardHeader'>
                <h2 className='cardHeader__header'>
                    Contact Information
                    <Link to={link}>
                        <span className='cardHeader__icon'><CreateIcon /></span>
                    </Link>
                </h2>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Email Address: </label>
                <span className='cardInformation__info'>{user.email}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Telephone Number: </label>
                <span className='cardInformation__info'>{user.telephone}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Address:</label>
                <span className='cardInformation__info'>{user.address}</span>
            </div>
        </div>
    );
};

export default ContactCard;