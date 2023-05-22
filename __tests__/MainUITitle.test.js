import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MainUITitle from '../components/MainUITitle';
import AppPreferencesContext from '../context/AppPreferencesContext';

describe('MainUITitle', () => {
  it('renders the title correctly', () => {
    const contextValue = { theme: { fontColor: { primaryFontColor: '#000' } }, language: 'en' };
    const { getByText } = render(
      <AppPreferencesContext.Provider value={contextValue}>
        <MainUITitle />
      </AppPreferencesContext.Provider>
    );
    expect(getByText('VisionGPT')).toBeTruthy();
  });

  it('navigates to the menu when the menu icon is pressed', () => {
    const navigation = { navigate: jest.fn() };
    const contextValue = { theme: { fontColor: { primaryFontColor: '#000' } }, language: 'en' };
    const { getByTestId } = render(
      <AppPreferencesContext.Provider value={contextValue}>
        <MainUITitle navigation={navigation} />
      </AppPreferencesContext.Provider>
    );
    fireEvent.press(getByTestId('menu-icon'));
    expect(navigation.navigate).toHaveBeenCalledWith('Menu');
  });
});

