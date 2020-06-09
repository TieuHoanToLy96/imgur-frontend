import { Input, Modal, Select, Icon, Popover } from "antd"
import { Picker } from "emoji-mart"
import { connect } from "react-redux"
import { useState, useEffect } from "react"
import Router from "next/router"

import HOC from "/hoc/index"
import { searchFriend, createConversation, getConversations, sendMessage, getMessages, socketUpdateMessages, setSelectedConversation, updateConversation } from "/pages/conversations/actions"
import { useDebounce } from "/hook"

import io from 'socket.io-client'
const socket = io('http://localhost:4000')

const ModalUpdateConversation = props => {
  const { currentConversation, closeModal, updateConversation } = props
  const [title, setTitle] = useState(currentConversation ?.title || "")

  const handleUpdateConversation = () => {
    let data = { title: title, id: currentConversation.id }
    updateConversation(data).finally(() => closeModal())
  }

  const handleChangeTitle = e => {
    setTitle(e.target.value)
  }

  return (
    <Modal
      okText="Lưu"
      cancelText="Huỷ"
      className="modal-conversation"
      visible={true}
      title="Cập nhật cuộc hội thoại"
      onCancel={closeModal}
      onOk={handleUpdateConversation}>
      <Input value={title} onChange={handleChangeTitle} placeholder="Thêm tên cuộc hội thoại" />
    </Modal>
  )
}

const ModalConversation = props => {
  const { closeModal, createConversation } = props
  const [friends, setFriends] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [accountIds, setAccountIds] = useState([])

  const debounceSearchTerm = useDebounce(searchTerm, 500)

  const handleSearchFriend = (value) => {
    setSearchTerm(value)
  }

  const handleChangeSelect = value => {
    console.log(value, "valueeee")
    setAccountIds(value)
  }

  const handleCreateConversation = () => {
    let data = {
      account_ids: accountIds
    }
    createConversation(data).finally(() => closeModal())
  }

  useEffect(() => {
    if (searchTerm) {
      searchFriend({ term: searchTerm })
        .then(res => {
          if (res.status == 200 && res.data.success == true) {
            setFriends(res.data.data.friends)
          }
        })
    }
  }, [debounceSearchTerm])

  return (
    <Modal
      okText="Lưu"
      cancelText="Huỷ"
      className="modal-conversation"
      visible={true}
      title="Thêm cuộc hội thoại"
      onCancel={closeModal}
      onOk={handleCreateConversation}>
      <Select
        dropdownClassName="add-member"
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Thêm bạn bè"
        defaultValue={[]}
        onSearch={handleSearchFriend}
        onChange={handleChangeSelect}
        optionLabelProp="label">

        {
          friends.map((el, index) => (
            <Select.Option value={el.id} label={el.user_name} key={el.id}>
              <div className="item-member--wrapper" >
                <div className="item-member">
                  <div className="item-member--avatar">
                    <img src={el.avatar || "https://scontent.fhan5-3.fna.fbcdn.net/v/t1.0-1/p120x120/72248410_2402551333290738_2985091167953092608_n.jpg?_nc_cat=111&_nc_sid=7206a8&_nc_oc=AQlkH98u0uqa3oEP0b4bvzShxyRxtyCIlawqR4KwWuCpzF-UWg1RHWyJORMpnyGyUWA&_nc_ht=scontent.fhan5-3.fna&_nc_tp=6&oh=9df12770f7ffe6bb89cc2dbb462d3982&oe=5F007D81"} />
                  </div>

                  <div className="item-member--name">
                    {el.user_name}
                  </div>
                </div>
              </div>
            </Select.Option>
          ))
        }
      </Select>
    </Modal>
  )
}

