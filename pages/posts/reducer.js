import produce from "immer"

const initState = {
  editPost: {},
  posts: []
}

const reducerPost = produce((draft, action) => {
  switch (action.type) {
    case "POST::SET_EDIT_POST": {
      draft.editPost = action.payload
      break
    }
    case "POST::SET_POSTS": {
      draft.posts = action.payload
      break
    }
  }
}, initState)

export default reducerPost