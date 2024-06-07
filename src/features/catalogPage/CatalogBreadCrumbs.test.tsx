import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CatalogBreadcrumbs from './CatalogBreadCrumbs';

const queryClient = new QueryClient();

describe('CatalogBreadcrumbs', () => {
  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CatalogBreadcrumbs />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderText = screen.getByText('Catalog');
    expect(renderText).toBeInTheDocument();
  });
});
