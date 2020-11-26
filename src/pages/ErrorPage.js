import React from 'react';
import { withRouter } from 'react-router';
import Button from '@govuk-react/button';
import '../style/ErrorPage.scss';

const ErrorPage = ({ history, errorMessage }) => {

    const clickHandler = () => {
        history.goBack();
    }
    return (
        <div className='errorPage'>
            <div className='errorContainer'>
                <div className='errorContainer__div'>
                    <span>Status Code: </span>
                    <span>{errorMessage.status}</span>
                </div>
                <span className='errorContainer__text'>{errorMessage.message}</span>
            </div>
            <div className='btnContainer'>
                <Button buttonColour='#357ebd' buttonHoverColour='#78aace' onClick={clickHandler}>Go Back</Button>
            </div>
        </div>   
    )
}

export default withRouter(ErrorPage);