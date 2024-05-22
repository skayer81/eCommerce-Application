import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ButtonToAnotherPage from './ButtonToAnotherPage';

describe('render', () => {
  it('renders the ButtonToAnotherPage page', () => {
    render(
      <BrowserRouter>
        <ButtonToAnotherPage addressPage="/" textOnButton="Back to main" title="title" />
      </BrowserRouter>,
    );
    expect(true).toBeTruthy();
  });
});
