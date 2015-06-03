"use strict"

import React from "react"


export default class StatusMessage extends React.Component {
  render() {
    if (!this.props.message) {
      return null
    }

    return <div>{ this.props.message }</div>
  }
}

StatusMessage.propTypes = {
  "message": React.PropTypes.string
}
