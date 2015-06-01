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

    this.state = {
      "who": "John Doe",
      "workshops": {
        "foot": "Football",
        "maquillage": "Maquillage",
        "peche-ligne": "Pêche à la ligne"
      },
      "hours": [
        "10-11",
        "11-12",
        "14-15",
        "15-16"
      ],
      "selections": [
        { workshop: "foot", hour: "10-11", who: "Bob Morane" },
        { workshop: "foot", hour: "11-12", who: "John Doe" },
        { workshop: "peche-ligne", hour: "10-11", who: "John Doe" }
      ]
    }

    console.log("initialized store")
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
