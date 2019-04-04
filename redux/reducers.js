import {combineReducers} from "redux"
import reducerIndex from "/pages/reducer.js"
import reducerAccount from "/pages/account/reducer"

const rootReducer = combineReducers({
  account: reducerAccount
})

export default rootReducer
