"use strict"

import path from "path"
import data from "../data.json"
import without from "lodash/array/without"
import find from "lodash/collection/find"
import Redis from "ioredis"
import config from "./config.json"
import map from "lodash/collection/map"


const client = new Redis(config.redis)

function buildSelection (who, field) {
  // field = "workshop//hour"
  const [workshop, hour] = field.split("//")
  return {workshop, hour, who}
}

function getSelections () {
  return client.hgetall(config.selectionsKey)
  .then(result => map(result, buildSelection))
}

class Backend {

  load() {
    // grab selections and merge that with static data to forge global state
    return getSelections().then(selections => ({...data, selections}))
  }

  addSelection(sel) {
    const field = sel.workshop + "//" + sel.hour
    return client.hset(config.selectionsKey, field, sel.who).then(getSelections)
  }

  removeSelection(sel) {
    const field = sel.workshop + "//" + sel.hour
    return client.hdel(config.selectionsKey, field).then(getSelections)
  }

  updateSession(sess, req) {
    if (req) {
      req.session.name = sess.name
    }
    return Promise.resolve(sess)
  }

  middleware(method) {
    return (req, res) => {
      method(req.body, req, res).then(result => res.send(result)).catch(err => res.status(500).send({"error": err.stack}))
    }
  }

}

export default new Backend()
