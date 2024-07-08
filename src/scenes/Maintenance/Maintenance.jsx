import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Logo } from './components';

class Maintenance extends Component {
  render() {
    const logoData = require('../../assets/logo.png');

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Logo image={logoData} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="center"
              style={{
                color: 'white',
                fontSize: 18,
                textTransform: 'uppercase',
              }}
            >
              Application en maintenance
            </Typography>
            <Typography
              align="center"
              style={{
                color: 'white',
                fontSize: 13,
                textTransform: 'uppercase',
              }}
            >
              Revenez ultérieurement
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Maintenance;
