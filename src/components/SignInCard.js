import React from 'react';
import moment from 'moment';
import Button from '@govuk-react/button';
import '../style/Card.scss';

const SignInCard = ({signInHandler, currentVisit}) => {
    const {signIn, signOut, signInFlag, signOutFlag} = currentVisit;
    console.log(signInFlag);
    console.log(signOutFlag);
    console.log(signInFlag&&signOutFlag);
    return (
        <div className='card'>
            <div className='cardHeader'>
                <h2 className='cardHeader__header'>
                    Visitor Sign In
                </h2>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Sign In Time: </label>
                <span className='cardInformation__info'>{signIn=== "0001-01-01T00:00:00" ? '' : moment(signIn).format('llll')}</span>
            </div>
            <div className='cardInformation'>
                <label className='cardInformation__label'>Sign Out Time: </label>
                <span className='cardInformation__info'>{signOut=== "0001-01-01T00:00:00" ? '' : moment(signOut).format('llll')}</span>
            </div>
            <div className='cardInformation'>
                {
                    (signInFlag && signOutFlag) ? '' : <Button buttonColour='#357ebd' buttonHoverColour='#78aace' onClick={signInHandler} >{signInFlag ? 'Sign Out' : 'Sign In'}</Button>
                }
            </div>
        </div>
    );
};

export default SignInCard;