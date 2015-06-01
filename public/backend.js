import data from "../data.json"

class Backend {

  load() {
    return fetch("/data").then(fetchResponse)
  }

  addSelection(sel) {
    return fetch("/selections", {
      "method": "POST",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify(sel)
    }).then(fetchResponse)
  }

  removeSelection(sel) {
    return fetch("/selections", {
      "method": "DELETE",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify(sel)
    }).then(fetchResponse)
  }

  updateSession(name) {
    return fetch("/session", {
      "method": "PUT",
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify({"name": name})
    }).then(fetchResponse).then(() => name)
  }

}

export default new Backend()

function fetchResponse (res) {
  if (res.status >= 400) {
    return Promise.reject(res)
  } else {
    return res.json()
  }
}
