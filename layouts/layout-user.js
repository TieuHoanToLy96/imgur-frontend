import { Icon, Tabs, Button } from "antd"
import { useState, useEffect } from "react"
import Router from "next/router"
import { connect } from "react-redux"

import ModalSelectAvatar from "/components/ModalSelectAvatar"
import { getUser, updateAccount, sendFriendRequest } from "/pages/account/actions"

const { TabPane } = Tabs

const FriendStatus = props => {
  const { user, account, sendFriendRequest } = props

  return (
    <div className="friend-request--wrapper ml-25">
      <div className="friend-request">
        {
          !user ?.relation_account ?.status && account.id != user.id &&
            <div className="friend-request--status" onClick={() => sendFriendRequest({ account_id: user.id })}>
              <Icon type="user-add" />Thêm bạn bè
            </div> 
        }
        {
          user ?.relation_account ?.status == 1 &&
            <div className="friend-request--status">
              <Icon type="check" /> Đã gửi lời mời
            </div> 
        }
        {
          user ?.relation_account ?.status == 2 &&
            <div className="friend-request--status">
              <Icon type="check" />  Bạn bè
            </div> 
        }
      </div>
    </div>
  )
}

const LayoutUser = props => {
  const { account, user, getUser } = props
  const { query } = props
  const [visibleModalAva, setVisibleModalAva] = useState(false)

  const handleChangeTab = key => {
    console.log(`/account/${query.accountUrl}/${key}`, "aaa")
    Router.push(`/account/${query.accountUrl}/${key}`)
  }

  useEffect(() => {
    getUser(query.accountUrl)
  }, [])

  return (
    <>
      <div className="info-header--wrapper pt-50">
        <div className="info-header container">
          <div className="info-header--user is-flex is-flex--row is-flex--vcenter">
            <div className="info-header--user__avatar is-flex is-flex--center is-relative">
              <div>
                {
                  user.avatar ?
                    <img src={user.avatar} />
                    :
                    user.user_name && user.user_name.charAt(0)
                }
              </div>
              <div className="is-absolute is-flex is-flex--center edit-avatar--mask">
                {account.id == user.id && <Button shape="round" onClick={() => setVisibleModalAva(true)}>Edit Avatar</Button>}
              </div>
            </div>

            <div>
              <div className="info-header--user__name ml-25">
                {user.account_url}
              </div>
              <FriendStatus {...props} />
            </div>
          </div>


          <div className="info-header--tab mt-30">
            {
              account.id == user.id &&
              <Tabs activeKey={query.key} onChange={handleChangeTab}>
                <TabPane tab="Bài viết" key="posts">
                </TabPane>
                <TabPane tab="Yêu thích" key="favorites">
                </TabPane>
                <TabPane tab="Bình luận" key="comments">
                </TabPane>
              </Tabs>
            }
          </div>

        </div>
      </div>
      {props.children}
      {visibleModalAva && <ModalSelectAvatar {...props} handleCloseModalAva={() => setVisibleModalAva(false)} />}
    </>
  )
}

export default connect(null, { getUser, updateAccount, sendFriendRequest })(LayoutUser)