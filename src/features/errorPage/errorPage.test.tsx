import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorPage from './ErrorPage';

describe('ErrorPage Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('displays the correct image', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );
    const imgElement = screen.getByAltText('flowers');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/src/assets/images/image-404.jpg');
  });

  it('displays the button with correct text', () => {
    render(
      <BrowserRouter>
        <ErrorPage />
      </BrowserRouter>,
    );
    expect(screen.getByText('Back to main')).toBeInTheDocument();
  });
});
