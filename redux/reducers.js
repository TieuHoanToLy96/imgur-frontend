import {combineReducers} from "redux"
import reducerIndex from "../pages/reducer.js"

const rootReducer = combineReducers({
  index: reducerIndex
})

export default rootReducer
