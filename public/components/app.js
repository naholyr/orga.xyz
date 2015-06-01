"use strict"

import React from "react"
import StatusMessage from "./status-message"
import PollTable from "./poll-table"
import PollReport from "./poll-report"


export default class App extends React.Component {
  onChangeWho(who) {
    this.props.flux.getActions("poll").updateWho(who)
  }

  render() {
    return (
      <div className="poll">
        <input placeholder="Entrez votre nom" value={ this.props.who } onChange={ (e) => this.onChangeWho(e.target.value) } />
        <PollTable { ...this.props } />
        <PollReport { ...this.props } />
        <StatusMessage />
      </div>
    );
  }
}
