"use strict"

import {Flummox} from "flummox"
import PollActions from "./actions/poll-actions"
import PollStore from "./stores/poll-store"


export default class Flux extends Flummox {
  constructor(backend) {
    super()

    this.createActions("poll", PollActions, this, backend)
    this.createStore("poll", PollStore, this)
  }
}
