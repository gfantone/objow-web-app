import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AppBarSubTitle, Card, FileInput, MainLayoutComponent, ProgressButton } from '../../../../components'
import Formsy from 'formsy-react'
import * as systemImageUpdateActions from '../../../../services/SystemImages/SystemImageUpdate/actions'

const styles = {
    logo: {
        height: 100,
        width: 200,
        backgroundSize: 'contain'
    }
};

class AdminLogo extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.props.systemImageUpdateActions.clearSystemImageUpdate()
    }

    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title='Changement du logo' />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn()
    }

    handleSubmit(model) {
        if (model.logo) {
            const image = new FormData();
            image.append('code', 'LOGO');
            image.append('src', model.logo);
            this.props.systemImageUpdateActions.updateSystemImage('LOGO', image)
        }
    }

    render() {
        const { classes } = this.props;
        const { images } = this.props.systemImageList;
        const { success, loading } = this.props.systemImageUpdate;
        var logo = images ? images.find(x => x.code == 'LOGO').src : null;

        if (success) {
            this.props.systemImageUpdateActions.clearSystemImageUpdate();
            this.props.history.goBack()
        }

        if (!logo) {
            logo = '/assets/img/system/logo.png'
        }

        return (
            <div>
                <Formsy onSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} container justify='center'>
                                        <Grid item>
                                            <CardMedia image={logo} className={classes.logo} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container justify='center'>
                                        <Grid item>
                                            <FileInput name='logo' accept='image/*' />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <ProgressButton type='submit' text='Valider' centered loading={loading} />
                        </Grid>
                    </Grid>
                </Formsy>
            </div>
        )
    }
}

const mapStateToProps = ({ systemImageList, systemImageUpdate }) => ({
    systemImageList,
    systemImageUpdate
});

const mapDispatchToProps = (dispatch) => ({
    systemImageUpdateActions: bindActionCreators(systemImageUpdateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminLogo))