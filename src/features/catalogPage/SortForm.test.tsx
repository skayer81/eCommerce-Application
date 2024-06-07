import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SortForm from './SortForm';

describe('SortForm', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <SortForm />
      </MemoryRouter>,
    );
    const renderText = screen.getByText('By Name');
    expect(renderText).toBeInTheDocument();
  });
});
