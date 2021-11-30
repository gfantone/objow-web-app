import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ReactDataSheet from 'react-datasheet'
import Formsy from 'formsy-react'
import _ from 'lodash'
import { AppBarSubTitle, Card, DataTable, DefaultText, DefaultTitle, BigText, BlueText, Loader, MainLayoutComponent, Select, ProgressButton, ErrorText, BoldSpan, Tooltip } from '../../../../components'
import { Tag } from '../../../../components/Teams/components/Team/components'
import { ModeSelect, Filters, ParticipantTypeFilter } from './components'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import * as goalDefinitionLevelCollaboratorPointsActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelCollaoratorPoints/actions'
import * as goalDefinitionLevelTeamPointsActions from '../../../../services/GoalDefinitionLevels/GoalDefinitionLevelTeamPoints/actions'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'
import * as goalDefinitionPointRepartitionListActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionList/actions'
import * as goalDefinitionPointRepartitionListUpdateActions from '../../../../services/GoalDefinitionPointRepartitions/GoalDefinitionPointRepartitionListUpdate/actions'
import * as goalDefinitionPointRepartitionModeListActions from '../../../../services/GoalDefinitionPointRepartitionModes/GoalDefinitionPointRepartitionModeList/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";


const styles = {
    root: {
        position: 'relative'
    },
    loader: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerPointsLabel: {
      '& p': {
        fontSize: 14,
      }
    },
    headerPoints: {
      '& p': {
        fontSize: 22,
        fontWeight: 'bold'
      }
    },
    usablePoints: {
      '& p': {
        color: '#00E58D'
      }
    },
    usedPoints: {
      '& p': {
        color: '#f2b666'
      }
    },
    currentPoints: {

    },
    error: {

    },
    spreadsheet: {
      width: '100%',
      paddingLeft: '250px',
      position: 'relative',
      '& .data-grid-container .data-grid': {
        display: 'block',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        '&::-webkit-scrollbar-track': {
          background: '#ddd',
          borderRadius: 8,
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 8,
          border: '2px solid #ddd',
          background: '#888'

        },
        '&::-webkit-scrollbar': {
          '-webkit-appearance': 'none',
          '&:horizontal': {
            height: 11
          }
        }
      },
      '& .data-grid-container .data-grid .cell > input': {
        width: '100%',
        height: '100%'
      },
      '& .data-grid-container .data-grid .cell.read-only': {
        color: '#555555',
        background: 'white',
        '&.empty': {
          background: 'rgb(251, 238, 237)',
          border: 'none',
          '&.selected': {
            borderTop: '1px double rgb(33, 133, 208)',
            borderRight: '1px double rgb(33, 133, 208)',
            borderLeft: '1px double rgb(33, 133, 208)',
            borderBottom: '1px double rgb(33, 133, 208)',
          }
        }
      },
      '& .data-grid-container .data-grid .cell.read-only.firstCell': {
        textAlign: 'left'
      },
      '& .data-grid-container .data-grid .cell.read-only.headerCell': {
        padding: '2px',
        fontWeight: 'bold',
        background: '#103D5C',
        color: 'white'
      },
      '& .cell.baseCell.firstCell': {
        paddingLeft: 5,
        position: 'absolute',
        lineHeight: 2,
        // marginTop: '-1px',
        width: '250px',
        height: 31,
        zIndex: 30,
        left: 0,
        fontWeight: 'bold',
        borderTop: 0,
        borderBottom: 0,
        fontSize: 14,
        '&.selected': {
          borderTop: '1px double rgb(33, 133, 208)',
          borderRight: '1px double rgb(33, 133, 208)',
          borderLeft: '1px double rgb(33, 133, 208)',
          borderBottom: '1px double rgb(33, 133, 208)',
          zIndex: 40
        }
      },
      // First cell of first line
      '& tr:first-of-type .cell.baseCell.firstCell': {
        borderTop: '1px solid #ddd',
        marginTop: '-1px',
        '&.selected': {
          borderTop: '1px double rgb(33, 133, 208)',
          borderRight: '1px double rgb(33, 133, 208)',
          borderLeft: '1px double rgb(33, 133, 208)',
          borderBottom: '1px double rgb(33, 133, 208)',
        }
      },
      // First cell of last line
      '& tr:last-of-type .cell.baseCell.firstCell': {
        borderBottom: '1px solid #ddd',
        '&.selected': {
          borderTop: '1px double rgb(33, 133, 208)',
          borderRight: '1px double rgb(33, 133, 208)',
          borderLeft: '1px double rgb(33, 133, 208)',
          borderBottom: '1px double rgb(33, 133, 208)',
        }
      },
      '&  .data-grid-container .data-grid .cell.baseCell.firstLine': {
        '&.read-only': {
          color: '#333',
          textTransform: 'capitalize',
          fontWeight: 'bold',
        },
      },
      // '& .cell.bottomSeparator': {
      //   borderBottom: '1px solid #333'
      // },
      '& .cell.baseCell': {
        lineHeight: 2,
        height: 30,
        zIndex: 10
      },
      '& .data-grid-container .data-grid .cell.dataCell': {
        '&.read-only': {
          textAlign: 'right',
          color: '#ddd',
        },
        '&.period-W': {
          minWidth: 110
        },
        '&.period-M': {
          minWidth: 150
        },
        '&.period-Q': {
          minWidth: 300
        },
        '&.period-S': {
          minWidth: 300
        },
        '&.period-Y': {
          minWidth: 300
        },
      },

      '& .data-grid-container .data-grid .cell.read-only.pointsCell': {
        background: '#eee',
        color: '#333',
        '&.error': {
          color: '#E50000'
        }
      },

      '& .data-grid-container .data-grid .cell.pointsCell': {
        '&.error': {
          background: '#ffebee',
          color: '#E50000'
        }
      },

      '& .data-grid-container .data-grid .cell.collaboratorCell': {
        borderRight: '1px double #ADD8E6',
        '&.read-only': {
          // color: 'white',
          color: '#333',
          background: '#ADD8E6'
        }
      },
      '&  .data-grid-container .data-grid .cell.read-only.footerCell': {

          fontWeight: 'bold',
          border: 'none',
          color: '#333',
          background: "#ddd",
          textAlign: 'right',
          fontSize: 16,
          lineHeight: 1.7,
          '&.error': {
            color: '#E50000'
          },
          '&.valid': {
            color: '#00E58D'
          },
          '&.firstCell':{
            textAlign: 'left',
          },
          '&.selected': {
            borderTop: '1px double rgb(33, 133, 208)',
            borderRight: '1px double rgb(33, 133, 208)',
            borderLeft: '1px double rgb(33, 133, 208)',
            borderBottom: '1px double rgb(33, 133, 208)',
          }
      },
    },
};

