import React from 'react'
import { YearPicker } from '../../..'

const YearFilter = ({onChange, defaultDate}) => {
    const [year, setYear] = React.useState(null)

    const handleYearChange = value => {
        const date = value != null ? new Date(Date.UTC(value.getFullYear(), 0, 1)) : null
        setYear(date)
        onChange(date)
    }

    return (
        <div>
            <YearPicker name='year' initial={defaultDate ? defaultDate : null} label='Année' value={year} onChange={handleYearChange} clearable fullWidth />
        </div>
    )
}

export default YearFilter
