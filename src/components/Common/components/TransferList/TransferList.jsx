import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Collaborator, DefaultTitle, Button } from '../../..'
import _ from 'lodash'

const styles = {
  item: {
    marginBottom: 10,
  }
}

const TransferList = ({ listIn, selected, onChange, ...props }) => {
    const { classes } = props
    const [selectedList, setSelectedList] = useState(selected || [])
    const selectItem = (item) => {
      if(_.indexOf(selectedList, item) < 0) {
        setSelectedList([item, ...selectedList])
      }
    }

    const removeItem = (item) => {
      if(_.indexOf(selectedList, item) >= 0) {
        setSelectedList(selectedList.filter(selectedItem => selectedItem !== item))
      }
    }

    const addList = (items) => {
      setSelectedList([...items, ...selectedList])
    }

    const emptySelected = () => {
      setSelectedList([])
    }

    React.useEffect(() => {
      onChange(selectedList)
    }, [selectedList])

    const choices = _.differenceWith(listIn, selectedList, _.isEqual)

    return (
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={5}>
              <Button color="secondary" onClick={ () => addList(choices) }>
                {`Ajouter tout (${ choices.length })`}
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button color="secondary" onClick={ emptySelected }>
                {`Retirer tout (${ selectedList.length })`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item xs={5}>
              { choices.map((collaborator, collaboratorKey) => (
                <div onClick={() => selectItem(collaborator)} className={ classes.item }>
                  <Collaborator key={collaboratorKey} collaborator={collaborator} />
                </div>
              )) }
            </Grid>
            <Grid item xs={5}>
              { selectedList.map((collaborator, collaboratorKey) => (
                <div onClick={() => removeItem(collaborator)} className={ classes.item }>
                  <Collaborator key={collaboratorKey} collaborator={collaborator} />
                </div>
              )) }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
}

export default withStyles(styles)(TransferList)
