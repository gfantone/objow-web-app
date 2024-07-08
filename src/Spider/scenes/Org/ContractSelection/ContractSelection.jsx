import React, {useCallback, useEffect} from 'react'
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Card, CircularProgress, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import {ContractCard} from './components';
import {allHierarchyNodesFetchingStart} from '../../../features/base/allPagesFetchingFromApi/slices';
import {HierarchyNodeTypes} from "../../../enums";

const useStyles = makeStyles((theme) => ({
    root: {
        gap: '24px',
        padding: '32px',
        maxWidth: '992px',
        minHeight: '100%',
        width: '100%',
    }
}));

const ContractSelection = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const intl = useIntl();
    const classes = useStyles();

    const allHierarchyNodesFetchingState = useSelector(state => state.allHierarchyNodesFetching);
    const {data, loading} = allHierarchyNodesFetchingState;
    const hasNodes = Array.isArray(data) && data.length > 0

    const renderLoading = () => <CircularProgress/>;

    const goToContract = useCallback((contract) => {
        history.push(`/nodes/${contract}/home`);
    }, [history]);

    const renderNodeList = () => {
        return (
            <Grid container spacing={3}>
                {data.map(node => (
                    <Grid key={node.code} item xs={12} sm={6} md={4} onClick={() => goToContract(node.code)}>
                        <ContractCard
                            cover={node.cover}
                            customer={node._context.parent.name}
                            logo={node.logo}
                            name={node.name}
                            uuid={node.uuid}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }

    useEffect(() => {
        dispatch(allHierarchyNodesFetchingStart([HierarchyNodeTypes.CONTRACT]));
    }, [dispatch]);

    useEffect(() => {
        if (hasNodes && data.length === 1) {
            goToContract(data[0].code);
        }
    }, [data, goToContract, hasNodes]);

    return (
        <>
            <Card className={`${classes.root} no-elevation`}>
                <Typography variant={'h1'} component={'h1'}>
                    {intl.formatMessage({id: 'spider.org.contract_selection.title'})}
                </Typography>

                {hasNodes ? renderNodeList() :
                    loading ? renderLoading() : null}
            </Card>
        </>
    )
}

export default ContractSelection;
