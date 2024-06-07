import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AddresType } from '@/types/interfaces';

import { Addres } from './Addres';

const queryClient = new QueryClient();
const emptyAddres: AddresType = {
  city: '',
  country: '',
  index: '',
  street: '',
  useByDefaultBilling: false,
  useByDefaultShipping: false,
  adressID: '',
};

describe('Addres', () => {
  it('should render', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Addres defaultAddres={emptyAddres} isNewAddres={false} version={1} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderDelText = screen.getByText('Delete');
    expect(renderDelText).toBeInTheDocument();
    const renderSubmitText = screen.getByText('Submit');
    expect(renderSubmitText).toBeInTheDocument();
  });
  it('should render new addres', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Addres defaultAddres={emptyAddres} isNewAddres={true} version={1} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const renderText = screen.getByText('Delete');
    expect(renderText).toBeInTheDocument();
  });
});
