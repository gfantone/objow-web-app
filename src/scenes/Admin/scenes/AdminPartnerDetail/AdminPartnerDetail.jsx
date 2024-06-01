import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardMedia, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { AircallForm } from './components';
import {
  AppBarSubTitle,
  DefaultTitle,
  InfoText,
  Loader,
  MainLayoutComponent,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions';
import * as kpiListUpdateActions from '../../../../services/Kpis/KpiListUpdate/actions';
import * as partnerDetailActions from '../../../../services/Partners/PartnerDetail/actions';

const styles = {
  logo: {
    height: 150,
    width: 150,
  },
};

class AdminPartnerDetail extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    const id = this.props.match.params.id;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.partner_detail_subtitle' })}
      />,
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.kpiListActions.getKpiListByPartner(id);
    this.props.partnerDetailActions.getPartner(id);
    this.props.kpiListUpdateActions.clearKpiListUpdate();
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderEmptyConnection() {
    const { intl } = this.props;
    return (
      <InfoText>
        {intl.formatMessage({ id: 'admin.partner_detail_empty_connection' })}
      </InfoText>
    );
  }

  handleUpdate(kpis) {
    this.props.kpiListUpdateActions.updateKpiList(kpis);
  }

  renderData() {
    const { classes } = this.props;
    const { kpis } = this.props.kpiList;
    const { partner } = this.props.partnerDetail;
    const { loading } = this.props.kpiListUpdate;

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item>
            <CardMedia image={partner.logo} className={classes.logo} />
          </Grid>
          <Grid item xs>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DefaultTitle>{partner.name}</DefaultTitle>
                <InfoText>{partner.description}</InfoText>
              </Grid>
              <Grid item xs={12}>
                {!partner.hasToken && this.renderEmptyConnection()}
                {partner.hasToken && partner.code === 'AC' && (
                  <AircallForm
                    kpis={kpis}
                    updating={loading}
                    onUpdate={this.handleUpdate.bind(this)}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    const { kpis, loading: kpiListLoading } = this.props.kpiList;
    const { partner, loading: partnerDetailLoading } = this.props.partnerDetail;
    const { success } = this.props.kpiListUpdate;
    const loading = kpiListLoading || partnerDetailLoading;

    if (success) {
      this.props.kpiListUpdateActions.clearKpiListUpdate();
      this.props.history.goBack();
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && kpis && partner && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ kpiList, kpiListUpdate, partnerDetail }) => ({
  kpiList,
  kpiListUpdate,
  partnerDetail,
});

const mapDispatchToProps = (dispatch) => ({
  kpiListActions: bindActionCreators(kpiListActions, dispatch),
  kpiListUpdateActions: bindActionCreators(kpiListUpdateActions, dispatch),
  partnerDetailActions: bindActionCreators(partnerDetailActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(injectIntl(AdminPartnerDetail)));
