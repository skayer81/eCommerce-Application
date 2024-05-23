import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );

    const text = screen.getByText('Page not found');
    expect(text).toBeInTheDocument();
  });
});
