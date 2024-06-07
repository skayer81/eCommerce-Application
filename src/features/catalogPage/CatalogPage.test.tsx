import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CatalogPage from './CatalogPage';

const queryClient = new QueryClient();

describe('CatalogPage', () => {
  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CatalogPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderText = screen.getByText('Catalog');
    expect(renderText).toBeInTheDocument();
  });
});
