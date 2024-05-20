import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MainPage from './MainPage';

describe('render', () => {
  it('renders the login page', () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );
    expect(true).toBeTruthy();
  });
});
