import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Card.scss';
import CreateIcon from '@material-ui/icons/Create';

const Card = props => {
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
                <span className='cardInformation__info'>{props.firstName}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Surname</label>
                <span className='cardInformation__info'>{props.surname}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Date of Birth</label>
                <span className='cardInformation__info'>{props.doB}</span>
            </div>
        </div>
    );
};

export default Card;