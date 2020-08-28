/**
 * This Test covers all the component UI testcases
 * @format
 */

import 'react-native';
import React from 'react';
import Header from '../src/components/Header';
import Card from '../src/components/Card';
import GameAppButton from '../src/components/GameAppButton';

// Note: test renderer must be required after react-native.
// eslint-disable-next-line import/order
import renderer from 'react-test-renderer';

jest.useFakeTimers();
it('Header renders correctly', () => {
  renderer.create(<Header />);
});

jest.useFakeTimers();
it('Card renders correctly', async () => {
  renderer.create(<Card />);
});

jest.useFakeTimers();
it('CardRow renders correctly', async () => {
  renderer.create(<GameAppButton />);
});
