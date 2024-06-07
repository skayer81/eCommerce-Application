import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorAlert from './ErrorAlert'; //ButtonToAnotherPage from './ButtonToAnotherPage';

describe('ErrorAlert', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <ErrorAlert />
      </MemoryRouter>,
    );

    const textOnButton = screen.getByText('Something went wrong. Try again later...');
    expect(textOnButton).toBeInTheDocument();
  });
});
