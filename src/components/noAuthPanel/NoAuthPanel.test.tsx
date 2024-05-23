import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import NoAuthPanel from './NoAuthPanel';

describe('ButtonToAnotherPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <NoAuthPanel />
      </MemoryRouter>,
    );

    const textOnButton = screen.getByText('Login');
    expect(textOnButton).toBeInTheDocument();
  });
});
