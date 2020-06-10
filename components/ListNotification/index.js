import { Avatar, Button } from "antd"
import { connect } from "react-redux"
import Router from "next/router"
import { formatDateTime, getHostName } from "/utils/tools"
import { acceptFriendRequest, cancelFriendRequest, markSeenNotification, getNotifications } from "/redux/account/actions"
import { useEffect } from "react";

import io from 'socket.io-client'
const dev = process.env.node_env !== 'production'
const socket = io(dev ? "http://localhost:4000" : "https://tieuhoan.dev")

const ListNotification = props => {
  const { data, acceptFriendRequest, cancelFriendRequest, markSeenNotification, getNotifications } = props

  const handleClickNoti = el => () => {
    console.log(el)
    if (el.type == 3) {
      markSeenNotification(el.id).then(res => {
        if (res.status == 200 && res.data.success == true) {
          Router.push(el.url)
        }
      })
    }
  }

  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <div className="list-noti--wrapper pb-10">
      <div className="list-noti">
        {
          data.map((el, index) => (
            <div className="item-noti--wrapper" key={index} onClick={handleClickNoti(el)}>
              <div className="item-noti is-flex">
                <div className="item-noti--avatar">
                  <Avatar size={56} src={el ?.sender ?.avatar} />
                </div>
                <div className="item-noti--content">
                  <div className="item-noti--content__text">
                    {
                      el.type != 0 && el.type != 2 ?
                        <strong>{el ?.sender ?.user_name} </strong>
                        :
                        <strong>Bạn </strong>
                    }
                    {el ?.content}
                    {
                      (el.type == 0 || el.type == 2) &&
                      <strong> {el ?.receiver ?.user_name}</strong>
                    }
                  </div>
                  <div className={`item-noti--time ${el.seen && "item-noti--time__seen"}`}>
                    {formatDateTime(7, el ?.updated_at)}
                  </div>

                  {
                    el.type == 1 &&
                    <div className="item-noti--content__accept">
                      <Button type="primary" onClick={() => acceptFriendRequest({ account_id: el.sender.id, id: el.id })}>
                        Xác nhận
                      </Button>
                      <Button onClick={() => cancelFriendRequest({ account_id: el.sender.id, id: el.id })}>
                        Xoá
                      </Button>
                    </div>
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default connect(null, { acceptFriendRequest, cancelFriendRequest, markSeenNotification, getNotifications })(ListNotification)
