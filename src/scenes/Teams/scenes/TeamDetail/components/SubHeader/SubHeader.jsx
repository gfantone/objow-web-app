import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {DefaultText, DefaultTitle, ErrorText, InfoText, Loader, Avatar} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import '../../../../../../helpers/StringHelper'
import {Grid} from "@material-ui/core";
import {Tag} from "../../../../../../components/Teams/components/Team/components/Tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFireAlt} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";

import _ from 'lodash'

const styles = {
    root: {
        padding: 16
    }
};

const SubHeader = ({ ...props }) => {
    const { classes } = props;
    const { team, loading } = props.teamDetail;

    const renderLoader = () => {
        return <Loader centered />
    };

    const renderData = () => {
        const { team } = props.teamDetail;
        const players = team.collaborators.length;
        const managerPhoto = team.manager && team.manager.photo ? team.manager.photo : '/assets/img/user/avatar.svg';

        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Avatar src={managerPhoto} entityId={ _.get(team, 'manager.id') }  fallbackName={ _.get(team, 'manager.fullname') } />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <div>
                                    <Grid container>
                                        <Grid item xs={12} zeroMinWidth>
                                            <DefaultTitle noWrap>{team.name}</DefaultTitle>
                                        </Grid>
                                        <Grid item xs={12} zeroMinWidth>
                                            { team.manager && <InfoText noWrap>{Resources.TEAM_DETAIL_MANAGER_TEXT.format(team.manager.firstname, team.manager.lastname)}</InfoText> }
                                            { !team.manager && <ErrorText noWrap>{Resources.TEAM_DETAIL_NO_MANAGER_TEXT}</ErrorText> }
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item>
                                <Tag color={team.color.hex}>{Resources.TEAM_DETAIL_COLLABORATORS_TEXT.format(players)}</Tag>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item>
                                <DefaultText>
                                    <FontAwesomeIcon icon={faFireAlt} /> {Resources.TEAM_DETAIL_POINTS_TEXT.format(team.rank.points)}
                                </DefaultText>
                            </Grid>
                            <Grid item>
                                <DefaultText>
                                    <FontAwesomeIcon icon={faStar} /> {Resources.TEAM_DETAIL_VICTORIES_TEXT.format(team.rank.victories)}
                                </DefaultText>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        )
    };

    return (
        <div className={classes.root}>
            { loading && renderLoader() }
            { !loading && team && renderData() }
        </div>
    )
};

const mapStateToProps = ({ teamDetail }) => ({
    teamDetail
});

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))
