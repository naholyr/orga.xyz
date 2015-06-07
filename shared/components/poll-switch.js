"use strict"

import React from "react"
import Flux from "../flux"
import contains from "lodash/collection/contains"
import map from "lodash/collection/map"


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
    const label = found ? map(found.who, name => <div key={ name } className={ (name === this.props.who ? "myself " : "") + "name" }>{ name }</div>) : []
    const selected = found && contains(found.who, this.props.who)

    return (
      <button
        className={ (selected ? "selected " : "") + " names-" + label.length }
        disabled={ !validWho }
        title={ found && found.who }
        onClick={ () => this.toggle(!selected) }
        >
        { label }
      </button>
    )
  }
}
