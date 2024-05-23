import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ButtonToAnotherPage from './ButtonToAnotherPage';

describe('ButtonToAnotherPage', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <ButtonToAnotherPage addressPage="./" textOnButton={'registration'} title={'title'} />
      </MemoryRouter>,
    );

    const textOnButton = screen.getByText('registration');
    expect(textOnButton).toBeInTheDocument();
  });
});
