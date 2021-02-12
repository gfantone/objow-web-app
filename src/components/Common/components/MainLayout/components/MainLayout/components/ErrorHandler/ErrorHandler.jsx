import React from 'react'
import { connect } from 'react-redux'

const ErrorHandler = (props) => {
    return(
      <div>
        ERROR PAGE
      </div>
    )
};

const mapStateToProps = ({ }) => ({

});

export default connect(mapStateToProps)(ErrorHandler)
