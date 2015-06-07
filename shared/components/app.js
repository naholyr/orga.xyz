"use strict"

import React from "react"
import StatusMessage from "./status-message"
import PollTable from "./poll-table"
import PollReport from "./poll-report"
import Nav from "./nav"
import throttle from "lodash/function/throttle"
import connectToStores from "flummox/connect"
import Flux from "../flux"


// Declare here for global throttling
const updateWho = throttle((flux, who) => flux.getActions("poll").updateWho(who), 5000)

class App extends React.Component {
  static propTypes = {
    "flux": React.PropTypes.instanceOf(Flux).isRequired,
    "who": React.PropTypes.string.isRequired,
    "hours": React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    "workshops": React.PropTypes.objectOf(React.PropTypes.string).isRequired,
    "selections": React.PropTypes.arrayOf(React.PropTypes.shape({
      "workshop": React.PropTypes.string.isRequired,
      "hour": React.PropTypes.string.isRequired,
      "who": React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    })).isRequired,
    "showTable": React.PropTypes.bool.isRequired,
    "showReport": React.PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)

    // "who" is a state here for better reactivity (*)
    this.state = {"who": props.who}
  }

  onChangeWho(e) {
    if (this.props.flux.getStore("poll").isValidWho(e.target.value)) {
      // (*) Note this function is throttled because it's an onChange
      // (*) so prop "who" will not always be updated, which could cause undecent latency
      updateWho(this.props.flux, e.target.value)
      // (*) So we rely on state
    }
    this.setState({"who": e.target.value})
  }

  render() {
    const {flux, hours, workshops, selections, showTable, showReport} = this.props
    const who = this.state.who
    const isValidWho = who && flux.getStore("poll").isValidWho(String(who))

    const input = showTable ? <input placeholder="Entrez votre nom" defaultValue={ who } onChange={ e => this.onChangeWho(e) } className={ isValidWho ? "" : "error" } /> : null
    const inputError = !isValidWho ? <strong className="error">Entrez un nom valide pour participer</strong> : null

    const tableProps = {flux, who, hours, workshops, selections}
    const table = showTable ? <PollTable { ...tableProps } /> : null

    const reportProps = tableProps
    const report = showReport ? <PollReport { ...reportProps } /> : null

    const navProps = {showTable, showReport}
    const nav = <Nav { ...navProps } />

    return (
      <div className="poll">
        { input } { inputError }
        { table }
        { nav }
        { report }
        <StatusMessage />
      </div>
    );
  }
}


const AppHandler = connectToStores(App, ["poll"])

export default AppHandler
