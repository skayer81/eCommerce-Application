import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Layout from './Layout';

describe('MainPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>,
    );
    const renderText = screen.getByText('Main');
    expect(renderText).toBeInTheDocument();
  });
});
