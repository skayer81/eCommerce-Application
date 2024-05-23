import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

//import ModalMessage from './ModalMessage';
import ModalMessage from './modalMessage';

describe('ModalMessage', () => {
  it('should render no error', () => {
    render(
      <MemoryRouter>
        <ModalMessage handleClose={() => {}} hasError={false} message={'testMessage'} open={true} />
      </MemoryRouter>,
    );

    const noErrorText = screen.getByText('congratulations');
    expect(noErrorText).toBeInTheDocument();
  });
  it('should render error', () => {
    render(
      <MemoryRouter>
        <ModalMessage handleClose={() => {}} hasError={true} message={'testMessage'} open={true} />
      </MemoryRouter>,
    );

    const noErrorText = screen.getByText('Error');
    expect(noErrorText).toBeInTheDocument();
  });
});
