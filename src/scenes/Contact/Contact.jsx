import React, { useState, useEffect } from 'react';
import { Grid, isWidthUp, withWidth } from '@material-ui/core';
import { EvolutionRequest, IncidentReporting } from './components';
import { Card, DefaultTitle, Select } from '../../components';
import * as Resources from '../../Resources';
import { useIntl, injectIntl } from 'react-intl';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Formsy from 'formsy-react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const RulesIframe = ({ ...props }) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLg = isWidthUp('lg', props.width);
  const isMd = isWidthUp('md', props.width);
  const isSm = isWidthUp('sm', props.width);
  const isXs = isWidthUp('xs', props.width);
  let marginLeft = -20;
  let width = '100vw';
  const marginTop = -20;

  if (isLg) {
    marginLeft = `-${(windowDimensions.width - 304 - 915) / 2}px`;
    width = `${windowDimensions.width - 304}px`;
  } else if (isMd) {
    marginLeft = `-${(windowDimensions.width - 915) / 2}px`;
    width = '100vw';
  } else if (isSm) {
    marginLeft = -20;
    width = '100vw';
  } else if (isXs) {
    marginLeft = 0;
    width = '95vw';
  }
  return (
    <iframe
      src='https://www.objow.com/help-portail-1'
      style={{
        width: `calc(${width} - 6px)`,
        height: 'calc(100vh - 80px)',
        marginTop,
        marginLeft,
      }}
      frameBorder='0'
    />
  );
};

const Contact = ({ ...props }) => {
  const [redirect, setRedirect] = useState(false);
  const intl = useIntl();
  const { account } = props.accountDetail;

  const [selectedType, setSelectedType] = React.useState(null);

  useEffect(() => {
    props.clear();
    props.handleTitle(intl.formatMessage({ id: 'contact.title' }));
    props.handleMaxWidth('md');
    if (!account.hasHelpAccess) {
      setRedirect(true);
    }
  });

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  const iframeUrl = 'https://www.objow.com/help-portail-1';
  const Rules = withWidth()(RulesIframe);

  // <div>
  //   <Grid container spacing={4}>
  //     <Grid item xs={12}>
  //       <div>
  //         <Grid container spacing={1}>
  //           <Grid item xs={12}>
  //             <DefaultTitle>{intl.formatMessage({id: "contact.question"})}</DefaultTitle>
  //           </Grid>
  //           <Grid item xs={12}>
  //             <Card>
  //               <Formsy>
  //                 <Select name='type' label={intl.formatMessage({id: "contact.form_type_label"})} options={types} optionValueName='id' optionTextName='text' onChange={handleTypeChange} fullWidth />
  //               </Formsy>
  //             </Card>
  //           </Grid>
  //         </Grid>
  //       </div>
  //     </Grid>
  //     <Grid item xs={12}>
  //       { selectedType == 1 && <EvolutionRequest /> }
  //       { selectedType == 2 && <IncidentReporting /> }
  //     </Grid>
  //   </Grid>
  // </div>
  if (redirect) {
    return <Redirect to={'/'} />;
  }

  return (
    <div>
      <Rules />
    </div>
  );
};

const mapStateToProps = ({ accountDetail }) => ({
  accountDetail,
});

export default connect(mapStateToProps)(withRouter(injectIntl(Contact)));
