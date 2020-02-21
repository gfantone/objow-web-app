import React from 'react'
import { RankEvolutionDown, RankEvolutionEqual, RankEvolutionUp } from './components'

const RankEvolution = ({ evolution }) => {
    if (evolution > 0) {
        return <RankEvolutionUp />
    } else if (evolution < 0) {
        return <RankEvolutionDown />
    } else {
        return <RankEvolutionEqual />
    }
}

export default RankEvolution