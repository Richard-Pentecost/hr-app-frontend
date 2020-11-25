import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Card.scss';
import CreateIcon from '@material-ui/icons/Create';

const InfoCard = ({infoArray, link}) => {
 
    return (
        <div className='card'>
            <div className='cardHeader'>
                <h2 className='cardHeader__header'>
                    Basic Information
                    <Link 
                        to= {link}
                    >
                        <span className='cardHeader__icon'><CreateIcon /></span>
                    </Link>
                </h2>
            </div>
            {infoArray.map(input=>(
                 <div className='cardInformation' key={input.label}>
                 <label className='cardInformation__label'>{`${input.label}: `}</label>
                 <span className='cardInformation__info'>{input.info}</span>
             </div>
            ))}
        </div>
    );
};

export default InfoCard;