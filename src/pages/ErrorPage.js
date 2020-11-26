import React from 'react';

const ErrorPage = ({ errorMessage }) => {
    return (
        <div>
            <div>
                <span>{errorMessage.status}</span>
                <span>{errorMessage.data.title}</span>
            </div>
        </div>   
    )
}

export default ErrorPage;