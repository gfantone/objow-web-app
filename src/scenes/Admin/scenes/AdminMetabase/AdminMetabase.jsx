import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {bindActionCreators} from 'redux'
import {withStyles} from "@material-ui/core/styles"
import { Loader } from '../../../../components'
import * as configListActions from '../../../../services/Configs/ConfigList/actions'
import jwt from 'jsonwebtoken'
import api from '../../../../data/api/api'
import { Iframe } from '../../../../components/Common/'

const styles = {
  iframe: {
    width: '100%',
    height: '800px',
    overflow: 'hidden'
  }
}

class AdminMetabase extends Component {
  render() {
    const {classes} = this.props;
    const { MTBS } = this.props


    if(!MTBS) {
      return(<div />)
    }

    const payload = {
      resource: { dashboard: parseInt(MTBS.value) },
      params: {},
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    const token = jwt.sign(payload, process.env.REACT_APP_METABASE_SECRET_KEY);
    // const iframeUrl = process.env.REACT_APP_METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
    const iframeUrl = `https://metabase.crayfish.fun/public/dashboard/${token}?filtre_de_date=thismonth`


    return(
      <div>
        <iframe
          src={ iframeUrl }
          scrolling='no'
          frameborder="0"
          className={classes.iframe}
          allowtransparency
        />
      </div>
    )
  }


}

const mapStateToProps = ({configList}) => ({
  configList
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminMetabase));
