import produce from "immer"
import { findIndex } from "lodash"

const initState = {
  list: [],
  selectedConversation: null,
  messages: []
}

const reducerConversation = produce((draft, action) => {
  switch (action.type) {
    case "CONVERSATION::GET_CONVERSATIONS": {
      draft.list = action.payload
      break
    }

    case "CONVERSATION::SEND_MESSAGE": {
      draft.messages.unshift(action.payload.message)

      break
    }

    case "CONVERSATION::SET_SELECTED_CONVERSATION": {
      draft.selectedConversation = action.payload
      break
    }

    case "CONVERSATION::GET_MESSAGES": {
      draft.messages = action.payload
      break
    }

    case "CONVERSATION::UPDATE_CONVERSATION": {
      let indexCon = findIndex(draft.list, el => el.id == draft.selectedConversation)

      if (indexCon > -1) {
        draft.list[indexCon] = action.payload
      }
      break
    }
  }
}, initState)

export default reducerConversation