import React from 'react';
import '../style/Card.scss';

const Card = props => {
    return (
        <div className='card'>
            <h2 className='cardHeader'>Basic Information</h2>
            <div className='cardInformation'>
                <label className='cardInformation__label'>First Name</label>
                <span className='cardInformation__info'>{props.firstName}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Surname</label>
                <span className='cardInformation__info'>{props.surname}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Date of Birth</label>
                <span className='cardInformation__info'>{props.dob}</span>
            </div>
        </div>
    );
};

export default Card;