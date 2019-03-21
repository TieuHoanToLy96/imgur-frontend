import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import withRedux from "next-redux-wrapper"

import rootReducer from "./reducers"

const initStore = (initState = {}) => {
  return createStore(
    rootReducer,
    initState,
    compose(
      applyMiddleware(thunkMiddleware),
      typeof window !== "undefined" && window.devToolsExtension
        ? window.devToolsExtension()
        : f => f
    )
  )
}

export default (mapStateToProps, mapDispatchToProps) => {
  return (component) => withRedux(initStore, mapStateToProps, mapDispatchToProps)(component)
}