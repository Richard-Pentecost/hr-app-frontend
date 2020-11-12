import React from 'react';
import { render } from '@testing-library/react';
import EditInformation from '../pages/EditInformation';

describe('EditInformation', () => {

    test('renders the EditInformation page', () => {
    render(<EditInformation />);
    });
});
