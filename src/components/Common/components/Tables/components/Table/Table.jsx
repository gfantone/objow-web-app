import React from 'react'
import { Table } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
        borderRadius: 3,
        overflow: 'hidden'
    }
}

const CustomTable = ({backgroundDisabled = false, className, ...props}) => {
    const {classes} = props
    const rootClass = !backgroundDisabled ? classes.root : null

    return (
        <Table classes={{
            root: rootClass
        }} className={className}>
            { props.children }
        </Table>
    )
}

export default withStyles(styles)(CustomTable)
