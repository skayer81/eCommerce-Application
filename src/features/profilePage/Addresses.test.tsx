import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Addresses from './Addresses';

describe('Addresses', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <Addresses />
      </MemoryRouter>,
    );
    const renderText = screen.getByText('Add addres');
    expect(renderText).toBeInTheDocument();
  });
});
