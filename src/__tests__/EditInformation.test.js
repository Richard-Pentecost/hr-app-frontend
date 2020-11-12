import React from 'react';
import { render } from '@testing-library/react';
import EditInformation from '../pages/EditInformation';

describe('EditInformation', () => {

    test('renders the EditInformation page', () => {
        const user = {
            firstName: 'Testname',
            surname: 'Testsurname',
            role: 'Testrole',
            email: 'test@email.com',
            telephone: '012345789',
            doB: '01/01/1900',
            permissionLevel: 'test',
            nextOfKin: 'test',
            salary: '10000',
            location: 'Manchester',
            address: 'Test Address',
        }
        render(<EditInformation user={user} />);
    });
});
