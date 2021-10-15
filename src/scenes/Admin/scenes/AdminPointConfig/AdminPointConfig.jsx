import React from 'react'
import { MainLayoutComponent } from '../../../../components'
import { ParticipantTypeFilter, PlayerPointConfig, TeamPointConfig } from './components'

class AdminPointConfig extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            type: 'P'
        }
    }

    handleTypeChange(type) {
        this.setState({
            ...this.state,
            type: type
        })
    }

    componentDidMount() {
        this.props.activateReturn();
        this.props.handleTitle('Administration');
        this.props.handleMaxWidth('md');
        this.props.handleSubHeader(<ParticipantTypeFilter handleTypeChange={this.handleTypeChange.bind(this)} />)
    }

    render() {
      console.log('qdssqdqsd');
        const periodId = this.props.match.params.periodId;
        return (
            <div>
                { this.state.type == 'P' &&  <PlayerPointConfig period={periodId} />}
                { this.state.type == 'T' && <TeamPointConfig period={periodId} /> }
            </div>
        )
    }
}

export default AdminPointConfig
