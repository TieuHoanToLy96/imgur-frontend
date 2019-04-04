import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import withRedux from "next-redux-wrapper"

import rootReducer from "./reducers"

export const store = (initState = {}) => {
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

export const connectRedux = (mapStateToProps, mapDispatchToProps) => {
  return (component) => withRedux(store, mapStateToProps, mapDispatchToProps)(component)
}

