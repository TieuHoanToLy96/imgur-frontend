import { combineReducers } from "redux"
import reducerIndex from "/pages/reducer"
import reducerAccount from "/pages/account/reducer"
import reducerPost from "/pages/posts/reducer"
import reducerConversation from "/pages/conversations/reducer"

const appReducer = combineReducers({
  account: reducerAccount,
  conversation: reducerConversation,
  post: reducerPost,
  homePage: reducerIndex
})

const rootReducer = (state, action) => {
  if (action.type == "SIGN_OUT") {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
