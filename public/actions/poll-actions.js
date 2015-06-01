"use strict"

import {Actions} from "flummox"


export default class PollActions extends Actions {

  constructor(flux, backend) {
    super()

    this.backend = backend
  }

  load() {
    return this.backend.load()
  }

  select(workshop, hour, who) {
    return this.backend.addSelection({
      "workshop": workshop,
      "hour": hour,
      "who": who
    })
  }

  unselect(workshop, hour, who) {
    return this.backend.removeSelection({
      "workshop": workshop,
      "hour": hour,
      "who": who
    })
  }

  updateWho(name) {
    return this.backend.updateSession(name).then(() => name)
  }

}
