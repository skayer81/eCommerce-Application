import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FilterForm from './FilterForm';

const queryClient = new QueryClient();

describe('FilterForm', () => {
  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <FilterForm />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderText = screen.getByText('Apply');
    expect(renderText).toBeInTheDocument();
  });
});
