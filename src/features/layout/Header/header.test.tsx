import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from './Header';

describe('render', () => {
  it('renders the login page', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(true).toBeTruthy();
  });
});
