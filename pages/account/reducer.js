import produce from "immer"

const initState = {
  info: {},
  user: {}
}

const reducerAccount = produce((draft, action) => {
  switch (action.type) {
    case "ACCOUNT::CREATE_ACCOUNT_SUCCESS": {
      draft.info = action.payload
      break
    }
    case "ACCOUNT::SIGN_IN_SUCCESS": {
      draft.info = action.payload
      break
    }
    case "ACCOUNT::SET_ACCOUNT": {
      draft.info = action.payload
      break
    }
    case "ACCOUNT::SET_USER": {
      draft.user = action.payload
      break
    }
  }
}, initState)

export default reducerAccount
