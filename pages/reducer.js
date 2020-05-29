import produce from "immer"

const initState = {
  post: {
    count: 0,
    posts: []
  },
  account: {
    count: 0,
    accounts: []
  },
  all: {
    count: 0,
    posts: []
  }
}

const reducerIndex = produce((draft, action) => {
  switch (action.type) {
    case "INDEX::SET_POST": {
      draft.post = action.payload
      break
    }

    case "INDEX::SET_ACCOUNT": {
      draft.account = action.payload
      break
    }

    case "INDEX::SET_ALL": {
      draft.all = action.payload
      break
    }
  }
}, initState)

export default reducerIndex
