import React from 'react';
import { render } from '@testing-library/react-native';
import QuestionLoading from '../components/QuestionLoading';

describe('QuestionLoading', () => {
  it('renders the loading text correctly', () => {
    const { getByText } = render(<QuestionLoading />);
    expect(getByText('Loading question..')).toBeTruthy();
  });
});
