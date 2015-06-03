"use strict"

import path from "path"
import fsp from "fsp"
import without from "lodash/array/without"
import find from "lodash/collection/find"


const DATA_FILE = path.join(__dirname, "..", "data.json")

function load() {
  return fsp.readFileP(DATA_FILE).then(JSON.parse)
}

function write(data) {
  return fsp.writeFileP(DATA_FILE, JSON.stringify(data, null, "  ")).then(() => data)
}


class Backend {

  load() {
    return load()
  }

  addSelection(sel) {
    return load().then(data => {
      data.selections.push(sel)
      return write(data).then(() => data.selections)
    })
  }

  removeSelection(sel) {
    return load().then(data => {
      data.selections = without(data.selections, find(data.selections, sel))
      return write(data).then(() => data.selections)
    })
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
