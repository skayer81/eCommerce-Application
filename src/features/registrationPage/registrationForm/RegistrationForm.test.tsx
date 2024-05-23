import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FormOfRegistration from './RegistrationForm';

const resultOfSubmit = (): void => {};

describe('ButtonToAnotherPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <FormOfRegistration resultOfSubmit={resultOfSubmit} />
      </MemoryRouter>,
    );

    const buttonText = screen.getByText('Registration');
    expect(buttonText).toBeInTheDocument();
  });
});
