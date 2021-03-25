import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withStyles} from "@material-ui/core/styles"
import jwt from 'jsonwebtoken'

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

    const payload = {
      resource: { dashboard: 9 },
      params: {},
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    const token = jwt.sign(payload, process.env.REACT_APP_METABASE_SECRET_KEY);
    const iframeUrl = process.env.REACT_APP_METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";

    return(
      <iframe
        src={ iframeUrl }
        scrolling='no'
        frameborder="0"
        className={classes.iframe}
        allowtransparency
      />
    )
  }
}

const mapStateToProps = ({}) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminMetabase));
