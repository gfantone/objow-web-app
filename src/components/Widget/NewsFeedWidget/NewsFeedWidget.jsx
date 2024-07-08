import React, { useEffect, useState } from 'react';
import { WrapperWidget } from '../../Widget/WrapperWidget';
import { useIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import NewsFeedContent from '../../Common/components/NewsFeed/components/NewsFeedContent/NewsFeedContent';

const styles = {
  scrollWrapper: {
    overflowY: 'overlay',

    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(199, 199, 199, 0)',
      borderRadius: 5,
    },

    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0)',
    },
    '&::-webkit-scrollbar': {
      '-webkit-appearance': 'none',
      '&:vertical': {
        width: 10,
      },
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(199, 199, 199, 1)',
        borderRadius: 5,
      },
    },
  },
};

const NewsFeedWidget = ({ classes }) => {
  const intl = useIntl();
  const [notDesktop, setNotDesktop] = useState(window.innerWidth < 1280);

  const handleResize = () => {
    setNotDesktop(window.innerWidth < 1280);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <WrapperWidget
      title={intl.formatMessage({ id: 'newsfeed.title' })}
      url='/newsfeed'
    >
      <div
        className={notDesktop ? '' : classes.scrollWrapper}
        style={{
          maxHeight: notDesktop ? '350px' : '650px',
          overflowX: 'hidden',
          overflowY: 'overlay',
          paddingBottom: 15,
          borderRadius: 20,
          minHeight: 300,
        }}
      >
        <NewsFeedContent smallPages />
      </div>
    </WrapperWidget>
  );
};

export default withStyles(styles)(NewsFeedWidget);
