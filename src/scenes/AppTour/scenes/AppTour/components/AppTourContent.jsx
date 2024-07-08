import React, { useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import { withWidth, isWidthUp } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import apptour1 from '../../../../../assets/img/jti/apptour1.png';
import apptour2 from '../../../../../assets/img/jti/apptour2.png';
import apptour3 from '../../../../../assets/img/jti/apptour3.png';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { I18nWrapper } from '../../../../../components';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActivityListAdmin from '../../../../../components/Widget/ActivityWidget/components/ActivityListAdmin/ActivityListAdmin';

const styles = (theme) => {
  return {
    controls: {
      position: 'fixed',
      bottom: -1,
      left: 0,
      width: '100%',

      color: 'white',
      fontSize: 18,
      height: 50,
      paddingLeft: 10,
      paddingRight: 10,
      background: `${theme.palette.secondary.main}`,
    },
  };
};

const AppTourContent = ({ classes, width }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const isDesktop = isWidthUp('md', width);

  const slides = [
    <img src={apptour1} style={{ width: '100%' }} />,
    <img src={apptour2} style={{ width: '100%' }} />,
    <img src={apptour3} style={{ width: '100%' }} />,
  ];
  return (
    <Grid container>
      <Grid item xs={12}>
        <SwipeableViews index={activeSlide} onChangeIndex={setActiveSlide}>
          {slides}
        </SwipeableViews>
      </Grid>
      <div
        className={classes.controls}
        style={{
          width: isDesktop ? '550px' : '100%',
          left: isDesktop ? 'calc(50% - 123px)' : 0,
        }}
      >
        <Grid
          container
          alignItems='center'
          justifyContent='center'
          style={{ height: '100%' }}
        >
          <Grid
            item
            onClick={() => activeSlide > 0 && setActiveSlide(activeSlide - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Grid>
          <Grid item xs style={{ textAlign: 'center' }}>
            {activeSlide + 1} / {slides.length}
          </Grid>
          <Grid
            item
            onClick={() =>
              activeSlide < slides.length - 1 && setActiveSlide(activeSlide + 1)
            }
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default injectIntl(withStyles(styles)(withWidth()(AppTourContent)));