class AdminGoalPointList extends MainLayoutComponent {
    constructor(props) {
        super(props)
        this.team = null
        this.collaborator = null
        this.initialized = false
        this.state = {
          type: 'C',
          newRepartitions: [],
          repartitionLoading: false,
          pendingRefresh: false,
          // team: null,
          // collaborator: null,
        }
    }

    refresh(team, collaborator, type) {
        const periodId = this.props.match.params.periodId;
        var url = `/admin/periods/${periodId}/goal-levels?type=${type || this.state.type}`;

        if (team && !collaborator) url += `&team=${team}`;
        if (team && collaborator) url += `&team=${team}&collaborator=${collaborator}`;

        this.props.history.replace(url)
    }

    loadData = (force) => {
      const periodId = this.props.match.params.periodId;
      const params = new URLSearchParams(window.location.search);
      const collaborator = params.get('collaborator');
      const team = params.get('team');
      const type = params.get('type');
      if(type !== this.state.type) {
        this.setState({
          ...this.state,
          type
        })
      }
      if(team !== this.team || collaborator !== this.collaborator || !this.initialized || force) {
        this.team = team
        this.collaborator = collaborator
        this.initialized = true

        this.props.goalDefinitionPointRepartitionListActions.getGoalDefinitionPointRepartitionList()
        this.props.goalDefinitionPointRepartitionModeListActions.getGoalDefinitionPointRepartitionModeList()
        if(team || collaborator) {
          if(collaborator) {
            this.props.goalDefinitionListActions.getGoalDefinitionListByCollaborator(collaborator, periodId, null, true)
            // this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPointsByCollaborator(periodId, collaborator);
            // this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPointsByCollaborator(periodId, collaborator);
          } else if(team) {
            this.props.goalDefinitionListActions.getGoalDefinitionListByTeam(periodId, team, null, true)
            // this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPointsByTeam(periodId, team);
            // this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPointsByTeam(periodId, team);
          }
        } else {
          this.props.goalDefinitionListActions.getGoalDefinitionList(periodId, true, true, true);
          // this.props.goalDefinitionLevelCollaboratorPointsActions.getGoalDefinitionLevelCollaboratorPoints(periodId);
          // this.props.goalDefinitionLevelTeamPointsActions.getGoalDefinitionLevelTeamPoints(periodId);
        }
      }
    }

    componentDidUpdate() {
      // const { teams } = this.props.teamList;
      // const params = new URLSearchParams(window.location.search);
      //
      //
      //   this.props.handleSubHeader(<ParticipantTypeFilter handleTypeChange={this.handleTypeChange} />)
      //   this.setState({
      //     ...this.state,
      //     mode
      //   })
      // }
      // if(this.state.mode && !mode) {
      //   this.setState({
      //     ...this.state,
      //     mode: null
      //   })
      // }
      // if(teams && teams.length > 0 && this.state.mode === 'team' && !team) {
      //   this.refresh(teams[0].id)
      // }
      if(this.state.pendingRefresh && !this.state.repartitionLoading) {
        this.setState({
          ...this.state,
          pendingRefresh: false
        })
        this.loadData(true)
      }

      this.loadData()
    }

