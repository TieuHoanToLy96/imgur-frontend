import produce from "immer"

const initState = {
  info: null
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
  }
}, initState)

export default reducerAccount
