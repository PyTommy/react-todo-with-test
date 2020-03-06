import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../test/testUtils';

const setup = () => {
  const wrapper = shallow(<App />);
  return wrapper;
};

test('renders learn react link', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');

  expect(appComponent.length).toBe(1);
});