    handleTypeChange = (type) => {
        this.setState({
            ...this.state,
            type: type
        }, this.refresh(this.team, this.collaborator, type))
    }

    componentDidMount() {
        const periodId = this.props.match.params.periodId;
        const params = new URLSearchParams(window.location.search);
        const type = params.get('type');
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        // this.props.handleSubHeader(<AppBarSubTitle title='Configuration des points des objectifs' />);
        this.props.handleSubHeader(<ParticipantTypeFilter handleTypeChange={this.handleTypeChange} defaultType={type} />)
        this.props.handleMaxWidth('lg');
        this.props.configListActions.getConfigList(periodId);
        this.loadData();
    }

    renderLoader() {
        return <Loader centered />
    }

    // onModeSelect = (mode) => {
    //   if(mode) {
    //     this.props.history.push(`/admin/periods/${this.props.match.params.periodId}/goal-levels?mode=${mode}`)
    //   }
    // }

    onFilterChange = (team, collaborator) => {
      this.refresh(team, collaborator)
    }

    onSelectRepartitionMode = (repartitionId, mode) => {

      const newRepartition = {
        id: repartitionId,
        mode: parseInt(mode)
      }
      const newRepartitions = this.state.newRepartitions.find(repartition => repartition.id === repartitionId) ?
        this.state.newRepartitions.map(repartition => repartition.id === repartitionId ? Object.assign({}, repartition, newRepartition) : repartition) :
        [...this.state.newRepartitions, newRepartition]
      this.setState({
        ...this.state,
        newRepartitions
      }, this.onSubmitRepartitions)
    }

    onRepartitionChange = (changes, totalPoints) => {
      let newRepartitions = [...this.state.newRepartitions]
      changes.forEach(change => {
        if(change.cell.type === 'repartitionPoints' || change.cell.type === 'importance_percent') {
          let newRepartition = {
            id: change.cell.id,
          }
          if(change.cell.type === 'repartitionPoints') {
            newRepartition.points = change.value
            newRepartition.importance_percent = (change.value / totalPoints * 100)
          }
          if(change.cell.type === 'importance_percent') {
            newRepartition.points = (totalPoints * change.value / 100)
            newRepartition.importance_percent = change.value
          }
          // console.log(newRepartition);
          newRepartitions = newRepartitions.find(repartition => repartition.id === newRepartition.id) ?
            this.state.newRepartitions.map(repartition => repartition.id === newRepartition.id ? Object.assign({}, repartition, newRepartition) : repartition) :
            [...this.state.newRepartitions, newRepartition]
        }
      })

      this.setState({
        ...this.state,
        newRepartitions
      })
    }

    onSubmitRepartitions = () => {
      const {loading} = this.props.goalDefinitionPointRepartitionListUpdateActions.updateGoalDefinitionPointRepartitionList(this.state.newRepartitions.map(repartition => {
        let result = {}
        result.id = repartition.id
        if(repartition.mode) {
          result.mode_id = repartition.mode
        }

        if(repartition.importance_percent) {
          result.points = repartition.importance_percent
        }


        return result
      }))
      this.setState({
        ...this.state,
        pendingRefresh: true,
        repartitionLoading: loading
      })
    }

    getDisabledLinesFromDefinitions = (definitions, pointRepartitions, repartitionModes) => {

      let disabledLines = {}
      definitions.forEach(definition => {
        if(this.team || this.collaborator) {
          // get currentRepartition by definition
          const repartition = pointRepartitions.filter(pointRepartition => (
            pointRepartition.definition === definition.id && (
              this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
            )
          ))[0]

          const newRepartition = this.state.newRepartitions.find(newRepartition => newRepartition.id === repartition.id)

          const mode = repartition ?
          repartitionModes.find(mode => _.get(newRepartition, 'mode') ? mode.id === newRepartition.mode : mode.id === repartition.mode) :
          { code: 'G' }

          disabledLines[definition.id] = !(this.team && !this.collaborator && mode.code === 'T' || this.collaborator && mode.code === 'I' || !this.collaborator && !this.team && mode.code === 'G')
        }
      })
      return disabledLines
    }

