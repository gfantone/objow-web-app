import React from 'react'
import { YearPicker } from '../../..'

const YearFilter = ({onChange}) => {
    const [year, setYear] = React.useState(null)

    const handleYearChange = value => {
        const date = value != null ? new Date(Date.UTC(value.getFullYear(), 0, 1)) : null
        setYear(date)
        onChange(date)
    }

    return (
        <div>
            <YearPicker name='year' label='Année' value={year} onChange={handleYearChange} clearable fullWidth />
        </div>
    )
}

export default YearFilter