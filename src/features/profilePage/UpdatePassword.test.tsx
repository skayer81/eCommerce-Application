import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UpdatePassword from './UpdatePassword';
const queryClient = new QueryClient();

describe('UpdatePassword', () => {
  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UpdatePassword />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderText = screen.getByText('Password');
    expect(renderText).toBeInTheDocument();
  });
});
