import { MouseEventHandler, useState } from 'react';

import { Info } from '@mui/icons-material';
import { Container, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';

import './detailedFullScreenSlider.css';
import 'keen-slider/keen-slider.min.css';

type Props = {
  firstSlideNumber: number;
  imgList: Array<string>;
  name: string;
  setIsFullScreen: (f: boolean) => void;
};

export default function DetailedFullScreenSlider({
  imgList,
  name,
  setIsFullScreen,
  firstSlideNumber,
}: Props): JSX.Element {
  const [currentSlide, setCurrentSlide] = useState(firstSlideNumber);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: firstSlideNumber,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="full-screen">
      <Container className="navigation-wrapper">
        {/* <Button onClick={()=>{setIsFullScreen(false)}}>XXXXXXXXXXXXXX</Button> */}
        <div className="keen-slider" ref={sliderRef}>
          {imgList.map((item, index) => (
            <ImageListItem
              className="keen-slider__slide"
              key={item}
              onClick={() => {
                setIsFullScreen(false);
              }}
              sx={{
                maxHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <img
                alt={`${name}${index + 1}`}
                className="image-item"
                loading="lazy"
                src={`${item}?w=248&fit=crop&auto=format`}
                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                style={{ width: '100wh' }}
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
      </Container>
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
    </div>
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
