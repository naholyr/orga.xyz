"use strict"

import {Actions} from "flummox"


export default class PollActions extends Actions {

  select(workshop, hour, who) {
    return {
      "workshop": workshop,
      "hour": hour,
      "who": who
    }
  }

  unselect(workshop, hour, who) {
    return {
      "workshop": workshop,
      "hour": hour,
      "who": who
    }
  }

  updateWho(name) {
    return name
  }

}
