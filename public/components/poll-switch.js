"use strict"

import React from "react"
import find from "lodash/collection/find"


export default class PollSwitch extends React.Component {
  static propTypes = {
    "workshop": React.PropTypes.string.isRequired,
    "hour": React.PropTypes.string.isRequired
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
    const found = find(this.props.selections, {
      "workshop": this.props.workshop,
      "hour": this.props.hour
    })
    const who = found ? found.who : this.props.who // The one who checked this cell, or myself
    const enabled = !found || this.props.who === found.who // Free cell or mine
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
