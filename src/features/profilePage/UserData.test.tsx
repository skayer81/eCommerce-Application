import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UserData from './UserData';

const queryClient = new QueryClient();

describe('UserData', () => {
  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserData />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderText = screen.getByText('User data');
    expect(renderText).toBeInTheDocument();
  });
});
