import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterAndLogin from '../components/RegisterAndLogin';
import AuthContext from '../context/AuthContext';

describe('RegisterAndLogin', () => {
  it('renders the title, email and password input fields, and the login button when loading is false', () => {
    const mockAuthContext = {
      password: '',
      setPassword: jest.fn(),
      handleLogin: jest.fn(),
      email: '',
      setEmail: jest.fn(),
      loading: false,
    };

    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <RegisterAndLogin />
      </AuthContext.Provider>
    );

    expect(getByText('VisionGPT')).toBeTruthy();
    expect(getByText('Login >')).toBeTruthy();
  });

  it('renders the welcome text, email, and just a second text when loading is true', () => {
    const mockAuthContext = {
      password: '',
      setPassword: jest.fn(),
      handleLogin: jest.fn(),
      email: 'test@example.com',
      setEmail: jest.fn(),
      loading: true,
    };

    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <RegisterAndLogin />
      </AuthContext.Provider>
    );

    expect(getByText('Welcome')).toBeTruthy();
    expect(getByText('test@example.com')).toBeTruthy();
    expect(getByText('Just a second...')).toBeTruthy();
  });

  it('calls handleLogin when the login button is pressed', () => {
    const mockAuthContext = {
      password: '',
      setPassword: jest.fn(),
      handleLogin: jest.fn(),
      email: '',
      setEmail: jest.fn(),
      loading: false,
    };

    const { getByText } = render(
      <AuthContext.Provider value={mockAuthContext}>
        <RegisterAndLogin />
      </AuthContext.Provider>
    );

    fireEvent.press(getByText('Login >'));
    expect(mockAuthContext.handleLogin).toHaveBeenCalled();
  });
});
