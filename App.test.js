import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App, { submitToChatGPT } from './App';

describe('App', () => {
  it('renders the App component correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('VisionGPT')).toBeTruthy();
  });
});
