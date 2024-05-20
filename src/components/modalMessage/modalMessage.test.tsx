import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ModalMessage from './modalMessage';

interface Props {
  handleClose: () => void;
  hasError: boolean;
  message: string;
  open: boolean;
}

describe('ModalMessage Component', () => {
  const defaultProps: Props = {
    message: 'This is a test message',
    handleClose: () => {},
    open: true,
    hasError: false,
  };

  it('renders the modal with a success message', () => {
    render(<ModalMessage {...defaultProps} />);
    expect(screen.getByText('congratulations')).toBeInTheDocument();
    expect(screen.getByText('This is a test message')).toBeInTheDocument();
  });

  it('renders the modal with an error message', () => {
    render(<ModalMessage {...defaultProps} hasError={true} />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('This is a test message click to continue')).toBeInTheDocument();
  });

  it('does not render the modal when open is false', () => {
    render(<ModalMessage {...defaultProps} open={false} />);
    expect(screen.queryByText('congratulations')).not.toBeInTheDocument();
    expect(screen.queryByText('Error')).not.toBeInTheDocument();
  });
});
