"use strict"

import {Store} from "flummox"
import find from "lodash/collection/find"


export default class PollStore extends Store {

  constructor(flux) {
    super();

    const pollActions = flux.getActions("poll")
    this.register(pollActions.select, this.onUpdateSelections)
    this.register(pollActions.unselect, this.onUpdateSelections)
    this.register(pollActions.updateWho, this.onUpdateWho)
    this.register(pollActions.load, this.onLoad)
  }

  findSelection(selection) {
    return find(this.state.selections, {
      "workshop": selection.workshop,
      "hour": selection.hour
    })
  }

  onUpdateSelections(selections) {
    this.setState({
      "selections": selections
    })
  }

  onUpdateWho(who) {
    this.setState({
      "who": who
    })
  }

  onLoad(data) {
    this.setState(data)
  }
}
