import React from 'react'
import {Redirect} from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Grid, IconButton, RadioGroup } from '@material-ui/core'
import { SubHeader } from './components'
import { DefaultText, EmptyState, GreenRadio, IconButton as HeaderIconButton, Linkify, MainLayoutComponent, OrangeRadio, ProgressButton, RedRadio, TableChip, TextField } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as coachingItemListActions from '../../../../services/CoachingItems/CoachingItemList/actions'
import * as coachingItemListCreationActions from '../../../../services/CoachingItems/CoachingItemListCreation/actions'
import * as coachingItemListUpdateActions from '../../../../services/CoachingItems/CoachingItemListUpdate/actions'
import * as coachingItemRemovingActions from '../../../../services/CoachingItems/CoachingItemRemoving/actions'
import * as coachingItemUpdateActions from '../../../../services/CoachingItems/CoachingItemUpdate/actions'
import * as userDetailActions from '../../../../services/Users/UserDetail/actions'

class CoachingList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.loading = false;
        this.state = {
            items: []
        }
    }

    handleAddItem() {
        var items = this.state.items;
        items.push({ id: `N${items.length}`, instruction: null, state: 1, collaborator: this.id, isNew: true });
        this.setState({
            ...this.state,
            items: items
        })
    }

    handleChange = id => name => value => {
        const { account } = this.props.accountDetail;
        const items = this.state.items;
        const index = items.findIndex(item => item.id == id);
        items[index][name] = value;
        if (name == 'state' && account.role.code == 'C' && account.canUpdateCoaching) {
            this.props.coachingItemUpdateActions.updateCoachingItem(id, value)
        }
        this.setState({
            ...this.state,
            items: items
        })
    };

    handleRemoveItem = id => () => {
        const items = this.state.items;
        const index = items.findIndex(item => item.id == id);
        const item = items[index];
        if (!item.isNew) {
            this.props.coachingItemRemovingActions.removeCoachingItem(item.id)
        }
        items.splice(index, 1);
        this.setState({
            ...this.state,
            items: items
        })
    };

    handleSubmit(model) {
        const { account } = this.props.accountDetail;
        const isCollaborator = account.role.code == 'C';
        if (!isCollaborator) {
            this.loading = true;
            const oldItems = this.state.items.filter(item => !item.isNew);
            const newItems = this.state.items.filter(item => item.isNew);
            this.props.coachingItemListUpdateActions.updateCoachingItemList(oldItems);
            this.props.coachingItemListCreationActions.createCoachingItemList(newItems)
        }
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        const isCollaborator = account.role.code == 'C';
        this.props.handleTitle(Resources.COACHING_LIST_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader />);
        this.props.handleMaxWidth('md');
        if (!isCollaborator) {
            if (account.canUpdateCoaching) {
                this.props.handleButtons(<HeaderIconButton size='small' onClick={this.handleAddItem.bind(this)}><FontAwesomeIcon icon={faPlus} /></HeaderIconButton>)
            }
            this.props.activateReturn()
        }
        this.loading = true;
        this.props.coachingItemListActions.getCoachingItemList(this.id);
        this.props.userDetailActions.getUserDetail(this.id)
    }

    componentWillReceiveProps(props) {
        const { items } = props.coachingItemList;
        if (this.loading && items) {
            this.setState({
                ...this.state,
                items: items
            })
        }
    }

    renderEmptyState() {
        const message = this.props.accountDetail.account.role.code == 'C' ? Resources.COACHING_LIST_EMPTY_STATE_COLLABORATOR_MESSAGE : Resources.COACHING_LIST_EMPTY_STATE_MANAGER_MESSAGE;
        return (
            <EmptyState title={Resources.COACHING_LIST_EMPTY_STATE_TITLE} message={message} />
        )
    }

    renderData() {
        const { account } = this.props.accountDetail;
        const { loading: coachingItemListCreationLoading } = this.props.coachingItemListCreation;
        const { loading: coachingItemListUpdateLoading } = this.props.coachingItemListUpdate;
        const loading = coachingItemListCreationLoading || coachingItemListUpdateLoading;
        const isCollaborator = account.role.code == 'C';
        const canUpdateCoaching = !isCollaborator && account.canUpdateCoaching;

        return (
            <Formsy onSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid container spacing={2} item xs={12}>
                        { this.state.items.map(item => {
                            return (
                                <Grid key={item.id} item xs={12} container spacing={1}>
                                    <Grid item xs='auto'>
                                        <TableChip label='>' />
                                    </Grid>
                                    <Grid item xs>
                                        {!canUpdateCoaching && <Linkify><DefaultText>{item.instruction}</DefaultText></Linkify>}
                                        {canUpdateCoaching && <TextField lowercase name='instruction' initial={item.instruction} onChange={this.handleChange(item.id)('instruction')} fullWidth multiline />}
                                    </Grid>
                                    <Grid item xs='auto'>
                                        <RadioGroup row>
                                            <RedRadio name='state' value='1' checked={item.state == 1} onClick={() => this.handleChange(item.id)('state')(1)} />
                                            <OrangeRadio name='state' value='2' checked={item.state == 2} onClick={() => this.handleChange(item.id)('state')(2)} />
                                            <GreenRadio name='state' value='3' checked={item.state == 3} onClick={() => this.handleChange(item.id)('state')(3)} />
                                        </RadioGroup>
                                    </Grid>
                                    { canUpdateCoaching && <Grid item xs='auto'>
                                        <IconButton size='small' onClick={this.handleRemoveItem(item.id).bind(this)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </IconButton>
                                    </Grid> }
                                </Grid>
                            )
                        }) }
                    </Grid>
                    { canUpdateCoaching && account.canUpdateCoaching && <Grid item xs={12}>
                        <ProgressButton type='submit' text={Resources.COACHING_LIST_SUBMIT_BUTTON} loading={loading} centered />
                    </Grid> }
                </Grid>
            </Formsy>
        )
    }

    render() {
        const { account } = this.props.accountDetail;
        const { items, loading } = this.props.coachingItemList;

        if (!account.hasCoachingAccess) {
            return <Redirect to={'/'} />
        }

        return (
            <div>
                { !loading && items && items.length > 0 && this.renderData() }
                { !loading && items && items.length == 0 && this.renderEmptyState() }
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, coachingItemList, coachingItemListCreation, coachingItemListUpdate, userDetail}) => ({
    accountDetail,
    coachingItemList,
    coachingItemListCreation,
    coachingItemListUpdate,
    userDetail
});

const mapDispatchToProps = (dispatch) => ({
    coachingItemListActions: bindActionCreators(coachingItemListActions, dispatch),
    coachingItemListCreationActions: bindActionCreators(coachingItemListCreationActions, dispatch),
    coachingItemListUpdateActions: bindActionCreators(coachingItemListUpdateActions, dispatch),
    coachingItemRemovingActions: bindActionCreators(coachingItemRemovingActions, dispatch),
    userDetailActions: bindActionCreators(userDetailActions, dispatch),
    coachingItemUpdateActions: bindActionCreators(coachingItemUpdateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CoachingList)
