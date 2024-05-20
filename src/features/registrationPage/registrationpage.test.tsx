import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import RegistrationPage from './RegistrationPage';

describe('render', () => {
  it('renders the login page', () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>,
    );
    expect(true).toBeTruthy();
  });
});
