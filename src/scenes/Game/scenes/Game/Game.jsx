import React from 'react';
import { MainLayoutComponent, Carousel } from '../../../../components';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import logo from '../../../../assets/logo.png';
import fond from '../../../../assets/fond.jpg';
import _ from 'lodash';

class Game extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.iframeRef = React.createRef();
  }

  sendTokenToGame = (event) => {
    const { account } = this.props.accountDetail;
    const baseUrl = account.isJtiTradeEnv
      ? 'https://jti-trade-game.objow.com/'
      : 'https://jti-game.objow.com/';
    const event_type = event.data.type;

    switch (event_type) {
      case 'objow_jti_token_response':
        this.iframeRef.current.contentWindow.postMessage(
          { type: 'objow_jti_token_response', token: event.data.token },
          baseUrl
        );
        console.log('Token response : ', event.data.token);
      default:
        break;
    }
  };

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle('');
    this.props.handleMaxWidth('sm');
    window.addEventListener('message', this.sendTokenToGame);
  }

  render() {
    const { account } = this.props.accountDetail;
    const { configs } = this.props.configList;
    const baseUrl = account.isJtiTradeEnv
      ? 'https://jti-trade-game.objow.com/'
      : 'https://jti-game.objow.com/';

    const params = new URLSearchParams(window.location.search);
    const page = params.get('page', '') || '';

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
      <>
        <iframe
          src={`${baseUrl}${page}`}
          ref={this.iframeRef}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '10000',
          }}
        />
      </>
    );
  }
}

const mapStateToProps = ({ accountDetail, configList }) => ({
  accountDetail,
  configList,
});

export default connect(mapStateToProps)(withRouter(injectIntl(Game)));
