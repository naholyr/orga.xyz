"use strict"

import path from "path"
import fsp from "fsp"
import React from "react"
import spread from "lodash/function/spread"
import initComponent from "../public/init-component"
import backend from "./backend"


export default function render (url, staticMarkup) {
  return Promise.all([
    initComponent(backend),
    fsp.readFileP(path.join(__dirname, "..", "public", "index.html"), {"encoding": "utf8"})
  ])
  .then(spread((component, page) => {
    var html = staticMarkup ? React.renderToStaticMarkup(component) : React.renderToString(component)
    return page.replace(/<!-- APP HERE -->/, html)
  }))
}

export function middleware (req, res) {
  render(req.url, req.query.static)
  .then(html => res.status(200).send(html))
  .catch(err => res.status(500).send(err.stack))
}
