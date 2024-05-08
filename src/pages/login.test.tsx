import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Login from './Login';

describe('render', () => {
  it('renders the login page', () => {
    render(<Login />);
    expect(true).toBeTruthy();
  });
});
