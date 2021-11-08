import React from 'react'
import {connect} from 'react-redux'
import {CardMedia, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {Card, BigText, DefaultText} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import _ from 'lodash'

const useStyles = makeStyles({
    card: {
      margin: 0,
      padding: 10,
      height: '100%'
    },
    cardContent: {
      height: '100%',
      paddingBottom: '40px'
    },
    typeItem: {
      cursor: 'pointer',
      width: 300,
      borderRadius: 34,
      transition: 'transform .5s',
      '&:hover': {


          transform: 'scale(1.05)',

      },
      '& .MuiPaper-root': {
        height: '100%',
        borderRadius: 30,
      }
    },
    disabledItem: {
      '& .MuiCardMedia-root': {

        filter: 'grayscale(1)',
      },
      opacity: '0.6'
    },
    active: {
      background: '#00E58D'
    },
    icon: {
      height: 120,
      width: 120
    },
    rewardTypeIcon: {
      height: 20,
      width: 20,
      marginTop: '1px'
    }
})

const AwardType = ({types, currentType, setType, participantsNumber, ...props}) => {
    const classes = useStyles()
    const coinImage = require(`../../../../../../assets/img/system/challenge/icons/coin.png`)
    const giftImage = require(`../../../../../../assets/img/system/challenge/icons/gift.png`)

    const typesData = {
      'R': {
        minimumParticipants: 2,
        order: 1,
        icon: require(`../../../../../../assets/img/system/challenge/icons/Ribbons.png`),
        availableReward: ['points', 'gift']
      },
      'M': {
        order: 2,
        icon: require(`../../../../../../assets/img/system/challenge/icons/Rocket.png`),
        availableReward: ['points']
      },
      'P': {
        order: 3,
        icon: require(`../../../../../../assets/img/system/challenge/icons/Levels.png`),
        availableReward: ['gift']
      }
    }

    const isDisabled = type => (
      type.code === 'P' ||
      typesData[type.code].minimumParticipants && participantsNumber < typesData[type.code].minimumParticipants
    )

    return (
        <div>
            <Grid container spacing={1} justify='space-around'>
                { _.sortBy(types, type => typesData[type.code].order).map(type => (
                  <Grid item onClick={() => !isDisabled(type) && setType(type.id)} className={
                      `${classes.typeItem} ${type.id === currentType ? classes.active : ''} ${isDisabled(type) ? classes.disabledItem : ''}`
                    } style={{marginBottom: 20, position: 'relative'}}>
                    <Card marginDisabled className={classes.card} contentClassName={classes.cardContent}>
                      <Grid container spacing={1} direction='column' alignItems='center'>
                        <Grid item>
                          <CardMedia image={typesData[type.code].icon} className={classes.icon} />
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
                        {isDisabled(type) && typesData[type.code].minimumParticipants && (
                          <Grid item>
                              <DefaultText lowercase style={{color: '#E50000', textAlign: 'center'}}>
                                {Resources[`CHALLENGE_CREATION_AWARD_TYPE_MINIMUM_PARTICIPANTS`].format(typesData[type.code].minimumParticipants)}
                              </DefaultText>
                          </Grid>
                        )}
                        {isDisabled(type) && type.code === 'P' && (
                          <Grid item>
                              <DefaultText lowercase style={{color: '#E50000', textAlign: 'center'}}>
                                Bientôt disponible
                              </DefaultText>
                          </Grid>
                        )}
                        <Grid item style={{width: '100%'}} style={{position: 'absolute', width: '94%', bottom: 16}}>
                          <Grid container justify='space-between'>
                            <Grid item>
                              { typesData[type.code].availableReward.indexOf('points') >= 0 && (
                                <Grid container spacing={1}>
                                  <Grid item>
                                    <CardMedia image={coinImage} className={classes.rewardTypeIcon} />
                                  </Grid>
                                  <Grid item>
                                    <DefaultText lowercase>
                                      Points
                                    </DefaultText>
                                  </Grid>
                                </Grid>
                              ) }
                            </Grid>
                            <Grid item>
                              { typesData[type.code].availableReward.indexOf('gift') >= 0 && (
                                <Grid container spacing={1}>
                                  <Grid item>
                                    <CardMedia image={giftImage} className={classes.rewardTypeIcon} />
                                  </Grid>
                                  <Grid item>
                                    <DefaultText lowercase>
                                      Cadeau
                                    </DefaultText>
                                  </Grid>
                                </Grid>
                              ) }
                            </Grid>
                          </Grid>
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
