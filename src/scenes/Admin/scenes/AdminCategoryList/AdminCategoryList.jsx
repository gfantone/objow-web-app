import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'

const AdminCategoryList = ({...props}) => {
    const [isActive, setIsActive] = React.useState(true);

    useEffect(() => {
        const joris = 1
    });

    return (
        <div></div>
    )
};

const mapStateToProps = ({categoryList}) => ({
    categoryList
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryList)
