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
  constructor(props) {
    super(props)
    // "who" is a state here for better reactivity (*)
    this.state = {"who": props.who}
  }

  onChangeWho(e) {
    // (*) Note this function is throttled because it's an onChange
    // (*) so prop "who" will not always be updated, which could cause undecent latency
    updateWho(this.props.flux, e.target.value)
    // (*) So we rely on state
    this.setState({"who": e.target.value})
  }

  render() {
    const props = {...this.props, ...this.state}
    const input = this.props.showTable ? <input placeholder="Entrez votre nom" defaultValue={ this.state.who } onChange={ e => this.onChangeWho(e) } /> : null
    const table = this.props.showTable ? <PollTable { ...props } /> : null
    const report = this.props.showReport ? <PollReport { ...props } /> : null

    return (
      <div className="poll">
        { input }
        { table }
        <Nav { ...props } />
        { report }
        <StatusMessage />
      </div>
    );
  }
}
