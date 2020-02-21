import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {DefaultText, DefaultTitle, ErrorText, InfoText, Loader, Team} from '../../../../../../components'
import {Avatar, Grid} from "@material-ui/core";
import {Tag} from "../../../../../../components/Teams/components/Team/components/Tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFireAlt} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons";

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
                                <Avatar src={managerPhoto} />
                            </Grid>
                            <Grid item xs zeroMinWidth>
                                <div>
                                    <Grid container>
                                        <Grid item xs={12} zeroMinWidth>
                                            <DefaultTitle noWrap>{team.name}</DefaultTitle>
                                        </Grid>
                                        <Grid item xs={12} zeroMinWidth>
                                            { team.manager && <InfoText noWrap>De { team.manager.firstname } { team.manager.lastname }</InfoText> }
                                            { !team.manager && <ErrorText noWrap>Aucun manager</ErrorText> }
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item>
                                <Tag color={team.color.hex}>
                                    {players} joueurs
                                </Tag>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item>
                                <DefaultText>
                                    <FontAwesomeIcon icon={faFireAlt} /> {team.rank.points} PTS
                                </DefaultText>
                            </Grid>
                            <Grid item>
                                <DefaultText>
                                    <FontAwesomeIcon icon={faStar} /> {team.rank.victories} victoires
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
