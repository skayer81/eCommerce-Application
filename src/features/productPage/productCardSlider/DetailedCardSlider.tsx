import { MouseEventHandler, useState } from 'react';

import { Info } from '@mui/icons-material';
import { Container, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';

import './DetailedCardSlider.css';
import 'keen-slider/keen-slider.min.css';

type Props = {
  imgList: Array<string>;
  name: string;
};

export default function DetailedCardSlider({ imgList, name }: Props): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <Container>
      <div className="navigation-wrapper">
        <div className="keen-slider" ref={sliderRef}>
          {imgList.map((item, index) => (
            <ImageListItem className="keen-slider__slide" key={item}>
              <img
                alt={`${name}${index + 1}`}
                loading="lazy"
                src={`${item}?w=248&fit=crop&auto=format`}
                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
              />
              <ImageListItemBar
                actionIcon={
                  <IconButton aria-label={`full size`} sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                    <Info />
                  </IconButton>
                }
                subtitle={`image ${index + 1}`}
                title={name}
              />
            </ImageListItem>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              disabled={currentSlide === 0}
              left
              onClick={() =>
                //  e.stopPropagation() ||
                instanceRef.current?.prev()
              }
            />
            <Arrow
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
              onClick={() =>
                //e.stopPropagation() ||
                instanceRef.current?.next()
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
            return (
              <button
                className={'dot' + (currentSlide === idx ? ' active' : '')}
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
              ></button>
            );
          })}
        </div>
      )}
    </Container>
  );
}

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: MouseEventHandler;
}): JSX.Element {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabled}`}
      onClick={props.onClick}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
}
