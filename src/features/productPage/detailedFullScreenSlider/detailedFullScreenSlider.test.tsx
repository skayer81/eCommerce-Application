import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DetailedFullScreenSlider from './detailedFullScreenSlider';

const props = {
  imgList: ['urlimg1'],
  name: 'TestName',
  setIsFullScreen: () => null,
  setSlideNumber: () => {},
  firstSlideNumber: 0,
};

describe('DetailedFullScreenSlider', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <DetailedFullScreenSlider {...props} />
      </MemoryRouter>,
    );
    const renderText = screen.getByText('TestName');
    expect(renderText).toBeInTheDocument();
  });
});
