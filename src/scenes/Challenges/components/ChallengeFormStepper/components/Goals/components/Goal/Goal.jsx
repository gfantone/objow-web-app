import React from 'react'
import {Grid, IconButton} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {faInfoCircle, faTrashAlt, faEquals, faPlus} from '@fortawesome/free-solid-svg-icons'
import Formsy from 'formsy-react'
import {BlueText, Card, DefaultText, DefaultTitle, HiddenInput, InfoText, TextField, Tooltip, TableChip, Button, Select} from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'
import _ from 'lodash'

const Goal = ({categories, deletionDisabled, goal, index, kpis, onChange, onRemoveClick, classes, setNewKpiOpen, ...props}) => {
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
                          <Grid container spacing={1} alignItems='center' justify="space-between">
                            <Grid item>
                              <DefaultTitle>{Resources.CHALLENGE_UPDATE_GOAL_TITLE.format(number)}</DefaultTitle>
                              <HiddenInput name={`number[${index}]`} value={number} />
                            </Grid>
                            <Grid item>
                              <Button onClick={ () => setNewKpiOpen(true) } text="nouveau">
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;nouveau kpi
                              </Button>
                            </Grid>

                          </Grid>
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
                      <Grid container spacing={1} alignItems='center'>
                          <Grid item>
                              <TableChip label={'>'} />
                          </Grid>
                          <Grid item>
                              <TextField name={`target[${index}]`} label={Resources.CHALLENGE_CREATION_GOAL_TARGET_LABEL2} fullWidth required initial={goal ? goal.target : null} />
                          </Grid>
                          <Grid item>
                            <Grid container  direction="column">
                              <Grid item>
                                <Tooltip title={Resources.CHALLENGE_UPDATE_GOAL_TARGET_INFO_TEXT}>
                                  <BlueText style={{ marginTop: 20 }}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                  </BlueText>
                                </Tooltip>
                              </Grid>
                              <Grid item>
                                <DefaultText>
                                  <FontAwesomeIcon icon={faEquals} />
                                </DefaultText>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                              <TextField name={`points[${index}]`} label={Resources.CHALLENGE_CREATION_GOAL_POINTS_LABEL2} fullWidth required initial={goal ? goal.points : null} />
                          </Grid>
                      </Grid>

                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default Goal
