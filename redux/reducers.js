import {combineReducers} from "redux"
import reducerIndex from "/pages/reducer.js"
import reducerAccount from "/pages/account/reducer"

const appReducer = combineReducers({
  account: reducerAccount
})

const rootReducer = (state, action) => {
  if (action.type == "SIGN_OUT") {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
