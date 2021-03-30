import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { DefaultText, Loader, RoundedTabs, RoundedTab, AppBarSubTitle } from '../../../../../../components'

const styles = {

}

const SubHeader = ({ ...props }) => {
    const { classes } = props
    const [tabValue, setTabValue] = React.useState(0)
    const { configs, loading } = props.configList

    const renderLoader = () => {
        return <Loader centered />
    }

    const handleChangeTab = (event, value) => {
      props.handleChangeTab(value)
      setTabValue(value)
    }

    const renderData = () => {
        const MTBS = configs && configs.find(c => c.code === 'MTBS')

        if(!MTBS || !MTBS.value) {
          return (
            <AppBarSubTitle title='Liste des rapports' />
          )
        }

        return (
            <RoundedTabs onChange={handleChangeTab} variant='fullWidth' value={tabValue}>
              <RoundedTab label='Liste des rapports' />
              { MTBS && <RoundedTab label='Dashboard' /> }
            </RoundedTabs>
        )
    }

    return (
        <div className={classes.root}>
            { loading && renderLoader() }
            { !loading && configs && renderData() }
        </div>
    )
}

const mapStateToProps = ({ configList }) => ({
    configList
})

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))
