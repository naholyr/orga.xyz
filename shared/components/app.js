"use strict"

import React from "react"
import StatusMessage from "./status-message"
import PollTable from "./poll-table"
import PollReport from "./poll-report"
import Nav from "./nav"
import throttle from "lodash/function/throttle"


// Declare here for global throttling
const updateWho = throttle((flux, who) => flux.getActions("poll").updateWho(who), 5000)

export default class App extends React.Component {
  onChangeWho(e) {
    updateWho(this.props.flux, e.target.value)
  }

  render() {
    const input = this.props.showTable ? <input placeholder="Entrez votre nom" defaultValue={ this.props.who } onChange={ e => this.onChangeWho(e) } /> : null
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
