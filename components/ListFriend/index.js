import { Avatar, Icon, Input } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Router from "next/router"

import Notification from "/components/Notification/index"
import { getHostName } from "/utils/tools"
import { sendGet, sendPost } from "/utils/request"
import { useDebounce } from "/hook"

const ListFriend = props => {
  const { account } = props
  const [loading, setLoading] = useState(false)
  const [listFriend, setListFriend] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const debounceSearchTerm = useDebounce(searchTerm, 500)

  const getListFriend = (page = 1) => {
    let url = `${getHostName()}/api/v1/account/search_friend?page=${page}&limit=20&term=${searchTerm}`
    sendGet(url)
      .then(res => {
        if (res.status == 200 && res.data.success) {
          setListFriend(res.data.data.friends)
        }
      })
      .finally(() => setLoading(false))
  }

  const handleSelectAccount = account => {
    Router.push(`/account/${account.account_url}/posts`)
  }

  useEffect(() => {
    if (account ?.id) {
      getListFriend()
    }
  }, [])

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      getListFriend()
    }
  }, [debounceSearchTerm])

  return (
    account ?.id ?
      <div className="friend--wrapper">
        <div className="friend">
          <div className="friend-title">
            Người liên hệ
        </div>

          <div className="friend-search">
            <Input
              placeholder="Tìm kiếm bạn bè"
              onChange={e => setSearchTerm(e.target.value)}
              suffix={loading ? <Icon type="loading" /> : <Icon type="search" />} />
          </div>

          <div className="list-member--wrapper">
            <div className="list-member">
              {
                listFriend.map((el, index) => (
                  <div className="item-member--wrapper" key={index} onClick={() => handleSelectAccount(el)}>
                    <div className="item-member">
                      <div className="item-member--avatar">
                        <img src={el.avatar} />
                      </div>

                      <div className="item-member--name">
                        {el.user_name}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      : null
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info
  }
}

export default connect(mapStateToProps, null)(ListFriend)