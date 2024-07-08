import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Card } from '../';

const styles = {
  wrapper: {
    '& .MuiPaper-root': {
      zIndex: 400,
      position: 'relative',
    },
  },
  cardContent: {
    overflow: 'visible',
  },
  button: {
    border: '1px solid #43586C',
    background: '#F3F5FC',
    color: '#43586C',
    fontWeight: 'bold',
    textTransform: 'none',
    padding: '2px 10px',
    borderRadius: 15,
    '&:hover, &.active': {
      background: '#E0E6F7',
      color: '#43586C',
    },
  },
};

const Dropdown = ({
  buttonContent,
  children,
  contentWidth,
  zIndex,
  classes,
  position,
  active,
  open,
  setOpen,
  width,
  disabled,
  ...props
}) => {
  const display = open ? {} : { display: 'none' };
  const positionAttribute =
    position && position == 'right' ? { left: 0 } : { right: 0 };
  const wrapperRef = useRef();

  const [isOpen, setIsOpen] = useState(open);
  const mobileScreen = isWidthDown('xs', width);
  const defaultContentWidth = mobileScreen ? '80vw' : '50vw';

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClickOutside = (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target) &&
      isOpen
    ) {
      setOpen(false);
    }
  };

  document.addEventListener('click', handleClickOutside, true);
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'visible',

        marginBottom: 5,
      }}
      ref={wrapperRef}
    >
      <Button
        variant='outlined'
        onClick={() => setOpen(!open)}
        className={`${classes.button} ${active ? 'active' : ''}`}
        disabled={disabled}
      >
        {buttonContent}
      </Button>
      <div
        style={{
          position: 'absolute',
          ...positionAttribute,
          top: 30,
          ...display,
          zIndex: zIndex || 100,
          width: contentWidth || defaultContentWidth,
          overflow: 'visible',
        }}
        className={classes.wrapper}
      >
        <Card className={classes.cardContent}>
          {open && <React.Fragment>{children}</React.Fragment>}
        </Card>
      </div>
    </div>
  );
};

export default withWidth()(withStyles(styles)(Dropdown));
