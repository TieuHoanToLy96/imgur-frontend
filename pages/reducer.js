import produce from "immer"

const initState = {
  token: ""
}

const reducerIndex = produce((draft, action) => {
  switch (action.type) {
    case "INDEX::SET_TOKEN": {
      draft.token = action.payload
      break
    }
  }
}, initState)

export default reducerIndex
