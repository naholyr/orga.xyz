"use strict"

import React from "react"
import App from "./components/app"

/*
import Baobab from "baobab"
import {root} from "baobab-react/higher-order"
import initializeTree from "./initialize-tree"
import {bindEvents} from "./action"

const tree = new Baobab()

console.log(require("util").inspect(tree))

initializeTree(tree)

console.log(require("util").inspect(tree))

bindEvents(tree)

const RootedApp = root(App, tree)

React.render(<RootedApp />, document.querySelector("#main"))

window.app = tree
*/

React.render(<App />, document.getElementById("main"))
