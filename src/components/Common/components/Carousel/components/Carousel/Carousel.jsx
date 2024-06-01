/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Box } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { CarouselDots } from '../CarouselDots';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { EmptyState } from '../../../EmptyState';
import _ from 'lodash';

const MAX_SLIDES = 10;
const MAX_DOTS = 10;
const Carousel = ({ slides, classes }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(
      (prevStep) => (prevStep + 1) % Math.min(MAX_SLIDES, slides.length)
    );
  };
  const handleBack = () => {
    setActiveStep(
      (prevStep) =>
        (prevStep - 1 + Math.min(MAX_SLIDES, slides.length)) %
        Math.min(MAX_SLIDES, slides.length)
    );
  };
  const handleDotChange = (index) => {
    setActiveStep(index);
  };

  const limitedSlides = slides.slice(0, MAX_SLIDES);
  const limitedDots = Math.min(MAX_DOTS, limitedSlides.length);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', position: 'relative' }}>
      {_.isEmpty(limitedSlides) ? (
        <div
          style={{
            width: '80%',
            margin: 'auto',
            maxHeight: 270,
            overflow: 'hidden',
            paddingBottom: 20,
          }}
        >
          <EmptyState />
        </div>
      ) : (
        <div>
          <SwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
            {limitedSlides}
          </SwipeableViews>
          <CarouselDots
            totalSlides={limitedDots}
            activeStep={activeStep}
            onChange={handleDotChange}
            sx={{ cursor: 'pointer' }}
          />
        </div>
      )}
    </Box>
  );
};

export default Carousel;
