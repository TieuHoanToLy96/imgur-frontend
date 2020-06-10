import Notification from "/components/Notification/index"
import { getHostName } from "/utils/tools"
import { sendGet, sendPost } from "/utils/request"

import io from 'socket.io-client'
const dev = process.env.node_env !== 'production'
const socket = io(dev ? "http://localhost:4000" : "https://tieuhoan.dev")

export const searchFriend = (params) => {
  let url = `${getHostName()}/api/v1/account/search_friend`
  return sendGet(url, params)
}

export const createConversation = params => {
  let url = `${getHostName()}/api/v1/conversations/create_conversation`

  return (dispatch, getState) => {
    return sendPost(url, {}, params)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          let conversations = getState().conversation.list
          conversations = [res.data.data.conversation].concat(conversations)

          dispatch({
            type: "CONVERSATION::GET_CONVERSATIONS",
            payload: conversations
          })
        }
      })
  }
}

export const getConversations = params => {
  let url = `${getHostName()}/api/v1/conversations/get_conversations`
  return dispatch => {
    return sendGet(url, params)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch({
            type: "CONVERSATION::GET_CONVERSATIONS",
            payload: res.data.data.conversations
          })
        }
      })
  }
}

export const sendMessage = params => {
  let url = `${getHostName()}/api/v1/conversations/send_message`

  return dispatch => {
    return sendPost(url, {}, params)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          socket.emit("conversation", { conversationId: params["conversation_id"], message: res.data.data.message })
        }
        return res
      })
  }
}

export const getMessages = params => {
  let url = `${getHostName()}/api/v1/conversations/get_messages`
  return dispatch => {
    return sendGet(url, params)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch({
            type: "CONVERSATION::GET_MESSAGES",
            payload: res.data.data.messages
          })
        }
      })
  }
}

export const socketUpdateMessages = data => {
  return (dispatch, getState) => {
    let account = getState().account.info
    // let messages = getState().conversation.messages
    // messages = [{ ...data.message, is_left: account.id != data.message.account_id }].concat(messages)
    dispatch({
      type: "CONVERSATION::SEND_MESSAGE",
      payload: { message: { ...data.message, is_left: account.id != data.message.account_id } }
    })
  }
}

export const setSelectedConversation = id => ({
  type: "CONVERSATION::SET_SELECTED_CONVERSATION",
  payload: id
})

export const updateConversation = params => {
  return dispatch => {
    let url = `${getHostName()}/api/v1/conversations/update_conversations`

    return sendPost(url, {}, params)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          dispatch({
            type: "CONVERSATION::UPDATE_CONVERSATION",
            payload: res.data.data.conversation
          })
          Notification.success("Cập nhật hội thoại thành công")
        }
      })
  }
}
