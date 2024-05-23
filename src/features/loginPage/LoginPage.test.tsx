import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    const buttonText = screen.getByText('Sign up');
    expect(buttonText).toBeInTheDocument();
  });
});
