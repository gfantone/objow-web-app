import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { MainLayoutComponent, Carousel } from '../../../../components';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { withWidth, isWidthUp } from '@material-ui/core';

import AppTourContent from './components/AppTourContent';
import collaboratorData from '../../../../data/api/endpoints/collaboratorData';
import { toast } from 'react-toastify';
import _ from 'lodash';

class AppTour extends MainLayoutComponent {
  componentDidMount() {
    const { intl, width } = this.props;

    const isDesktop = isWidthUp('md', width);
    this.props.handleTitle(intl.formatMessage({ id: 'apptour.title' }));
    this.props.handleMaxWidth(isDesktop ? 'sm' : false);
  }

  updateResult = () => {
    collaboratorData
      .addResult({
        kpi_code: 'K-135',
        value: 1,
      })
      .then(() => {
        toast.success(
          'Félicitations ! Vous avez remporté le défi "Découverte de l\'application"'
        );
      });
  };

  render() {
    const { account } = this.props.accountDetail;
    const { configs } = this.props.configList;
    const { width } = this.props;
    const isDesktop = isWidthUp('md', width);

    const allowJtiGame =
      configs &&
      _.get(
        configs.find((c) => c.code === 'JTIG'),
        'value'
      ) === 'true';

    if (!account.isJtiEnv || !allowJtiGame || account.isTestAccount) {
      return <Redirect to={'/'} />;
    }
    return (
      <div>
        <ReactPlayer
          width='100%'
          style={{}}
          url={'https://jti.objow.io/media/apptour.mp4'}
          playing={true}
          controls={true}
          onError={(e) => console.log('onError', e)}
          onEnded={() => this.updateResult()}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
              },
            },
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ accountDetail, configList }) => ({
  accountDetail,
  configList,
});

export default connect(mapStateToProps)(
  withWidth()(withRouter(injectIntl(AppTour)))
);
