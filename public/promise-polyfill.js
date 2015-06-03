import Yaku from "yaku"

if (!window.Promise) {
  window.Promise = Yaku
}

export default window.Promise