    addRepartitionPointsToDefinitions = (definitions) => {
      // const { teams } = this.props.teamList;
      // const participantsNumber = teams.filter(team => this.team ? team.id === parseInt(this.team) : true).reduce((acc, team) => (
      //   team.collaborators.filter(collaborator => this.collaborator ? parseInt(this.collaborator) === collaborator.id : true).length + acc
      // ), 0)
      // const baseGoalPoints = this.getBaseGoalPoints() * participantsNumber
      return definitions.map(definition => {
        // const { pointRepartitions } = this.props.goalDefinitionPointRepartitionList
        // const repartition = pointRepartitions.filter(pointRepartition => (
        //   pointRepartition.definition === definition.id && (
        //     this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
        //   )
        // ))[0]
        //
        // const newRepartition = this.state.newRepartitions.find(newRepartition => newRepartition.id === repartition.id)
        // const repartitionPoints = _.get(newRepartition, 'points') * baseGoalPoints / 100 || _.get(repartition, 'points')  * baseGoalPoints / 100 || definition.usedPoints + definition.currentPoints

        // custom repartitions in sub level (team for global, collaborator for team)
        let context = 'team'
        if(this.team){
          context = 'collaborator'
        }
        if(this.collaborator) {
          context = null
        }
        const customRepartitions = context ? this.getRepartitionsByContextAndDefinition(definition, context) : []
        return Object.assign({}, definition, {
          usedPoints: definition.usedPoints.toLocaleString(),
          currentPoints: definition.currentPoints.toLocaleString(),
          customRepartitions
          // repartitionPoints: Number(repartitionPoints.toFixed(2)).toLocaleString()
        })
      })


    }

    getBaseGoalPoints = () => {
      const { configs } = this.props.configList;
      const baseCollaboratorGoalPoints = parseInt(configs.find(x => x.code == 'CPG').value)
      const baseTeamGoalPoints = configs.find(x => x.code == 'TPG').value
      return this.state.type === 'T' ? baseTeamGoalPoints : baseCollaboratorGoalPoints
    }

    getRepartitionModesByCurrentRepartition = (currentRepartition, currentTeamRepartition) => {
      const { modes: repartitionModes } = this.props.goalDefinitionPointRepartitionModeList;
      if(this.team && !this.collaborator) {
        // don't show individual on team mode
        return repartitionModes.filter(mode => mode.code !== 'I')
      } else if (this.collaborator) {
        // don't show non-current mode on individual mode
        return repartitionModes.filter(mode => this.state.type === 'C' && mode.code === 'I' || mode.id === _.get(currentTeamRepartition, 'mode'))
        return repartitionModes
      }
    }

    // context : team/collaborator
    getRepartitionsByContextAndDefinition = (definition, context) => {
      const { pointRepartitions } = this.props.goalDefinitionPointRepartitionList
      return pointRepartitions.filter(repartition => repartition.definition === definition.id && _.get(repartition, context))
    }

