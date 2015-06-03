"use strict"

import React from "react"
import initComponent from "../shared/init-component"
import backend from "./backend"

const mount = document.getElementById("main")

initComponent(backend, window.POLL_DATA).then(component => React.render(component, mount))
