import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Card.scss';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';

const Card = ({user, link}) => {
    
    return (
        <div className='card'>
            <div className='cardHeader'>
                <h2 className='cardHeader__header'>
                    Basic Information
                    <Link to={link}>
                        <span className='cardHeader__icon'><CreateIcon /></span>
                    </Link>
                </h2>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>First Name: </label>
                <span className='cardInformation__info'>{user.firstName}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Surname: </label>
                <span className='cardInformation__info'>{user.surname}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Role: </label>
                <span className='cardInformation__info'>{user.role}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Date of Birth: </label>
                <span className='cardInformation__info'>{moment(user.doB).format('Do MMM YYYY')}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Admin Level: </label>
                <span className='cardInformation__info'>{user.adminLevel}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Next of Kin: </label>
                <span className='cardInformation__info'>{user.nextOfKin}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Salary: </label>
                <span className='cardInformation__info'>{user.salary}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Location: </label>
                <span className='cardInformation__info'>{user.location}</span>
            </div>
        </div>
    );
};

export default Card;