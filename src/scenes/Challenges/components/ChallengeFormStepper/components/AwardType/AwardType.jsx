import React from 'react'
import {connect} from 'react-redux'
import {CardMedia, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Card, BigText, DefaultText} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const useStyles = makeStyles({
    typeItem: {
      cursor: 'pointer',
      width: 300,
      borderRadius: 34,
      transition: 'transform .5s',
      '&:hover': {
          transform: 'scale(1.05)'
      },
      '& .MuiPaper-root': {
        height: '100%',
        borderRadius: 30,
      }
    },
    active: {
      background: '#00E58D'
    },
    icon: {
      height: 120,
      width: 120
    }
})

const AwardType = ({types, currentType, setType, participantsNumber, ...props}) => {
    const classes = useStyles()
    const icons = {
      'R': require(`../../../../../../assets/img/system/challenge/icons/Ribbons.png`),
      'M': require(`../../../../../../assets/img/system/challenge/icons/Rocket.png`),
      'P': require(`../../../../../../assets/img/system/challenge/icons/Levels.png`)
    }
    const {account} = props.accountDetail
    const participantsConditions = {
      'R': {
        minimum: 2
      },
      'M': {
      },
      'P': {
      }
    }

    return (
        <div>
            <Grid container spacing={1} justify='space-around'>
                { types.filter(
                  type => !participantsConditions[type.code].minimum || participantsNumber >= participantsConditions[type.code].minimum
                ).map(type => (
                  <Grid item onClick={() => setType(type.id)} className={`${classes.typeItem} ${type.id === currentType ? classes.active : ''}`} style={{marginBottom: 20}}>
                    <Card>
                      <Grid container spacing={1} direction='column' alignItems='center'>
                        <Grid item>
                          <CardMedia image={icons[type.code]} className={classes.icon} />
                        </Grid>
                        <Grid item>
                          <BigText>
                            {type.name}
                          </BigText>
                        </Grid>
                        <Grid item style={{textAlign: 'center'}}>
                          <DefaultText lowercase>
                            {Resources[`CHALLENGE_CREATION_AWARD_TYPE_DESCRIPTION_${type.code}`]}
                          </DefaultText>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )) }
            </Grid>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(AwardType)
