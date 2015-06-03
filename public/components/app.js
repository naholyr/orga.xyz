"use strict"

import React from "react"
import StatusMessage from "./status-message"
import PollTable from "./poll-table"
import PollReport from "./poll-report"
import Nav from "./nav"


export default class App extends React.Component {
  onChangeWho(who) {
    this.props.flux.getActions("poll").updateWho(who)
  }

  render() {
    const input = this.props.showTable ? <input placeholder="Entrez votre nom" value={ this.props.who } onChange={ (e) => this.onChangeWho(e.target.value) } /> : null
    const table = this.props.showTable ? <PollTable { ...this.props } /> : null
    const report = this.props.showReport ? <PollReport { ...this.props } /> : null

    return (
      <div className="poll">
        <Nav { ...this.props } />
        { input }
        { table }
        { report }
        <StatusMessage />
      </div>
    );
  }
}
