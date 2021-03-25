import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withStyles} from "@material-ui/core/styles"
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
  state = {
    metabase_response: '<div>loading</div>'
  }
  componentDidMount() {
    api.metabase.list().then(response => {
      this.setState({
        ...this.state,
        metabase_response: response.data
      });
    })
  }

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
      <div>
        <Iframe
          content={ this.state.metabase_response }
          className={classes.iframe}
          />
      </div>
    )
  }
}

const mapStateToProps = ({}) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminMetabase));
