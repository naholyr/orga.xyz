"use strict"

import {Store} from "flummox"
import without from "lodash/array/without"
import find from "lodash/collection/find"


export default class PollStore extends Store {

  constructor(flux) {
    super();

    const pollActions = flux.getActions('poll')
    this.register(pollActions.select, this.onSelect)
    this.register(pollActions.unselect, this.onUnselect)
    this.register(pollActions.updateWho, this.onUpdateWho)
  }

  findSelection(selection) {
    return find(this.state.selections, {
      "workshop": selection.workshop,
      "hour": selection.hour
    })
  }

  onSelect(selection) {
    const found = this.findSelection(selection)

    this.setState({
      "selections": without(this.state.selections, found).concat(selection)
    })
  }

  onUnselect(selection) {
    const found = this.findSelection(selection)

    this.setState({
      "selections": without(this.state.selections, found)
    })
  }

  onUpdateWho(who) {
    this.setState({
      "who": who
    })
  }
}
