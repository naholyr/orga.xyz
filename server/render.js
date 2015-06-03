"use strict"

import path from "path"
import {readFileSync} from "fs"
import React from "react"
import initComponent from "../shared/init-component"
import backend from "./backend"


const page = readFileSync(path.join(__dirname, "..", "public", "index.html"), {"encoding": "utf8"})

export default function render (url, staticMarkup, who) {
  // Initialize component (calling global "load" action)
  return initComponent(backend)
  // Server-side we do not load "who" state from global "load" action
  .then(component => {
    return component.props.flux.getActions("poll").updateWho(who).then(() => component)
  })
  // Generate final HTML
  .then(component => {
    const data = component.props.flux.getStore("poll").state
    const html = staticMarkup ? React.renderToStaticMarkup(component) : React.renderToString(component)
    return page
      .replace(/<!-- APP HERE -->/, html)
      .replace(/<!-- DATA HERE -->/, "window.POLL_DATA=" + JSON.stringify(data))
  })
}

export function middleware (req, res) {
  render(req.url, req.query.static, req.session.name)
  .then(html => res.status(200).send(html))
  .catch(err => res.status(500).send(err.stack))
}
