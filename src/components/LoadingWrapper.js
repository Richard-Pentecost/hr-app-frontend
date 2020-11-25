import React from 'react';
import LoadingBox from '@govuk-react/loading-box';

const LoadingWrapper = ({ children, loading }) => {
    return (
        <LoadingBox
            loading={loading}
            backgroundColor={'#fff'}
            timeIn={800}
            timeOut={200}
            backgroundColorOpacity={0.85}
            spinnerColor={'#000'}
        >
            {children}
        </LoadingBox>
    )
};

export default LoadingWrapper;
