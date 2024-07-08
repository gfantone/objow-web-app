import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { Partner } from './components';
import {
  AppBarSubTitle,
  GridLink,
  Loader,
  MainLayoutComponent,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as partnerListActions from '../../../../services/Partners/PartnerList/actions';

class AdminPartnerList extends MainLayoutComponent {
  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.partner_list_subtitle' })}
      />,
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.partnerListActions.getPartnerList();
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { partners } = this.props.partnerList;

    return (
      <div>
        <Grid container>
          {partners.map((partner) => {
            const link = `/admin/partners/${partner.id}`;

            return (
              <GridLink key={partner.id} item component={Link} to={link}>
                <Partner partner={partner} />
              </GridLink>
            );
          })}
        </Grid>
      </div>
    );
  }

  render() {
    const { partners, loading } = this.props.partnerList;

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && partners && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ partnerList }) => ({
  partnerList,
});

const mapDispatchToProps = (dispatch) => ({
  partnerListActions: bindActionCreators(partnerListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AdminPartnerList));
