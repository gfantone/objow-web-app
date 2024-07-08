import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { DefaultText, Loader } from '../../../../../../components';

const styles = {
  root: {
    padding: 16,
  },
};

const SubHeader = ({ ...props }) => {
  const { classes } = props;
  const { definition, loading: goalDefinitionDetailLoading } =
    props.goalDefinitionDetail;
  const { loading: goalDefinitionLevelListLoading } =
    props.goalDefinitionLevelList;
  const loading = goalDefinitionDetailLoading || goalDefinitionLevelListLoading;

  const renderLoder = () => {
    return <Loader centered />;
  };

  const renderData = () => {
    return (
      <DefaultText align="center">{`Paliers de l'objectif « ${definition.name} »`}</DefaultText>
    );
  };

  return (
    <div className={classes.root}>
      {loading && renderLoder()}
      {!loading && definition && renderData()}
    </div>
  );
};

const mapStateToProps = ({
  goalDefinitionDetail,
  goalDefinitionLevelList,
}) => ({
  goalDefinitionDetail,
  goalDefinitionLevelList,
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader));
