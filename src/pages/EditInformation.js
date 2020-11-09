import React from 'react';

const EditInformation = props => {
    const clickHandler = () => {
        props.history.goBack();
    }

    return (
        <div className='editInformationPage'>
            <h1>Edit Information Page</h1>
            <button onClick={clickHandler}>Go back</button>
        </div>
    );
}

export default EditInformation