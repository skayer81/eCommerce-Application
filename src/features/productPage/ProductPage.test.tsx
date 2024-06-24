import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ProductPage from './ProductPage';

const queryClient = new QueryClient();

describe('ProductPage', () => {
  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <ProductPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderText = screen.getByText('Loading...');
    expect(renderText).toBeInTheDocument();
  });
});
