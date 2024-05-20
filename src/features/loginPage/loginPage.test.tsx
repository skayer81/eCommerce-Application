import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LoginPage from './LoginPage';

describe('render', () => {
  it('renders the login page', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );
    expect(true).toBeTruthy();
  });
});
