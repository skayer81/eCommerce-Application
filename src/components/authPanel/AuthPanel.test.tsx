import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NoAuthPanel from './AuthPanel';

describe('ButtonToAnotherPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <NoAuthPanel />
      </MemoryRouter>,
    );

    const logout = screen.getByText('Logout');
    expect(logout).toBeInTheDocument();
  });
});
