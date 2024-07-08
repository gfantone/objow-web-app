import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import Formsy from 'formsy-react';
import {
  AppBarSubTitle,
  Card,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  HiddenInput,
  DefaultTitle,
} from '../../../../components';
import * as systemImageUpdateActions from '../../../../services/SystemImages/SystemImageUpdate/actions';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as configListUpdateActions from '../../../../services/Configs/ConfigListUpdate/actions';
import _ from 'lodash';
import { ColorPicker, FontSettings, LogoSettings } from './components';
import { toast } from 'react-toastify';

class AdminLogo extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.props.systemImageUpdateActions.clearSystemImageUpdate();
    this.state = {
      disableAlpha: true,
      initialized: false,
    };
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle title={intl.formatMessage({ id: 'admin.logo.title' })} />
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { configs } = nextProps.configList;

    if (!configs || this.state.initialized) {
      return;
    }

    const CCPH = configs.filter((c) => c.code == 'CCPH')[0];
    const CCSH = configs.filter((c) => c.code == 'CCSH')[0];
    const CCBH = configs.filter((c) => c.code == 'CCBH')[0];
    const CFF = configs.filter((c) => c.code == 'CFF')[0];

    this.setState({
      hexPrimary: CCPH.value ? CCPH.value : this.state.hexPrimary,
      hexSecondary: CCSH.value ? CCSH.value : this.state.hexSecondary,
      hexBackground: CCBH.value ? CCBH.value : this.state.hexBackground,
      initialized: true,
      selectedFont: CFF.value ? CFF.value : this.state.selectedFont,
    });
  }

  handleSubmit = (model) => {
    if (model.logo) {
      const image = new FormData();
      image.append('code', 'LOGO');
      image.append('src', model.logo);
      this.props.systemImageUpdateActions.updateSystemImage('LOGO', image);
    }
    const { logo, ...colorsAndFontModel } = model;
    this.handleSubmitColorAndFont(colorsAndFontModel);
  };

  handleColorPickerInitialization = (name, initialHex) => {
    this.setState((prevState) => ({
      [name]: prevState[name] ? prevState[name] : initialHex,
      initialized: true,
    }));
  };

  handleSubmitColorAndFont = (model) => {
    const configs = Object.entries(model).map(([id, value]) => ({ id, value }));

    this.props.configListUpdateActions.updateConfigList(configs);
  };

  renderLoader() {
    return <Loader centered />;
  }

  handleResetColors = () => {
    const initialColors = [
      { code: 'CCPH', value: '#06e094' },
      { code: 'CCSH', value: '#05192c' },
      { code: 'CCBH', value: '#f7f8fc' },
    ];
    this.props.configListUpdateActions.updateConfigList(initialColors);
    this.setState({
      hexPrimary: '#06e094',
      hexSecondary: '#05192c',
      hexBackground: '#f7f8fc',
    });
  };

  renderDataColor() {
    const { intl } = this.props;
    const { configs } = this.props.configList;

    const CCPH = configs.filter((c) => c.code == 'CCPH')[0];
    const CCSH = configs.filter((c) => c.code == 'CCSH')[0];
    const CCBH = configs.filter((c) => c.code == 'CCBH')[0];

    return (
      <>
        {this.state.hexPrimary && (
          <>
            <Grid item>
              <DefaultTitle isContrast>
                {intl.formatMessage({ id: 'admin.logo.colors' })}
              </DefaultTitle>
            </Grid>
            <Card>
              <Grid container spacing={2} justifyContent='space-around'>
                <Grid item>
                  <DefaultTitle lowercase>
                    {intl.formatMessage({ id: 'admin.logo.primary_color' })}
                  </DefaultTitle>
                  <ColorPicker
                    initialHex={this.state.hexPrimary}
                    name={CCPH.id}
                    onChange={(color) => {
                      this.setState({ hexPrimary: color });
                    }}
                  />
                  <HiddenInput name={CCPH.id} value={this.state.hexPrimary} />
                </Grid>
                <Grid item>
                  <DefaultTitle lowercase>
                    {intl.formatMessage({ id: 'admin.logo.secondary_color' })}
                  </DefaultTitle>
                  <ColorPicker
                    initialHex={this.state.hexSecondary}
                    name={CCSH.id}
                    onChange={(color) => {
                      this.setState({ hexSecondary: color });
                    }}
                  />
                  <HiddenInput name={CCSH.id} value={this.state.hexSecondary} />
                </Grid>
                <Grid item>
                  <DefaultTitle lowercase>
                    {intl.formatMessage({ id: 'admin.logo.background_color' })}
                  </DefaultTitle>
                  <ColorPicker
                    initialHex={this.state.hexBackground}
                    name={CCBH.id}
                    onChange={(color) => {
                      this.setState({ hexBackground: color });
                    }}
                  />
                  <HiddenInput
                    name={CCBH.id}
                    value={this.state.hexBackground}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ProgressButton
                    onClick={this.handleResetColors}
                    text={intl.formatMessage({ id: 'admin.logo.reset_colors' })}
                    color='secondary'
                    centered
                  />
                </Grid>
              </Grid>
            </Card>
          </>
        )}
      </>
    );
  }

  onSuccess = () => {
    if (!this.state.isSuccess) {
      this.setState({
        isSuccess: true,
        ...this.state,
      });
      setTimeout(() => {
        this.props.history.goBack();
      }, 100);
    }
  };
  render() {
    const { intl } = this.props;

    const { success: logoSuccess, loading } = this.props.systemImageUpdate;

    const { success: colorsSuccess } = this.props.configListUpdate;

    const { configs, loading: configLoading } = this.props.configList;

    if (colorsSuccess) {
      toast.success(
        intl.formatMessage({ id: 'admin.logo_and_colors.success_message' })
      );
      this.props.configListUpdateActions.clearConfigListUpdate();
    }

    if (logoSuccess) {
      toast.success(intl.formatMessage({ id: 'admin.logo.success_message' }));
      this.props.systemImageUpdateActions.clearSystemImageUpdate();
    }

    if (colorsSuccess || logoSuccess) {
      this.onSuccess();
    }

    return (
      <>
        <Formsy onSubmit={this.handleSubmit.bind(this)}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <LogoSettings />
            </Grid>
            <Grid item xs={12}>
              {configLoading && this.renderLoader()}
              {!configLoading && configs && this.renderDataColor()}
            </Grid>
            <Grid item xs={12}>
              <FontSettings />
            </Grid>
            <Grid item xs={12}>
              <ProgressButton
                type='submit'
                text={intl.formatMessage({ id: 'common.submit' })}
                centered
                loading={loading}
              />
            </Grid>
          </Grid>
        </Formsy>
      </>
    );
  }
}

const mapStateToProps = ({
  systemImageList,
  systemImageUpdate,
  configList,
  configListUpdate,
}) => ({
  systemImageList,
  systemImageUpdate,
  configList,
  configListUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  systemImageUpdateActions: bindActionCreators(
    systemImageUpdateActions,
    dispatch
  ),
  configListActions: bindActionCreators(configListActions, dispatch),
  configListUpdateActions: bindActionCreators(
    configListUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AdminLogo));
