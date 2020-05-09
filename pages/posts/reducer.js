import produce from "immer"
import { findIndex } from "lodash"

const initState = {
  editPost: {
    comments: []
  },
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

    case "POST::SET_COMMENT": {
      let comments = draft.editPost.comments || []
      let index = findIndex(comments, el => el.id == action.payload.id)
      if (!action.payload.parent_id) {
        if (index > -1) {
          draft.editPost.comments[index] = action.payload
        } else {
          draft.editPost.comments = comments.concat([action.payload])
          draft.editPost.count_comments = draft.editPost.count_comments + 1
        }
      } else {
        let parentIndex = findIndex(comments, el => el.id == action.payload.parent_id)
        if (parentIndex > -1) {
          draft.editPost.comments[parentIndex].child_comments.push(action.payload)
          draft.editPost.count_comments = draft.editPost.count_comments + 1
        }
      }
      break
    }

    case "POST::SET_COMMENTS": {
      draft.editPost.count_comments = action.payload.count
      draft.editPost.comments = (draft.editPost ?.comments || []).concat(action.payload.comments)
      break
    }

    case "POST::SET_REACTION": {
      let reactions = draft.editPost.reactions || []
      let index = findIndex(reactions, el => el.id == action.payload.id)
      console.log(index, "dddd")
      if (index > -1) {
        draft.editPost.reactions[index] = action.payload

      } else {
        draft.editPost.reactions = reactions.concat([action.payload])
      }
      break
    }
  }
}, initState)

export default reducerPost