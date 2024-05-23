import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    const text = screen.getByText('page under development');
    expect(text).toBeInTheDocument();
  });
});
