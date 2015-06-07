"use strict"

import path from "path"
import data from "../data.json"
import Redis from "ioredis"
import config from "./config.json"
import without from "lodash/array/without"
import map from "lodash/collection/map"
import union from "lodash/array/union"


const client = new Redis(config.redis)

function getAll () {
  return client.hgetall(config.selectionsKey)
  .then(result => map(result, (value, key) => {
    const [workshop, hour] = key.split("//")
    const who = value.split("\n")
    return {workshop, hour, who}
  }))
}

function find ({workshop, hour}) {
  return client.hget(config.selectionsKey, workshop + "//" + hour)
  .then(names => names && names.split("\n"))
  .then(who => who && {workshop, hour, who})
}

function save (selection) {
  if (!selection) {
    return Promise.resolve(null)
  }

  const {workshop, hour, who} = selection
  return client.hset(config.selectionsKey, workshop + "//" + hour, Array.isArray(who) ? who.join("\n") : who)
  .then(() => selection)
}

function findAndModify (sel, modify) {
    return find(sel)
    .then(found => found ? modify(found) : sel)
    .then(save)
    .then(saved => saved || sel)
}


class Backend {

  load() {
    // grab selections and merge that with static data to forge global state
    return getAll()
    .then(selections => ({...data, selections}))
  }

  addSelection(sel) {
    return findAndModify(sel, found => ({...found, who: union(found.who, [sel.who])}))
    .then(getAll)
  }

  removeSelection(sel) {
    return findAndModify(sel, found => ({...found, who: without(found.who, sel.who)}))
    .then(getAll)
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
