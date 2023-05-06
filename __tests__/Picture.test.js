import React from 'react';
import { render } from '@testing-library/react-native';
import Picture from '../components/Picture';
import MainContext from '../context/MainContext';

describe('Picture', () => {
  
  it('does not render an image when there is no image URI', () => {
    const mockContext = {
      image: null,
    };

    const { queryByTestId } = render(
      <MainContext.Provider value={mockContext}>
        <Picture />
      </MainContext.Provider>
    );

    expect(queryByTestId('picture')).toBeNull();
  });
});
