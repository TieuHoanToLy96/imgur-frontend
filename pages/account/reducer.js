import produce from "immer"

const initState = {
  info: {},
  user: {},
  countNoti: 0
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
    case "ACCOUNT::SET_COUNT_NOTI": {
      draft.countNoti = action.payload
      break
    }
  }
}, initState)

export default reducerAccount
