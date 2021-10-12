import React from 'react'
import {Grid, IconButton} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInfoCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {BlueText, Card, DefaultText, DefaultTitle, HiddenInput, InfoText, Select, TextField, Tooltip} from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'
import _ from 'lodash'

const Goal = ({categories, deletionDisabled, goal, index, kpis, onChange, onRemoveClick, ...props}) => {
    const [category, setCategory] = React.useState(goal ? goal.category : null)
    const displayKpis = category ? kpis.filter(x => x.category && x.category.id == category) : kpis
    const [kpi, setKpi] = React.useState(goal ? goal.kpi : null)
    const kpiObject = kpi ? kpis.find(x => x.id == kpi) : null
    const number = index + 1

    const unit = _.get(kpiObject, 'unit.name')
    const periodicity = _.get(kpiObject, 'periodicity.description')
    const format = kpiObject ? kpiObject.manual ? 'Manuel' : 'Automatique' : ''

    function handleCategoryChange(newCategory) {
        setCategory(Number(newCategory))
        setKpi(null)
    }

    function handleKpiChange(newKpi) {
        setKpi(Number(newKpi))
    }

    return (
        <Grid key={goal.key} item xs={6}>
            <Card>
                <Grid container spacing={2}>
                    <Grid item xs={12} container>
                        <Grid item xs>
                            <DefaultTitle>{Resources.CHALLENGE_UPDATE_GOAL_TITLE.format(number)}</DefaultTitle>
                            <HiddenInput name={`number[${index}]`} value={number} />
                        </Grid>
                        {!deletionDisabled && <Grid item>
                            <IconButton size='small' onClick={onRemoveClick}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </IconButton>
                        </Grid>}
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            emptyText={'Toutes'}
                            fullWidth
                            initial={category}
                            label={Resources.CHALLENGE_UPDATE_GOAL_CATEGORY_LABEL}
                            name='category'
                            options={categories}
                            optionTextName='name'
                            optionValueName='id'
                            onChange={handleCategoryChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            fullWidth
                            initial={kpi}
                            label={Resources.CHALLENGE_UPDATE_GOAL_KPI_LABEL}
                            name={`kpi[${index}]`}
                            options={displayKpis}
                            optionTextName='name'
                            optionValueName='id'
                            required
                            onChange={handleKpiChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField name={`goalName[${index}]`} label={Resources.CHALLENGE_UPDATE_GOAL_NAME_LABEL} fullWidth required initial={goal ? goal.goalName : null} />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs>
                          <DefaultText>{Resources.CHALLENGE_UPDATE_GOAL_UNIT_LABEL}</DefaultText>
                          <InfoText>{unit}</InfoText>
                        </Grid>
                        <Grid item xs>
                          <DefaultText>{Resources.CHALLENGE_UPDATE_GOAL_PERIODICITY_LABEL}</DefaultText>
                          <InfoText>{periodicity}</InfoText>
                        </Grid>
                        <Grid item xs>
                          <DefaultText>{Resources.CHALLENGE_UPDATE_GOAL_FORMAT_LABEL}</DefaultText>
                          <InfoText>{format}</InfoText>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs>
                        <TextField name={`target[${index}]`} label={Resources.CHALLENGE_UPDATE_GOAL_TARGET_LABEL} fullWidth required initial={goal ? goal.target : null} />
                    </Grid>
                    <Grid item>
                        <Tooltip title={Resources.CHALLENGE_UPDATE_GOAL_TARGET_INFO_TEXT}>
                        <BlueText style={{ marginTop: 20 }}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                        </BlueText>
                    </Tooltip>
                    </Grid>
                    <Grid item xs>
                        <TextField name={`points[${index}]`} label={Resources.CHALLENGE_UPDATE_GOAL_POINTS_LABEL} fullWidth required initial={goal ? goal.points : null} />
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default Goal
