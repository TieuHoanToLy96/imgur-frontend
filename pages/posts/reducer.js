import produce from "immer"

const initState = {
  editPost: {}
}

const reducerPost = produce((draft, action) => {
  switch (action.type) {
    case "POST::SET_EDIT_POST": {
      draft.editPost = action.payload
      break
    }
  }
}, initState)

export default reducerPost