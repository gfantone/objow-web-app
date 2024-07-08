import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

const styles = {
  form: {
    '& .uploader': {
      border: '1px solid rgb(255, 95, 3)',
      background: '#fff',
    },
    '& .uploader__heading, & .uploader__divider': {
      color: 'rgb(255, 95, 3)',
      fontSize: 28,
      fontWeight: '500',
      fontStyle: 'italic',
    },
    '& a.uploader__button.du-choosebtn, & .uploader__button, & .uploader__button:hover':
      {
        background: 'rgb(255, 95, 3)',
        border: 'none',
        color: '#fff',
        borderRadius: 10,
        fontWeight: '500',
        fontSize: 20,
      },
    '& .uploader__folder.uploader__button.du-choosebtn': {
      display: 'none',
    },
  },
};

const DriveUploader = ({ id, email, classes }) => {
  useScript(`https://driveuploader.com/upload/${id}/embed.js`);

  return (
    <>
      <form method='POST' action='/form-submit/' className={classes.form}>
        <input
          type='hidden'
          name='driveuploader_email'
          id='driveuploader_email'
          value={email}
        />
        <div class='driveuploader-replace' />
      </form>
    </>
  );
};

export default withStyles(styles)(DriveUploader);
