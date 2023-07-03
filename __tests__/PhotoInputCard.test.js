import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PhotoInputCard from '../components/PhotoInputCard';
import MainContext from '../context/MainContext';
import AppPreferencesContext from '../context/AppPreferencesContext';

describe('PhotoInputCard', () => {
  it('renders the card when isInputCardsVisible is true', () => {
    const contextValue = { theme: { fontColor: { primaryFontColor: '#000' } }, language: 'en' };
    const mockContext = {
      takeAndCropPhoto: jest.fn(),
      pickImage: jest.fn(),
      isInputCardsVisible: true,
    };

    const { getByText } = render(
      <MainContext.Provider value={mockContext}>
        <AppPreferencesContext.Provider value={contextValue}>
        <PhotoInputCard />
      </AppPreferencesContext.Provider>
      </MainContext.Provider>
    );

    expect(getByText('Take a Photo')).toBeTruthy();
  });

  it('does not render the card when isInputCardsVisible is false', () => {
    const mockContext = {
      takeAndCropPhoto: jest.fn(),
      pickImage: jest.fn(),
      isInputCardsVisible: false,
    };
    const contextValue = { theme: { fontColor: { primaryFontColor: '#000' } }, language: 'en' };

    const { queryByText } = render(
      <MainContext.Provider value={mockContext}>
        <AppPreferencesContext.Provider value={contextValue}>
        <PhotoInputCard />
        </AppPreferencesContext.Provider>
      </MainContext.Provider>
    );

    expect(queryByText('Choose an Image')).toBeNull();
  });

  it('calls takeAndCropPhoto when Take Photo button is pressed', () => {
    const mockContext = {
      takeAndCropPhoto: jest.fn(),
      pickImage: jest.fn(),
      isInputCardsVisible: true,
    };
    const contextValue = { theme: { fontColor: { primaryFontColor: '#000' } }, language: 'en' };

    const { getByText } = render(
      <MainContext.Provider value={mockContext}>
        <AppPreferencesContext.Provider value={contextValue}>
        <PhotoInputCard />
        </AppPreferencesContext.Provider>
      </MainContext.Provider>
    );

    fireEvent.press(getByText('Take a Photo'));
    expect(mockContext.takeAndCropPhoto).toHaveBeenCalled();
  });

  it('calls pickImage when Select Picture button is pressed', () => {
    const mockContext = {
      takeAndCropPhoto: jest.fn(),
      pickImage: jest.fn(),
      isInputCardsVisible: true,
    };
    const contextValue = { theme: { fontColor: { primaryFontColor: '#000' } }, language: 'en' };

    const { getByText } = render(
      <MainContext.Provider value={mockContext}>
        <AppPreferencesContext.Provider value={contextValue}>
        <PhotoInputCard />
        </AppPreferencesContext.Provider>
      </MainContext.Provider>
    );

    fireEvent.press(getByText('Choose an Image'));
    expect(mockContext.pickImage).toHaveBeenCalled();
  });
});
