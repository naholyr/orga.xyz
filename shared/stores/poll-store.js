"use strict"

import {Store} from "flummox"
import find from "lodash/collection/find"


export default class PollStore extends Store {

  constructor(flux) {
    super();

    this.state = {
      "showReport": false,
      "showTable": true
    }

    const pollActions = flux.getActions("poll")
    this.register(pollActions.select, this.onUpdateSelections)
    this.register(pollActions.unselect, this.onUpdateSelections)
    this.register(pollActions.updateWho, this.onUpdateWho)
    this.register(pollActions.load, this.onLoad)
    this.register(pollActions.toggleTable, this.onToggleTable)
    this.register(pollActions.toggleReport, this.onToggleReport)
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

  onToggleReport(show) {
    this.setState({"showReport": show})
  }

  onToggleTable(show) {
    this.setState({"showTable": show})
  }

  isValidWho(who) {
    return who.length > 0 && !who.match(/^\s+/) && !who.match(/\s+$/)
  }

}
