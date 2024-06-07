import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import DetailedCard from './DetailedCard';

const setIsFullScreen = (): void => {};
const setFullScreenSlideNumber = (): void => {};
const data = {
  description: 'testDescription',
  imgList: [''],
  name: '',
  listOfAtributes: [],
  price: 0,
  discount: 0,
};

describe('DetailedCard', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <DetailedCard
          productProps={data}
          setIsFullScreen={setIsFullScreen}
          setSlideNumber={setFullScreenSlideNumber}
        />
      </MemoryRouter>,
    );
    const renderText = screen.getByText('testDescription');
    expect(renderText).toBeInTheDocument();
  });
});
