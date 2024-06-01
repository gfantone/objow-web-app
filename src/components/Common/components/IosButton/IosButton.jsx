import React from 'react';
import { CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingTop: '30%',
    backgroundSize: 'cover',
    backgroundPosition: 'left',
    cursor: 'pointer',
  },
});

const IosButton = ({ ...props }) => {
  const classes = useStyles();
  const iosData = require('../../../../assets/img/mobile/ios.png');

  return (
    <CardMedia
      className={classes.root}
      image={iosData}
      onClick={() =>
        window.open(
          'https://apps.apple.com/us/app/fire-tiger/id1501018420?l=fr&ls=1',
          '_blank',
        )
      }
    />
  );
};

export default IosButton;
