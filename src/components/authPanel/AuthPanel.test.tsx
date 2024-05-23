import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AuthPanel from './AuthPanel';

describe('AuthPanel', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <AuthPanel />
      </MemoryRouter>,
    );

    const logout = screen.getByText('Logout');
    expect(logout).toBeInTheDocument();
  });
});
