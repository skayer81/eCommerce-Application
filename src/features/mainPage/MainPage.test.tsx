import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MainPage from './MainPage';

describe('MainPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>,
    );
    const renderText = screen.getByText('Planet');
    expect(renderText).toBeInTheDocument();
  });
});
