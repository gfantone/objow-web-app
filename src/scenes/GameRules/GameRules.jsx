import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {DefaultText, Linkify, Loader, MainLayoutComponent} from '../../components'
import * as configListActions from '../../services/Configs/ConfigList/actions'

class GameRules extends MainLayoutComponent {
    componentDidMount() {
        this.props.handleTitle('Règles du jeu');
        this.props.handleMaxWidth('md');
        this.props.configListActions.getPermanentConfigList()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {configs} = this.props.configList;
        const config = configs.find(x => x.code == 'GR');

        return (
            <Linkify>
                <DefaultText align='justify'>
                    {config.value.split('\n').map((item, key) => {
                        return <span key={key}>{item}<br /></span>
                    })}
                </DefaultText>
            </Linkify>
        )
    }

    render() {
        const {configs, loading} = this.props.configList;

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && configs && this.renderData()}
            </div>
        )
    }
}

const mapStateToProps = ({configList}) => ({
    configList
});

const mapDispatchToProps = (dispatch) => ({
    configListActions: bindActionCreators(configListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GameRules)
