import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import { SubHeader } from './components';
import { DataTable, IconButton, Loader } from '../../../../components';
import { injectIntl } from 'react-intl';
import { CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const styles = {
  icon: {
    height: 34,
    width: 34,
  },
};

class AdminCategoryList extends Component {
  state = { isActive: true };

  onAdd() {
    this.props.history.push(`/admin/categories/creation`);
  }

  loadData() {
    if (this.state.isActive) {
      this.props.categoryListActions.getActiveCategoryList();
    } else {
      this.props.categoryListActions.getInactiveCategoryList();
    }
  }

  onChange(isActive) {
    this.setState(
      {
        ...this.state,
        isActive: isActive,
      },
      () => {
        this.loadData();
      }
    );
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <SubHeader onChange={this.onChange.bind(this)} />
    );
    this.props.handleButtons(
      <IconButton size='small' onClick={this.onAdd.bind(this)}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>
    );
    this.props.handleMaxWidth('sm');
    this.props.activateReturn();
    this.loadData();
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { classes } = this.props;
    const { categories } = this.props.categoryList;
    const columns = [
      { name: 'id', options: { display: false, filter: false } },
      {
        name: 'icon',
        label: intl.formatMessage({ id: 'admin.categories.columns.icon' }),
        options: {
          customBodyRender: (value) => {
            return <CardMedia image={value.path} className={classes.icon} />;
          },
          filter: false,
        },
      },
      {
        name: 'name',
        label: intl.formatMessage({ id: 'admin.categories.columns.name' }),
      },
    ];
    const options = {
      selectableRows: 'none',
      onRowClick: (colData, cellMeta) => {
        this.props.history.push(`/admin/categories/modification/${colData[0]}`);
      },
    };
    return <DataTable data={categories} columns={columns} options={options} />;
  }

  render() {
    const { categories, loading } = this.props.categoryList;
    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && categories && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ categoryList }) => ({
  categoryList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(AdminCategoryList)));
