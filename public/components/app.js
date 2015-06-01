"use strict"

import React, {Component} from "react"
import StatusMessage from "./status-message"
import PollTable from "./poll-table"


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
        <label>
          Entrez votre nom pour réserver une tranche horaire :
          <input placeholder="Votre nom" value={ this.state.who } onChange={ (e) => this.setState({ who: e.target.value }) } />
        </label>
        <PollTable who={ this.state.who } />
        <StatusMessage />
      </div>
    );
  }
}
