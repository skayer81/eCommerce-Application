import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NoAuthPanel from './NoAuthPanel';

describe('NoAuthPanel', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <NoAuthPanel />
      </MemoryRouter>,
    );

    const textOnButton = screen.getByText('Log in');
    expect(textOnButton).toBeInTheDocument();
  });
});
