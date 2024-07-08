import React, { useState } from 'react';
import { Grid, IconButton, isWidthDown, withWidth } from '@material-ui/core';
import { useIntl } from 'react-intl';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { NavLink } from 'react-router-dom';
import {
  BlueText,
  BoldTitle,
  DefaultTitle,
  Loader,
  Tooltip,
} from '../../Common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const WrapperWidget = ({ title, url, loading, infoIcon, children, width }) => {
  const intl = useIntl();
  const isMobile = isWidthDown('xs', width);

  return (
    <>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{
          paddingTop: 10,
          border: '2px solid #DEE3ED',
          borderRadius: 20,
          backgroundColor: '#fff',
          overflow: 'hidden',
        }}
      >
        {(url || title) && (
          <Grid item xs={12} style={{ padding: '0 10px 0 20px' }}>
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item>
                <Grid container>
                  <Grid item>
                    {title && (
                      <BoldTitle
                        lowercase
                        style={{
                          color: '#555555',
                          fontSize: isMobile ? 25 : 20,
                        }}
                      >
                        {title}
                      </BoldTitle>
                    )}
                  </Grid>
                  <Grid item style={{ marginLeft: 5 }}>
                    {infoIcon && (
                      <Tooltip title={infoIcon}>
                        <BlueText>
                          <FontAwesomeIcon icon={faInfoCircle} />
                        </BlueText>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                {url && (
                  <NavLink to={url} style={{ textDecoration: 'none' }}>
                    <DefaultTitle
                      lowercase
                      style={{ color: 'rgb(15,111,222)' }}
                    >
                      <Grid container alignItems='center'>
                        <Grid item style={{ fontSize: 18 }}>
                          {intl.formatMessage({ id: 'common.see_more' })}
                        </Grid>

                        <Grid item>
                          <ChevronRightRoundedIcon
                            style={{
                              marginBottom: -8,
                              fontSize: 28,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </DefaultTitle>
                  </NavLink>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          {loading && (
            <div
              style={{
                minHeight: 300,
                minWidth: 100,
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              <Loader centered />
            </div>
          )}
          {!loading && children}
        </Grid>
      </Grid>
    </>
  );
};

export default withWidth()(WrapperWidget);
