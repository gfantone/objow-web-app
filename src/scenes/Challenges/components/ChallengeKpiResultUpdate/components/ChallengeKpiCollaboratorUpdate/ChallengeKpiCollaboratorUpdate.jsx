import React, { useState, useRef, useEffect } from 'react';
import Formsy from 'formsy-react';
import {
  Spreadsheet,
  Loader,
  DefaultTitle,
  DefaultText,
  ProgressButton,
  Button,
  Avatar,
  TextField,
  InfoText,
  HiddenInput,
  DatePicker,
} from '../../../../../../components';
import { CollaboratorInputSpreadsheet, CollaboratorInputCreateForm } from '../';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { useIntl, injectIntl } from 'react-intl';
import {
  Grid,
  IconButton,
  withWidth,
  isWidthUp,
  CardMedia,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as collaboratorInputCreationActions from '../../../../../../services/CollaboratorInput/CollaboratorInputCreation/actions';
import _ from 'lodash';

const styles = {
  spreadsheet: {
    paddingLeft: 0,
    width: '100%',
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
  customImageInput: {
    display: 'none',
  },
  customImage: {
    height: '100%',
    backgroundColor: '#f7f8fc',
    cursor: 'pointer',
    opacity: 0.75,
    '&:hover': {
      opacity: 1,
    },
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'top',
  },
  link: {
    fontSize: 16,
    cursor: 'pointer',
    color: 'rgb(15,111,222)',
    opacity: 1,
  },
};

const ChallengeKpiCollaboratorUpdate = ({
  data: dataList,
  input,
  width,
  classes,
  close,
  filterDate,
  filterData,
  minDate,
  maxDate,
  kpi,
  image,
  filterInputList,
  ...props
}) => {
  const intl = useIntl();
  const [page, setPage] = useState(input && input.length > 0 ? 0 : 1);
  // default collaborator data
  let data = dataList && dataList.length > 0 ? dataList[0] : null;
  // filter data list by date
  if (dataList) {
    if (dataList.length > 1) {
      data = dataList.filter((d) => {
        const collaboratorDataDate = new Date(parseInt(d.dataStart) * 1000);
        const filterDateDate = new Date(filterDate);
        collaboratorDataDate.setHours(0, 0, 0, 0);
        filterDateDate.setHours(0, 0, 0, 0);
        return collaboratorDataDate >= filterDateDate;
      })[0];
    }
  }

  return (
    <div style={{ maxWidth: !image && page === 1 ? 600 : '100%' }}>
      <Grid item xs={12} style={{ width: 'calc(100% - 15px)' }}>
        {page === 0 && (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DefaultTitle style={{ textTransform: 'none', fontSize: 18 }}>
                {`${intl.formatMessage({
                  id: 'challenge.kpi_results.collaborator_title',
                })} : `}
                <span style={{ fontWeight: 'bold' }}>{_.get(kpi, 'name')}</span>
              </DefaultTitle>
            </Grid>
            <Grid item xs={12}>
              <DefaultText
                style={{ textTransform: 'none', fontSize: 14, opacity: 0.8 }}
              >
                {intl.formatMessage({ id: 'challenge.kpi_results.subtitle' })}
              </DefaultText>
            </Grid>
          </Grid>
        )}
        {page === 1 && (
          <Grid
            container
            spacing={1}
            style={{ maxWidth: image ? 'auto' : 600 }}
          >
            <Grid item xs={12}>
              <DefaultTitle
                style={{ textTransform: 'none', fontSize: 18, width: '50%' }}
              >
                {`${intl.formatMessage({
                  id: 'challenge.kpi_results.collaborator_new_title',
                })} : `}
                <span style={{ fontWeight: 'bold' }}>{_.get(kpi, 'name')}</span>
              </DefaultTitle>
              <Grid item xs={12}>
                <DefaultText
                  style={{ textTransform: 'none', fontSize: 14, opacity: 0.8 }}
                >
                  {intl.formatMessage({ id: 'challenge.kpi_results.subtitle' })}
                </DefaultText>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: 5 }}>
        {page === 1 && input && input.length > 0 && (
          <Grid item onClick={() => setPage(0)} className={classes.link}>
            <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: 5 }} />
            {intl.formatMessage({ id: 'challenge.kpi_results.back_button' })}
          </Grid>
        )}
        {page === 0 && (
          <Grid item>
            <Button onClick={() => setPage(1)}>
              {intl.formatMessage({ id: 'challenge.kpi_results.add_data' })}
            </Button>
          </Grid>
        )}
      </Grid>
      {page === 0 && (
        <CollaboratorInputSpreadsheet
          data={input}
          close={close}
          filterInputList={filterInputList}
          isReadOnly={!_.get(kpi, 'custom')}
          hideFilters
        />
      )}
      {page === 1 && (
        <CollaboratorInputCreateForm
          data={data}
          kpi={kpi}
          filterDate={filterDate}
          filterData={filterData}
          minDate={minDate}
          maxDate={maxDate}
          onSuccess={() => {
            toast.success(
              intl.formatMessage({ id: 'common.update_success_message' })
            );
            close();
          }}
          onError={() => {
            props.collaboratorInputCreationActions.clearCollaboratorInputCreation();
            toast.error(
              intl.formatMessage({ id: 'common.update_error_message' })
            );
          }}
          image={image}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ collaboratorInputCreation }) => ({
  collaboratorInputCreation,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorInputCreationActions: bindActionCreators(
    collaboratorInputCreationActions,
    dispatch
  ),
});

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ChallengeKpiCollaboratorUpdate))
);
