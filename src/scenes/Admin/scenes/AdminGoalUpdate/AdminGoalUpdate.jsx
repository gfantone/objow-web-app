import React from 'react'
import { Base, Customization, SubHeader } from './components'
import { MainLayoutComponent } from '../../../../components'

class AdminGoalUpdate extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.state = {
            page: 0
        }
    }

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        this.id = this.props.match.params.id;
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} readonly={!this.props.location.state} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn()
    }

    render() {
        return (
            <div>
                { this.state.page == 0 && <Base id={this.props.match.params.id} period={this.props.match.params.periodId} /> }
                { this.state.page == 1 && <Customization id={this.id} /> }
            </div>
        )
    }
}

export default AdminGoalUpdate
