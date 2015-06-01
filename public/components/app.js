"use strict"

import React, {Component} from "react"
import StatusMessage from "./status-message"
import PollTable from "./poll-table"
import PollReport from "./poll-report"


export default class App extends Component {
  static propTypes = {
    "who": React.PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {
      who: props.who || ""
    }
  }

  render () {
    return (
      <div className="poll">
        <input placeholder="Entrez votre nom" value={ this.state.who } onChange={ (e) => this.setState({ who: e.target.value }) } />
        <PollTable who={ this.state.who } />
        <PollReport who={ this.state.who } />
        <StatusMessage />
      </div>
    );
  }
}
