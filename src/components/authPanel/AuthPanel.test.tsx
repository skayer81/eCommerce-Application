import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AuthPanel from './AuthPanel';

describe('AuthPanel', () => {
  it('should render', () => {
    const mockOnLogout = vi.fn();
    render(
      <MemoryRouter>
        <AuthPanel logout={mockOnLogout} />
      </MemoryRouter>,
    );

    const logout = screen.getByText('Log out');
    expect(logout).toBeInTheDocument();
  });
});
