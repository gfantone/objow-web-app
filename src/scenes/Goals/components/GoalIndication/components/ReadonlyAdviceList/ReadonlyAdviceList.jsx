import React from 'react';
import { Grid } from '@material-ui/core';
import {
  Card,
  DefaultText,
  DefaultTitle,
  InfoText,
  Linkify,
  TableChip,
  RichText,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';

const ReadonlyAdviceList = ({ advices }) => {
  const intl = useIntl();
  const renderData = () => {
    return (
      <div>
        <Grid container spacing={2}>
          {advices.map((advice) => {
            return (
              <Grid key={advice.id} item xs={12}>
                <Grid container spacing={2}>
                  <Grid item>
                    <TableChip label='>' />
                  </Grid>
                  <Grid item xs>
                    <Linkify>
                      <RichText
                        name='instruction'
                        initial={JSON.parse(advice.text)}
                        readOnly={true}
                        noTool
                        onChange={() => {}}
                        fullWidth
                        multiline
                        required
                      />
                    </Linkify>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  };

  const renderEmptyState = () => {
    return (
      <InfoText>
        {intl.formatMessage({
          id: 'admin.goal.indication.coaching_empty_state',
        })}
      </InfoText>
    );
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <DefaultTitle isContrast>
            {intl.formatMessage({ id: 'admin.goal.indication.coaching_area' })}
          </DefaultTitle>
        </Grid>
        <Grid item xs={12}>
          <Card>
            {advices && advices.length > 0 && renderData()}
            {(!advices || advices.length == 0) && renderEmptyState()}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReadonlyAdviceList;
