import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DetailedCardSlider from './DetailedCardSlider';

const props = {
  imgList: ['urlimg1'],
  name: 'TestName',
  setIsFullScreen: () => null,
  setSlideNumber: () => {},
};

describe('DetailedCardSlider', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <DetailedCardSlider {...props} />
      </MemoryRouter>,
    );
    const renderText = screen.getByText('TestName');
    expect(renderText).toBeInTheDocument();
  });
});
