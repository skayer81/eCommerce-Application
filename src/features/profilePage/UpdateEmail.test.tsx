import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UpdateEmail from './UpdateEmail';
const queryClient = new QueryClient();

describe('UpdateEmail', () => {
  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UpdateEmail />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderText = screen.getByText('Email');
    expect(renderText).toBeInTheDocument();
  });
});
