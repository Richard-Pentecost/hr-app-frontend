import React from 'react'
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import Heading from '../components/Heading';
import { H3 } from '@govuk-react/heading';

// Testing using Enzyme
describe('Button - Enzyme', () => {
  it('renders a Button with custom text', () => {
    const wrapper = shallow(<Heading>Heading</Heading>);
    const expected = <H3>Heading</H3>;
    expect(wrapper.contains(expected)).toBe(true);
  }); 
});

// Testing using @testing-library/react
describe('Button - @testing-library/react', () => {
  test('should render a Button with custom text', () => {
    const { getByText } = render(<Heading>Heading</Heading>);
    const heading = getByText('Heading');
    expect(heading).toBeInTheDocument();
  })
});