    renderData() {
        const { classes } = this.props;
        const { configs } = this.props.configList;
        // const { usedPoints: usedCollaboratorPoints, currentPoints: currentCollaboratorPoints } = this.props.goalDefinitionLevelCollaboratorPoints;
        // const { usedPoints: usedTeamPoints, currentPoints: currentTeamPoints } = this.props.goalDefinitionLevelTeamPoints;

        const { definitions } = this.props.goalDefinitionList;
        const { teams } = this.props.teamList;

        const {usedCollaboratorPoints, currentCollaboratorPoints, usedTeamPoints, currentTeamPoints} = definitions.reduce((acc, definition) => {
          if(definition.isActive === true) {

            if(definition.type.code === 'T') {
              acc.usedTeamPoints += definition.usedPoints
              acc.currentTeamPoints += definition.currentPoints
            }
            if(definition.type.code === 'C') {
              acc.usedCollaboratorPoints += definition.usedPoints
              acc.currentCollaboratorPoints += definition.currentPoints
            }
          }
          return acc
        }, {usedCollaboratorPoints: 0, currentCollaboratorPoints: 0, usedTeamPoints: 0, currentTeamPoints: 0})

        const baseCollaboratorGoalPoints = parseInt(configs.find(x => x.code == 'CPG').value)
        const baseTeamGoalPoints = configs.find(x => x.code == 'TPG').value
        const baseGoalPoints = this.getBaseGoalPoints()

        const usableCollaboratorGoalPoints = baseCollaboratorGoalPoints ? baseCollaboratorGoalPoints - usedCollaboratorPoints - currentCollaboratorPoints : 0;
        const usableTeamGoalPoints = baseTeamGoalPoints ? baseTeamGoalPoints - usedTeamPoints - currentTeamPoints : 0;
        const { pointRepartitions } = this.props.goalDefinitionPointRepartitionList
        const { modes: repartitionModes } = this.props.goalDefinitionPointRepartitionModeList
        const filteredDefinitions = definitions.filter(definition => definition.type.code === this.state.type)

        const maxPoints = this.state.type === 'T' ? baseTeamGoalPoints : baseCollaboratorGoalPoints
        const currentTeam = teams.find(team => this.team && team.id === parseInt(this.team))
        const currentCollaborator = currentTeam && this.collaborator && currentTeam.collaborators.find(collaborator => collaborator.id === parseInt(this.collaborator))

        const disabledLines = this.getDisabledLinesFromDefinitions(definitions, pointRepartitions, repartitionModes)
        const globalMode = !this.team && !this.collaborator

        var columns = _.compact([
            { name: 'id', label: 'Ref' },
            // { name: 'isActive', label: 'Actif', options: {
            //   filter: false,
            //   customBodyRender: (value, tableMeta, updateValue) => {
            //     if(value) {
            //       return <FontAwesomeIcon icon={faCheckCircle} style={{fontSize: 20, color: '#00E58D'}}/>
            //     } else {
            //       return <FontAwesomeIcon icon={faTimesCircle} style={{fontSize: 20, color: '#E50000'}}/>
            //     }
            //
            //   }
            // } },

            { name: 'name', label: 'Intitulé' },
            // { name: 'type.description', label: 'Objectif' },
            { name: 'usedPoints', label: 'Pts déjà mis en jeu' },

            { name: 'currentPoints', label: 'Pts en cours de jeu' },
            // { name: 'repartitionPoints', label: 'Pts alloués' },
            // { name: 'obtainedPoints', label: 'Total pts gagnés en moyenne' },
            // { name: 'levels', label: 'Nbre de paliers' },
            { name: 'category.name', label: 'Catégorie' },
            !this.team || (this.state.type !== 'T' && this.team && !this.collaborator) ? {
              name: 'customRepartitions',
              label: globalMode ? 'Personnalisation équipe' : 'Personnalisation individuelle',
              options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                  let entities = []
                  const entityKey = this.team ? 'collaborator' : 'team'
                  const baseRepartitionMode = this.team ?
                    repartitionModes.find(mode => mode.code === 'I') :
                    repartitionModes.find(mode => mode.code === 'T')

                  value.forEach((repartition, i) => {
                    if(repartition.mode === baseRepartitionMode.id) {
                      const newEntity = currentTeam ?
                        currentTeam.collaborators.find(collaborator => collaborator.id === repartition.collaborator) :
                        teams.find(team => team.id === repartition.team)
                      if(newEntity) {
                        entities = [...entities, newEntity]
                      }
                    }
                  });
                  if(entities.length > 0) {
                    // {entities.map(entity => <div>{_.get(entity, 'fullname') || _.get(entity, 'name')}</div>)}
                    const toolTipText = entities.reduce((acc, entity) => (
                        <div>
                          { acc }
                          {`${_.get(entity, 'fullname') || _.get(entity, 'name')}`}
                        </div>
                      ), <div/>)

                    return(

                      <Grid container justify='center'>
                        <Grid item>
                          <Tooltip title={<div>{ toolTipText }</div>}>
                            <BlueText style={{fontSize: "26px"}}>
                              <div style={{color: '#00E58D'}}>
                                <FontAwesomeIcon icon={faCheckCircle} />
                              </div>
                            </BlueText>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    )
                  }
                }
            } } : null
        ]);
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => {
              let url = `/admin/periods/${this.props.match.params.periodId}/goal-levels/${colData[0]}`

              if(this.mode === 'global') {
                return this.props.history.push(url)
              }

              if(!this.collaborator && !this.team) {
                return this.props.history.push(url)
              }
              const definitionId = parseInt(colData[0])
              // get currentRepartition by definition
              const repartition = pointRepartitions.filter(pointRepartition => (
                pointRepartition.definition === definitionId && (
                  this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
                )
              ))[0]

              const newRepartition = this.state.newRepartitions.find(newRepartition => newRepartition.id === repartition.id)

              const mode = repartitionModes.find(mode => newRepartition && _.get(newRepartition, 'mode') ? mode.id === newRepartition.mode : mode.id === repartition.mode)

              if(this.team && !this.collaborator && mode.code === 'T') {
                url = url + `?team=${this.team}`
                this.props.history.push(url)
              } else if(this.collaborator && mode.code === 'I') {
                url = url + `?team=${this.team}&collaborator=${this.collaborator}`
                this.props.history.push(url)
              }
            },
            setRowProps: (row) => {
              if(disabledLines && disabledLines[parseInt(row[0])] === true) {
                return {
                  style: {
                    background: '#ededed',
                    opacity: 0.6
                  }
                }
              }
            }
        };

        const displayRepartition = this.team || this.collaborator

        const percentByDefinition = definition => Number(((definition.usedPoints + definition.currentPoints) / maxPoints * 100).toFixed(2))
        const totalPointsPercent = Number(filteredDefinitions.reduce((acc, definition) => acc + percentByDefinition(definition), 0).toFixed(2))



        let totalImportancePercent = 0
        let totalAvailable = 0
        let allRepartitionsValid = true
        return (
          <React.Fragment>
            <Filters onChange={ this.onFilterChange } team={this.team} collaborator={this.collaborator}/>
            <Grid container direction="row" spacing={4}>

              <Grid item sm={ displayRepartition ? 8 : 12}>
                <Grid container spacing={4}>
                  { !globalMode && (
                  <Grid item sm={12}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <BigText>
                          Configuration des points {currentTeam || currentCollaborator ? `pour ${_.get(currentCollaborator, 'fullname') || _.get(currentTeam, 'name')}` : ''}
                        </BigText>
                      </Grid>
                      <Grid item sm={12}>

                        <Card>
                          <Grid container spacing={2} justify='space-around'>
                            { this.state.type === 'C' && (
                              <React.Fragment>
                                <React.Fragment>
                                  <Grid item>
                                    <Grid container direction="column" alignItems="center" spacing={2}>
                                      <Grid item className={`${classes.headerPoints} ${classes.usablePoints}`}>
                                        <DefaultText>{usableCollaboratorGoalPoints.toLocaleString()}</DefaultText>
                                      </Grid>
                                      <Grid item className={ classes.headerPointsLabel }>
                                        <DefaultText>points / joueur disponibles</DefaultText>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item>
                                    <Grid container direction="column" alignItems="center" spacing={2}>
                                      <Grid item className={`${classes.headerPoints} ${classes.usedPoints}`}>
                                        <DefaultText>{usedCollaboratorPoints.toLocaleString()}</DefaultText>
                                      </Grid>
                                      <Grid item className={ classes.headerPointsLabel }>
                                        <DefaultText>points / joueur déjà mis en jeu</DefaultText>

                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </React.Fragment>
                                <Grid item>
                                  <Grid container direction="column" alignItems="center" spacing={2}>
                                    <Grid item className={`${classes.headerPoints} ${classes.currentPoints}`}>
                                      <DefaultText>{currentCollaboratorPoints.toLocaleString()}</DefaultText>
                                    </Grid>
                                    <Grid item className={ classes.headerPointsLabel }>
                                      <DefaultText>points / joueur en cours de jeu</DefaultText>

                                    </Grid>
                                  </Grid>
                                </Grid>
                              </React.Fragment>
                            )}
                            { this.state.type === 'T' && (
                              <React.Fragment>
                                <Grid item>
                                  <Grid container direction="column" alignItems="center" spacing={2}>
                                    <Grid item className={`${classes.headerPoints} ${classes.usablePoints}`}>
                                      <DefaultText>{usableTeamGoalPoints.toLocaleString()}</DefaultText>
                                    </Grid>
                                    <Grid item>
                                      <DefaultText>pts / équipe disponible</DefaultText>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid container direction="column" alignItems="center" spacing={2}>
                                    <Grid item className={`${classes.headerPoints} ${classes.usedPoints}`}>
                                      <DefaultText>{usedTeamPoints.toLocaleString()}</DefaultText>
                                    </Grid>
                                    <Grid item>
                                      <DefaultText>pts / équipe déjà mis en jeu</DefaultText>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid container direction="column" alignItems="center" spacing={2}>
                                    <Grid item className={`${classes.headerPoints} ${classes.currentPoints}`}>
                                      <DefaultText>{currentTeamPoints.toLocaleString()}</DefaultText>
                                    </Grid>
                                    <Grid item>
                                      <DefaultText>pts / équipe en cours de jeu</DefaultText>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </React.Fragment>
                            ) }
                          </Grid>
                        </Card>

                      </Grid>
                    </Grid>
                  </Grid>
                  ) }
                  <Grid item sm={12}>
                    <Grid container spacing={1} direction="column">
                      { globalMode && (
                        <Grid item>
                          <BigText>
                            Configuration des points en mode global
                          </BigText>

                        </Grid>
                      ) }
                      <Grid item>
                        <DataTable data={
                            this.addRepartitionPointsToDefinitions(filteredDefinitions)
                          } columns={columns} options={options} />
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>
              </Grid>
              { displayRepartition && (
                <Grid item sm={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <BigText>Matrice de répartition des points</BigText>
                    </Grid>
                    <Grid item>
                      <Card>
                        <Grid container spacing={4} justify='center'>
                          <Grid item>
                            <Grid container direction="column" alignItems="center" spacing={2}>
                              <Grid item className={`${classes.headerPoints}`}>
                                <DefaultText>{baseGoalPoints.toLocaleString()}</DefaultText>
                              </Grid>
                              <Grid item>
                                <DefaultText>Max de points gagnables / { this.state.type === 'T' ? `équipe ${ currentTeam ? `(${currentTeam.collaborators.length} joueurs)` : '' }` :'joueur' }</DefaultText>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>

                            <Formsy onSubmit={this.onSubmitRepartitions} >
                              <Grid container spacing={2}>
                                <Grid item className={ classes.spreadsheet }>
                                  <ReactDataSheet
                                    data={[
                                      [ {value: 'Ref', readOnly: true, className: 'headerCell'}, {value: '% d\'importance', readOnly: true, className: 'headerCell'}, {value: 'Points Alloués', readOnly: true, className: 'headerCell'}, {value: 'Mode de répartition', readOnly: true, className: 'headerCell'} ],
                                      ...filteredDefinitions.map(definition => {
                                        // If repartition is changed by select

                                        // get currentRepartition by definition
                                        const repartition = pointRepartitions.filter(pointRepartition => (
                                          pointRepartition.definition === definition.id && (
                                            this.team && !this.collaborator && pointRepartition.team === parseInt(this.team) || this.collaborator && pointRepartition.collaborator === parseInt(this.collaborator)
                                          )
                                        ))[0]

                                        const teamRepartition = pointRepartitions.filter(pointRepartition => (
                                          pointRepartition.definition === definition.id && (
                                            this.team  && pointRepartition.team === parseInt(this.team)
                                          )
                                        ))[0]

                                        const newRepartition = this.state.newRepartitions.find(newRepartition => newRepartition.id === repartition.id)

                                        const mode = repartitionModes.find(mode => _.get(newRepartition, 'mode') ? mode.id === newRepartition.mode : mode.id === repartition.mode)


                                        let repartitionPoints = definition.currentPoints + definition.usedPoints
                                        let importance_percent = repartitionPoints / (maxPoints) * 100


                                        if(mode.code !== 'G') {
                                          importance_percent = repartition && repartition.points


                                          // Page filtered on team and current repartition is individual
                                          if(this.team && !this.collaborator && mode.code === 'I') {
                                            const individualPoints = pointRepartitions
                                            .filter(pointRepartition => pointRepartition.definition === definition.id && currentTeam && currentTeam.collaborators.map(c => c.id).indexOf(pointRepartition.collaborator) >= 0)
                                            .reduce((acc, pointRepartition) => {
                                              return acc + pointRepartition.points * baseGoalPoints / 100
                                              // return acc + pointRepartition.points
                                            }, 0)

                                            importance_percent = individualPoints / (maxPoints) * 100
                                          }
                                          // Page filtered on collaborator and current repartition is team
                                          if(this.collaborator && mode.code === 'T') {
                                            importance_percent = _.get(pointRepartitions
                                              .find(pointRepartition => pointRepartition.definition === definition.id && currentCollaborator && currentCollaborator.team.id === pointRepartition.team), 'points', 0)
                                            }

                                            importance_percent = newRepartition && newRepartition.importance_percent || importance_percent
                                            repartitionPoints = (maxPoints * importance_percent / 100)

                                            // repartition points should not be under used points
                                            if(mode.code === 'T' && repartitionPoints < definition.usedPoints) {
                                              allRepartitionsValid = false
                                            }
                                          }



                                          const repartitionReadonly =
                                          mode.code === 'G' ||
                                          // definition.currentPoints > repartitionPoints ||
                                          mode.code === 'T' && (!this.team || this.collaborator) ||
                                          mode.code === 'I' && !this.collaborator

                                          if(Number(importance_percent)) {
                                            totalImportancePercent += Number(importance_percent)
                                          }
                                          if(Number(repartitionPoints)) {
                                            totalAvailable += Number(repartitionPoints)
                                          }

                                          return (
                                            [
                                              {
                                                value: definition.id, readOnly: true, className: 'pointsCell'
                                              },

                                              {
                                                value: Number(Number(importance_percent).toFixed(2)).toLocaleString(),
                                                readOnly: repartitionReadonly,
                                                type: 'importance_percent',
                                                id: repartition.id,
                                                className: `pointsCell ${ repartitionPoints < definition.usedPoints ? 'error' : '' }`
                                              },
                                              {
                                                value: repartitionPoints.toLocaleString(),
                                                readOnly: repartitionReadonly,
                                                type: 'repartitionPoints',
                                                id: repartition.id,
                                                className: `pointsCell ${ repartitionPoints < definition.usedPoints ? 'error' : '' }`
                                              },
                                              {
                                                value: (mode ? mode : ''), type: 'select', choices: this.getRepartitionModesByCurrentRepartition(repartition, teamRepartition), id: repartition.id, className: 'pointsCell'
                                              }
                                            ]
                                          )
                                        }),
                                        [
                                          {value: 'Total', readOnly: true, className: 'pointsCell'},
                                          {value: Number(totalImportancePercent.toFixed(2)).toLocaleString(), readOnly: true, className: 'pointsCell'},
                                          {value: Number(totalAvailable.toFixed(2)).toLocaleString(), readOnly: true, className: 'pointsCell'}

                                        ]
                                        // [
                                        //   {value: 'Total alloué', readOnly: true},
                                        //   // {value: '100', readOnly: true},
                                        // ],
                                        // [
                                        //   {value: 'Total restant', readOnly: true},
                                        //   // {value: 100 - totalPointsPercent, readOnly: true},
                                        //   {value: maxPoints - totalPoints, readOnly: true}
                                        // ]
                                      ]}
                                      cellRenderer={(cell) => {
                                        if(cell.cell.type === 'select') {
                                          return (
                                            <td {...cell}>
                                              <Select
                                                onChange={ (value) => {
                                                  this.onSelectRepartitionMode(cell.cell.id, value)
                                                } }
                                                name={`repartitionMode${cell.cell.key}`}
                                                emptyDisabled
                                                initial={cell.cell.value.id}
                                                updateInitial
                                                optionValueName='id'
                                                optionTextName='description'
                                                options={cell.cell.choices}
                                              />
                                            </td>
                                          )
                                        }
                                        return <td {...cell}>{cell.children}</td>
                                      }}
                                      onCellsChanged={ changes => this.onRepartitionChange(changes, maxPoints) }
                                      valueRenderer={cell => cell.value}
                                      />
                                  </Grid>
                                  <Grid item container spacing={2}>
                                    {(Number(totalImportancePercent) && totalImportancePercent > 100) && (
                                      <Grid item justify='center'>
                                        <ErrorText className={classes.error} align='center'>{`Le total de points ne peut pas dépasser le total alloué pour les objectifs (${
                                            this.state.type === 'T' ? baseTeamGoalPoints.toLocaleString() : baseCollaboratorGoalPoints.toLocaleString() } points)`}</ErrorText>
                                        </Grid>
                                      )}
                                      {!allRepartitionsValid && (
                                        <Grid item justify='center'>
                                          <ErrorText className={classes.error} align='center'>{`Les points alloués de chaque objectif ne peuvent pas être inférieurs aux points déjà mis en jeu`}</ErrorText>
                                        </Grid>
                                      )}
                                    </Grid>
                                    <Grid item xs={12} alignItems='center'>

                                      <ProgressButton type='submit' text={'Valider'} disabled={ totalImportancePercent > 100 || !allRepartitionsValid} loading={this.state.repartitionLoading} centered />

                                    </Grid>
                                  </Grid>


                                </Formsy>
                              </Grid>
                            </Grid>
                          </Card>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </React.Fragment>
        )
    }

    render() {
        const { configs, loading: configfListLoading } = this.props.configList;
        // const { usedPoints: usedCollaboratorPoints, currentPoints: currentCollaboratorPoints, loading: goalDefinitionLevelCollaboratorPointsLoading } = this.props.goalDefinitionLevelCollaboratorPoints;

        // const { usedPoints: usedTeamPoints, currentPoints: currentTeamPoints, loading: goalDefinitionLevelTeamPointsLoading } = this.props.goalDefinitionLevelTeamPoints;
        const { definitions, loading: goalDefinitionListLoading } = this.props.goalDefinitionList;
        const { pointRepartitions, loading: goalDefinitionPointRepartitionLoading  } = this.props.goalDefinitionPointRepartitionList
        const { modes: repartitionModes, loading: goalDefinitionPointRepartitionModeLoading  } = this.props.goalDefinitionPointRepartitionModeList
        const loading = configfListLoading  || goalDefinitionListLoading || goalDefinitionPointRepartitionLoading || goalDefinitionPointRepartitionModeLoading;

        return (
            <div>
                <React.Fragment>
                  { loading && this.renderLoader() }
                  { !loading && configs && pointRepartitions && definitions && repartitionModes && this.initialized && this.renderData() }
                </React.Fragment>
            </div>
        )
    }
}

const mapStateToProps = ({ configList, goalDefinitionLevelCollaboratorPoints, goalDefinitionLevelTeamPoints, goalDefinitionList, teamList, goalDefinitionPointRepartitionList, goalDefinitionPointRepartitionModeList }) => ({
    configList,
    goalDefinitionLevelCollaboratorPoints,
    goalDefinitionLevelTeamPoints,
    goalDefinitionList,
    goalDefinitionPointRepartitionList,
    goalDefinitionPointRepartitionModeList,
    teamList
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch),
    goalDefinitionLevelCollaboratorPointsActions: bindActionCreators(goalDefinitionLevelCollaboratorPointsActions, dispatch),
    goalDefinitionLevelTeamPointsActions: bindActionCreators(goalDefinitionLevelTeamPointsActions, dispatch),
    goalDefinitionListActions: bindActionCreators(goalDefinitionListActions, dispatch),
    goalDefinitionPointRepartitionListActions: bindActionCreators(goalDefinitionPointRepartitionListActions, dispatch),
    goalDefinitionPointRepartitionListUpdateActions: bindActionCreators(goalDefinitionPointRepartitionListUpdateActions, dispatch),
    goalDefinitionPointRepartitionModeListActions: bindActionCreators(goalDefinitionPointRepartitionModeListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(AdminGoalPointList)))
