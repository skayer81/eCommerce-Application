import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import CategoriesControl from './CategoriesControl';

describe('CategoriesControl', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <CategoriesControl />
      </MemoryRouter>,
    );
    const renderText = screen.getByText('Categories');
    expect(renderText).toBeInTheDocument();
  });
});
