"use strict"

import React from "react"
import Flux from "../flux"


export default class PollSwitch extends React.Component {
  static propTypes = {
    "flux": React.PropTypes.instanceOf(Flux).isRequired,
    "workshop": React.PropTypes.string.isRequired,
    "hour": React.PropTypes.string.isRequired,
    "who": React.PropTypes.string.isRequired
  }

  toggle(select) {
    const actions = this.props.flux.getActions("poll")

    if (select) {
      actions.select(this.props.workshop, this.props.hour, this.props.who)
    } else {
      actions.unselect(this.props.workshop, this.props.hour, this.props.who)
    }
  }

  render() {
    const store = this.props.flux.getStore("poll")
    const validWho = store.isValidWho(this.props.who)
    const found = store.findSelection(this.props)
    const who = found ? found.who : (validWho && this.props.who) // The one who checked this cell, or myself
    const enabled = validWho && this.props.who && (!found || this.props.who === found.who) // Free cell or mine
    const label = found && found.who
    const selected = found && enabled

    return (
      <button
        className={ selected ? "selected" : "" }
        disabled={ !enabled }
        title={ who }
        onClick={ () => this.toggle(!selected) }
        >
        { label }
      </button>
    )
  }
}
