import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Card } from '@material-ui/core';
import { DefaultTitle, Select } from '../../../../../../components';
import * as configListActions from '../../../../../../services/Configs/ConfigList/actions';
import { useIntl } from 'react-intl';
import '../../../../../../style.css';

const FontSettings = ({ configList }) => {
  const [selectedFont, setSelectedFont] = useState('');
  const intl = useIntl();
  const { configs } = configList;
  const CFF = configs.filter((c) => c.code == 'CFF')[0];
  const fontOptions = [
    { value: 'Nunito Sans', text: 'Nunito Sans' },
    { value: 'VOXBoldItalic', text: 'VOXBoldItalic' },
  ];

  const handleFontChange = () => {
    setSelectedFont(selectedFont);
  };

  return (
    <>
      <Grid item>
        <DefaultTitle isContrast>
          {intl.formatMessage({ id: 'admin.logo.font_family.title' })}
        </DefaultTitle>
      </Grid>
      <Card>
        <Grid container spacing={2} justifyContent='space-around'>
          <Grid item xs={12} style={{ margin: 5 }}>
            <Select
              emptyDisabled
              name={CFF.id}
              label={intl.formatMessage({
                id: 'admin.logo.font_family.fonts_select',
              })}
              options={fontOptions}
              initial={CFF.value}
              optionValueName='value'
              optionTextName='text'
              fullWidth
              onChange={handleFontChange}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

const mapStateToProps = ({ configList, configListUpdate }) => ({
  configList,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FontSettings);
