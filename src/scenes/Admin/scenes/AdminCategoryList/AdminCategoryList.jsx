import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import {SubHeader} from './components'
import {DataTable, IconButton, Loader} from '../../../../components'
import {CardMedia} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles({
    icon: {
        height: 34,
        width: 34
    }
});

var initialized = false;

const AdminCategoryList = ({...props}) => {
    const classes = useStyles();
    const [isActive, setIsActive] = React.useState(true);
    const {categories, loading} = props.categoryList;

    const onAdd = () => {
        initialized = false;
        props.history.push(`/admin/categories/creation`)
    };

    const onChange = (isActive) => {
        initialized = false;
        setIsActive(isActive)
    };

    const init = () => {
        if (!initialized) {
            initialized = true;
            props.handleTitle('Administration');
            props.handleSubHeader(<SubHeader onChange={onChange} />);
            props.handleButtons(<IconButton size='small' onClick={onAdd}><FontAwesomeIcon icon={faPlus} /></IconButton>);
            props.handleMaxWidth('sm');
            props.activateReturn();
            if (isActive) {
                props.categoryListActions.getActiveCategoryList();
            } else {
                props.categoryListActions.getInactiveCategoryList();
            }
        }
    };

    useEffect(() => {
        init();
    });

    const renderLoader = () => {
        return <Loader centered />
    };

    const renderData = () => {
        const columns = [
            { name: 'id', options: {display: false} },
            { name: 'icon.name', label: 'Icône', options: {
                customBodyRender: value => {
                    const iconData = require(`../../../../assets/img/system/category/icons/${value}.svg`);
                    return <CardMedia image={iconData} className={classes.icon} />
                }
            } },
            { name: 'name', label: 'Nom' },
        ];
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => {
                initialized = false;
                props.history.push(`/admin/categories/modification/${colData[0]}`)
            }
        };
        return <DataTable data={categories} columns={columns} options={options} />
    };

    return (
        <div>
            {loading && renderLoader()}
            {!loading && renderData()}
        </div>
    )
};

const mapStateToProps = ({categoryList}) => ({
    categoryList
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryList)
