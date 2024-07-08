import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {Loader} from "../../../../../components";
import {PersonalisationPanel} from "./components/PersonalisationPanel";
import {ColorPicker} from "./components/ColorPicker";
import {getTeamGroupKeyStart} from "../../../../features/teamGroup/getTeamGroup/slices";
import {getSystemFilesKeyStart} from "../../../../features/systemFiles/getSystemFiles/slices";
import {getConfigsKeyStart} from "../../../../features/config/getConfigs/slices";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

const PersonalizationTab = ({ ...props }) => {
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        // todo: change for hierarchyNode later on
        dispatch(getTeamGroupKeyStart({ teamGroupId: params.contract }));
        dispatch(getSystemFilesKeyStart({ teamGroupId: params.contract }))
        dispatch(getConfigsKeyStart({ teamGroupId: params.contract, codes: ['CCPH'] }))
    }, []);

    const configs = useSelector(state => state.getConfigsKey);
    const teamGroup = useSelector(state => state.getTeamGroupKey);
    const systemFiles = useSelector(state => state.getSystemFilesKey);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                {(teamGroup.loading || systemFiles.loading) && <Loader centered />}
                {(teamGroup.success && systemFiles.success) && <PersonalisationPanel/>}
            </Grid>

            <Grid item xs={12}>
                {(configs.loading) && <Loader centered />}
                {(configs.success) && <ColorPicker/>}
            </Grid>
        </Grid>
    )
}

export default PersonalizationTab;
