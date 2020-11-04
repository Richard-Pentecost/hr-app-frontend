import React from 'react';
import { shallow, mount }from 'enzyme';
import Settings from '../components/Settings';

describe('Settings', () => {
    it('renders a div with className of "settingsPage"', () => {
        const wrapper = shallow(<Settings />);
        expect(wrapper.find('div').hasClass('settingsPage')).toBe(true);
    });
});