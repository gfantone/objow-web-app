import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Grid, IconButton, Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Tag } from './components'
import { Card, DefaultTitle, ErrorText, GridLink, InfoText } from '../../../../../../components'

const styles = {
    arrow: {
        marginTop: 8
    },
    collaboratorList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
};

const Team = ({ team, ...props }) => {
    const { classes } = props;
    const players = team.collaborators.length;
    const managerPhoto = team.manager && team.manager.photo ? team.manager.photo : '/assets/img/user/avatar.svg';
    const [activeStep, setActiveStep] = React.useState(0);
    const nbStep = Math.ceil(team.collaborators.length / 4);
    const collaborators = [];

    for (var i = 0; i < nbStep; i++) {
        const startIndex = i * 4;
        var lastIndex = startIndex + 4;
        const currentCollaborators = [];
        if (lastIndex > team.collaborators.length) {
            lastIndex = team.collaborators.length
        }
        for (var j = startIndex; j < lastIndex; j++) {
            currentCollaborators.push(team.collaborators[j])
        }
        collaborators.push(currentCollaborators)
    }

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    };

    const handleStepChange = (step) => {
        setActiveStep(step)
    };

    return (
        <div>
            <Card>
                <Grid container spacing={2}>
                    <GridLink item xs={12} container spacing={2} component={Link} to={`/teams/${team.id}`}>
                        <Grid item>
                            <Avatar src={managerPhoto} />
                        </Grid>
                        <Grid item xs container>
                            <Grid item xs zeroMinWidth>
                                <DefaultTitle noWrap>{team.name}</DefaultTitle>
                            </Grid>
                            <Grid item>
                                <Tag color={team.color.hex}>
                                    {players} joueurs
                                </Tag>
                            </Grid>
                            <Grid item xs={12} zeroMinWidth>
                                { team.manager && <InfoText noWrap>De { team.manager.firstname } { team.manager.lastname }</InfoText> }
                                { !team.manager && <ErrorText noWrap>Aucun manager</ErrorText> }
                            </Grid>
                        </Grid>
                    </GridLink>
                    <Grid item xs={12} container spacing={1}>
                        <Grid item>
                            <IconButton size='small' onClick={handleBack} disabled={activeStep == 0} className={classes.arrow}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </IconButton>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <SwipeableViews
                                axis='x'
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                            >
                                { collaborators.map(collaboratorList => {
                                    return (
                                        <div className={classes.collaboratorList}>
                                            { collaboratorList.map(collaborator => {
                                                const collaboratorPhoto = collaborator.photo ? collaborator.photo : '/assets/img/user/avatar.svg';
                                                return (
                                                    <div>
                                                        <Link to={`/teams/${team.id}/collaborators/${collaborator.id}/detail`}>
                                                            <Tooltip title={collaborator.fullname}>
                                                                <Avatar src={collaboratorPhoto} />
                                                            </Tooltip>
                                                        </Link>
                                                    </div>
                                                )
                                            }) }
                                        </div>
                                    )
                                }) }
                            </SwipeableViews>
                        </Grid>
                        <Grid item>
                            <IconButton size='small' onClick={handleNext} disabled={activeStep === nbStep - 1} className={classes.arrow}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
};

export default withStyles(styles)(Team)