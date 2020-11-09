import React from 'react';

const Settings = props => {
    const clickHandler = () => {
        props.history.goBack();
    }

    return (
        <div className='settingsPage'>
            <h1>Settings Page</h1>
            <button onClick={clickHandler}>Go back</button>
        </div>
    );
}

export default Settings