const ListMember = props => {
  const { currentConversation } = props

  return (
    <div className="list-member--wrapper">
      <div className="list-member">
        <div className="item-member--wrapper">
          <div className="item-member">
            <div className="item-member--avatar">
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg==" />
            </div>

            <div className="item-member--name">
              Thêm thành viên
            </div>
          </div>
        </div>
        {
          currentConversation ?.conversation_accounts ?.map((el, index) => (
            <div className="item-member--wrapper" key={index}>
              <div className="item-member">
                <div className="item-member--avatar">
                  <img src={el.account.avatar} />
                </div>

                <div className="item-member--name">
                  {el.account.user_name}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const Message = props => {
  const { messages, selectedConversation, sendMessage, getMessages, socketUpdateMessages } = props
  const [message, setMessage] = useState("")
  const [loadingMessages, setLoadingMessages] = useState(false)

  const insertAtCursor = (textToInsert) => {
    const value = message
    let input = document.getElementById("sendMessage")
    const start = input.selectionStart
    const end = input.selectionEnd

    setMessage(value.slice(0, start) + textToInsert + value.slice(end))

    // update cursor to be at the end of insertion
    input.selectionStart = input.selectionEnd = start + 1;
  }
  const handleSelectEmoji = value => {
    insertAtCursor(value.native)
    // let v = `${message} ${value.native}`
    // setMessage(v)
  }

  const handleSendMessage = () => {
    sendMessage({ message: message, conversation_id: selectedConversation })
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          setMessage("")
        }
      })
  }

  const onChange = e => {
    let value = e.target.value
    setMessage(value)
  }

  useEffect(() => {
    if (selectedConversation) {
      socket.on(`con:${selectedConversation}`, data => {
        socketUpdateMessages(data)
      })
      setLoadingMessages(true)
      getMessages({ conversation_id: selectedConversation })
        .finally(() => setLoadingMessages(false))
    }
  }, [selectedConversation])

  return (
    <div className="is-flex">
      {
        selectedConversation ?
          loadingMessages ?
            <div className="list-message--wrapper list-message--wrapper__none">
              <Icon type="loading" style={{ fontSize: 40 }} />
            </div>
            :
            <div className="list-message--wrapper">
              <div className="list-message">
                {
                  messages.map((el, index) => (
                    <div className="item-message--wrapper">
                      {
                        <div className={`item-message ${!el.is_left ? "is-flex--end" : ""}`}>
                          {
                            el.is_left &&
                            <div className="item-message--avatar">
                              <img src={el.account.avatar} />
                            </div>
                          }

                          <div className="item-message--detail">
                            <div className="item-message--detail__content">
                              {el.message}
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  ))
                }
              </div>

              <div className="send-message--wrapper">
                <div className="send-message">
                  <div className="send-message--input">
                    <Input
                      id="sendMessage"
                      value={message}
                      onChange={onChange}
                      onPressEnter={handleSendMessage} suffix={
                        <Popover overlayClassName="emoji" content={<Picker theme="dark" onSelect={handleSelectEmoji} />}>
                          <Icon type="smile" />
                        </Popover>
                      } />
                  </div>
                  <div className="send-message--item" onClick={handleSendMessage}>
                    <svg height="36px" width="36px" viewBox="0 0 36 36"><g fill="none"><g><polygon points="0 36 36 36 36 0 0 0"></polygon><path d="M31.1059281,19.4468693 L10.3449666,29.8224462 C8.94594087,30.5217547 7.49043432,29.0215929 8.17420251,27.6529892 C8.17420251,27.6529892 10.7473302,22.456697 11.4550902,21.0955966 C12.1628503,19.7344961 12.9730756,19.4988922 20.4970248,18.5264632 C20.7754304,18.4904474 21.0033531,18.2803547 21.0033531,17.9997309 C21.0033531,17.7196073 20.7754304,17.5095146 20.4970248,17.4734988 C12.9730756,16.5010698 12.1628503,16.2654659 11.4550902,14.9043654 C10.7473302,13.5437652 8.17420251,8.34697281 8.17420251,8.34697281 C7.49043432,6.9788693 8.94594087,5.47820732 10.3449666,6.1775158 L31.1059281,16.553593 C32.298024,17.1488555 32.298024,18.8511065 31.1059281,19.4468693" fill="#0099ff"></path></g></g></svg>
                  </div>
                </div>
              </div>
            </div>
          :
          <div className="list-message--wrapper list-message--wrapper__none">
            <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style={{ verticalAlign: "middle", fontSize: 45 }}><g><path d="m22.7 28.6l2.1 1.4c-0.4 1.6-2.3 2.5-4.1 2.5h-7c-0.7 0-0.9 0.2-1.1 0.2l-4.1 3.6v-3.8h-1.2c-2.1 0-3.8-1.2-3.8-3.2v-10.1c0-1.9 1.6-3.5 3.6-3.5h0.1v7.9c0 2.6 2.3 4.6 5 4.6h9.2c0.8 0 1.1 0.2 1.3 0.4z m8.4-24.8c2.7 0 4.9 2.1 4.9 4.6v13.2c0 2.5-2.2 4.7-4.9 4.7h-1.3v5l-5.9-4.7c-0.2-0.2-0.6-0.3-1.3-0.3h-7.9c-2.8 0-4.9-2.2-4.9-4.7v-13.2c0-2.5 1.6-4.7 4.3-4.7h17z"></path></g></svg>
            Xin chọn 1 hội thoại từ danh sách bên trái
          </div>
      }

      <div className="conversation-detail--wrapper">
        <div className="conversation-detail">
          {
            props.currentConversation ?
              <ListMember {...props} />
              :
              <div className="conversation-detail--none">Chưa có thông tin</div>
          }
        </div>
      </div>

    </div>
  )
}

const ListConversation = props => {
  const { currentConversation, selectedConversation, account, listConversation, getConversations, setSelectedConversation } = props
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleModalUpdate, setVisibleModalUpdate] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loadingSearch, setLoadingSearch] = useState(false)

  const debounceSearchTerm = useDebounce(searchTerm, 500)

  const handleClickNewConversation = () => {
    setVisibleModal(true)
  }

  useEffect(() => {
    setLoadingSearch(true)
    if (debounceSearchTerm) {
      getConversations({ term: debounceSearchTerm }).finally(() => setLoadingSearch(false))
    } else {
      getConversations().finally(() => setLoadingSearch(false))
    }
  }, [debounceSearchTerm])

  return (
    <div>
      <div className="header-conversation--wrapper">
        <div className="header-conversation is-flex--space-between">
          <div className="is-flex is-flex--vcenter">
            <div className="header-conversation--avatar">
              <img src={account.avatar} />
            </div>
            <div className="header-conversation--title">
              Tin nhắn
          </div>
          </div>

          <div className="header-conversation--action is-flex is-center">
            {
              currentConversation &&
              <div className="header-conversation--action__item" onClick={() => setVisibleModalUpdate(true)}>
                <svg height="30px" width="30px" viewBox="0 0 36 36"><g id="compose" fill="none" stroke="none" stroke-width="1"><polygon id="Fill-1" points="0 36 36 36 36 0 0 0"></polygon><path id="Fill-2" d="M15.047,20.26245 L15.9815,17.45445 C16.091,17.12495 16.276,16.82495 16.5215,16.57945 L27.486,5.60195 C28.29,4.79695 29.595,4.79695 30.399,5.60195 C31.2025,6.40645 31.202,7.70895 30.399,8.51345 L19.432,19.49345 C19.186,19.73945 18.886,19.92495 18.556,20.03495 L15.7555,20.96995 C15.318,21.11645 14.901,20.69995 15.047,20.26245 Z M24.005,28.00095 L12.001,28.00095 C9.791,28.00095 8,26.20945 8,23.99995 L8,11.99895 C8,9.78945 9.791,7.99845 12.001,7.99845 L19.0035,7.99745 C19.5555,7.99745 20.0035,8.44545 20.0035,8.99745 C20.0035,9.54995 19.5555,9.99795 19.0035,9.99795 L12.001,9.99845 C10.8965,9.99845 10.0005,10.89395 10.0005,11.99895 L10.0005,23.99995 C10.0005,25.10445 10.8965,26.00045 12.001,26.00045 L24.005,26.00045 C25.1095,26.00045 26.005,25.10445 26.005,23.99995 C26.005,23.99995 26.0045,17.55145 26.0045,16.99895 C26.0045,16.44645 26.4525,15.99845 27.005,15.99845 C27.557,15.99845 28.005,16.44645 28.005,16.99895 C28.005,17.55145 28.0055,23.99995 28.0055,23.99995 C28.0055,26.20945 26.2145,28.00095 24.005,28.00095 Z" fill="#000000"></path></g></svg>
              </div>
            }
          </div>
        </div>
      </div>

      <div className="search-conversation--wrapper">
        <Input placeholder="Tìm kiếm cuộc hội thoại" allowClear prefix={<Icon type="search" />} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <div className="list-conversation--wrapper">
        {
          loadingSearch ?
            <div className="list-conversation__loading is-flex is-flex--center">
              <Icon type="loading" style={{ fontSize: 30 }} />
            </div>
            :
            <div className="list-conversation">
              <div className="item-conversation--wrapper">
                <div className="item-conversation">
                  <div className="item-conversation--avatar">
                    <div className="item-conversation--avatar__item">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg==" />
                    </div>
                  </div>
                  <div className="item-conversation--detail" onClick={handleClickNewConversation}>
                    <div className="item-conversation--detail__title">
                      Tin nhắn mới
                </div>
                  </div>
                </div>
              </div>
              {
                listConversation.map((el, index) => (
                  <div className={`item-conversation--wrapper ${selectedConversation == el.id ? "item-conversation--selected" : ""}`} key={index} onClick={() => setSelectedConversation(el.id)}>
                    <div className="item-conversation">
                      <div className="item-conversation--avatar">
                        {
                          el.conversation_accounts.filter(el => el.account.id != account.id).slice(0, 2).map((e, i) => (
                            <div className="item-conversation--avatar__item" key={i}>
                              <img src={e.account.avatar} />
                            </div>
                          ))
                        }
                      </div>

                      <div className="item-conversation--detail">
                        <div className="item-conversation--detail__title">
                          {
                            el.title ?
                              el.title
                              :
                              el.conversation_accounts.filter(el => el.account.id != account.id).map((e, i) => (
                                e.account.user_name
                              )).join(", ")
                          }
                        </div>
                        {/* <div className="item-conversation--detail__message">
                          ban:
                          <span className="content">
                            https://shopee.vn/lyphuong29073
                          </span>
                          <span className="time">
                            13:30
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

        }

      </div>
      {
        visibleModal &&
        <ModalConversation {...props} closeModal={() => setVisibleModal(false)} />
      }

      {
        visibleModalUpdate &&
        <ModalUpdateConversation {...props} closeModal={() => setVisibleModalUpdate(false)} />
      }
    </div>
  )
}

const Conversation = props => {
  const { currentConversation } = props

  return (
    <div className="is-flex">
      <div className="content-left">
        <ListConversation {...props} />
      </div>

      <div className="content-right">
        <div className="header-message--wrapper">
          <div className="header-message is-flex is-flex--vcenter">
            <div className="header-message--avatar">
              {
                currentConversation ?.conversation_accounts &&
                  currentConversation ?.conversation_accounts.map((el, index) => (
                    <div className="header-message--avatar__item" key={index}>
                      <img src={el.account.avatar} />
                    </div>
                  ))
               }

            </div>
            <div className="header-message--title">
              {
                currentConversation ?.title || currentConversation ?.conversation_accounts ?.map(el => el.account.user_name).join(", ")
                }
            </div>
          </div>
        </div>

        <Message {...props} />
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    listConversation: state.conversation.list || [],
    account: state.account.info,
    messages: state.conversation.messages,
    selectedConversation: state.conversation.selectedConversation,
    currentConversation: state.conversation.list.find(el => el.id == state.conversation.selectedConversation)
  }
}

export default connect(mapStateToProps, { socketUpdateMessages, createConversation, getConversations, sendMessage, getMessages, setSelectedConversation, updateConversation })(HOC(Conversation, true))