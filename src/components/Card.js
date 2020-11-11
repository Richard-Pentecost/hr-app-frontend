import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Card.scss';
import moment from 'moment';
import CreateIcon from '@material-ui/icons/Create';

const Card = ({firstName, surname, doB}) => {
    // console.log(props);
    return (
        <div className='card'>
            <div className='cardHeader'>
                <h2 className='cardHeader__header'>
                    Basic Information
                    <Link 
                        to='/edit-information'
                    >
                        <span className='cardHeader__icon'><CreateIcon /></span>
                    </Link>
                </h2>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>First Name</label>
                <span className='cardInformation__info'>{firstName}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Surname</label>
                <span className='cardInformation__info'>{surname}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Date of Birth</label>
                <span className='cardInformation__info'>{moment(doB).format('Do MMM YYYY')}</span>
            </div>
        </div>
    );
};

export default Card;