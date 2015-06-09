"use strict"

import React from "react"
import initComponent from "../shared/init-component"
import backend from "./backend"
import hopscotch from "hopscotch"
import findIndex from "lodash/array/findIndex"

const mount = document.getElementById("main")

initComponent(backend, window.POLL_DATA, props => {
  hopscotch.configure({"cookieName": "orgaxyz-tour-state"})

  // On end, remember user's choice
  let rememberNotShowTourAgain = true
  hopscotch.listen("close", function () {
    rememberNotShowTourAgain = false // OK to clear state on user's close
  })
  hopscotch.listen("end", function () {
    if (rememberNotShowTourAgain) {
      const name = "orgaxyz-tour-state"
      const value = "DONE"
      const days = 30

      try {
        sessionStorage.setItem(name, value)
      } catch (e) { // not writable or no sessionStorage feature
        let date = new Date()
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
        const expires = "; expires=" + date.toGMTString()
        document.cookie = name + "=" + value + expires + "; path=/";
      }
    }
  })

  const tour = {
    "id": "orgaxyz",
    "i18n": {
      "nextBtn": "Suivant",
      "prevBtn": "Précédent",
      "doneBtn": "Terminé",
      "skipBtn": "Ignorer",
      "closeTooltip": "Fermer"
    },
    "steps": [
      {
        "target": "h1",
        "placement": "left",
        "title": "Bienvenue sur orga",
        "content": "Cette application développée par l'APEL Cours Perrier nous aidera à organiser la supervision des ateliers de la Kermesse."
      },
      {
        "target": ".poll input",
        "placement": "right",
        "title": "Votre nom",
        "content": "Tout d'abord entrez votre nom complet pour vous inscrire au tableau des stands",
        "onShow": () => {
          if (props.flux.getStore("poll").isValidWho(document.querySelector(".poll input").value)) {
            hopscotch.nextStep()
          } else {
            hopscotch.getCurrTarget().focus()
          }
        },
        "onNext": () => {
          if (!props.flux.getStore("poll").isValidWho(document.querySelector(".poll input").value)) {
            hopscotch.showStep(1)
          }
        }
      },
      {
        "target": ".poll table thead th:nth-child(2)",
        "placement": "top",
        "title": "Tableau d'inscription",
        "content": "Cliquez sur la case correspondant au(x) stand(s) et au(x) tranche(s) horaire(s) que vous souhaitez superviser. 2 à 3 parents par stand et par horaire serait idéal."
      }
    ]
  }

  // Find an empty cell
  // Do it after a small delay to be sure everything is up to date
  setTimeout(() => {
    const cells = document.querySelectorAll(".poll table button:empty");
    if (cells.length > 0) {
      const target = cells[Math.round(Math.random()*cells.length)]
      const [workshop, hour] = (() => {
        try {
          const w = target.parentNode.parentNode.children[0].textContent
          const hi = findIndex(target.parentNode.parentNode.children, td => td.children[0] === target)
          const h = target.parentNode.parentNode.parentNode.parentNode.children[0]/*thead*/.children[1]/*2nd row = hours*/.children[hi - 1].textContent
          return [w, h]
        } catch (e) {
          return [null, null]
        }
      })()
      tour.steps.push({
        "target": target,
        "placement": "top",
        "title": "Un créneau vide !",
        "content": "Voilà par exemple <em>un créneau dont personne ne s'occupe</em>, cliquez sur cette case si vous acceptez de superviser "
          + ((workshop && hour) ? ("le stand <strong>" + workshop + " de " + hour + "</strong>") : "ce stand"),
        "yOffset": 25,
        "xOffset": 10
      })
      const onClick = () => hopscotch.endTour(false)
      // On registering workshop: end  tour
      target.addEventListener("click", onClick)
      // On ending tour: remove event from cell
      hopscotch.listen("end", () => target.removeEventListener("click", onClick))
    }
  }, 500)


  if (hopscotch.getState() === "DONE") {
    const btn = document.querySelector(".show-tour")
    btn.classList.remove("hidden")
    btn.addEventListener("click", () => hopscotch.startTour(tour, 0))
  } else {
    hopscotch.startTour(tour)
  }
})
.then(component => React.render(component, mount))
