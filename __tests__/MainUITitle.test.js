import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainUITitle from '../components/MainUITitle';

describe('MainUITitle', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(<MainUITitle />);
    expect(getByText('VisionGPT')).toBeTruthy();
  });

  it('navigates to the menu when the menu icon is pressed', () => {
    const navigation = { navigate: jest.fn() };
    const { getByTestId } = render(<MainUITitle navigation={navigation} />);
    fireEvent.press(getByTestId('menu-icon'));
    expect(navigation.navigate).toHaveBeenCalledWith('Menu');
  });
});
