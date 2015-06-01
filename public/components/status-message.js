"use strict"

import React from "react"
import {branch} from "baobab-react/higher-order"


export default class StatusMessage extends React.Component {
  static propTypes = {
    message: React.PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      message: this.props.message
    }
  }

  render() {
    if (!this.state.message) {
      return null
    }

    return <div>{ this.state.message }</div>
  }
}
