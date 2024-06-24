import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import RegistrationPage from './RegistrationPage';

describe('RegistrationPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>,
    );

    const buttonText = screen.getByText('Registration');
    expect(buttonText).toBeInTheDocument();
  });
});
