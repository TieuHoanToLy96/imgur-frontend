import { Badge, Popover, Menu, Dropdown, Input, Button, Icon, Select, Avatar, notification } from "antd"
import Router from "next/router"
import { connect } from "react-redux"
import { useEffect, useState } from "react"

import io from 'socket.io-client'
const dev = process.env.node_env !== 'production'
const socket = io(dev ? "http://localhost:4000" : "https://tieuhoan.dev")

import Notification from "/components/Notification/index"
import ListNotification from "/components/ListNotification"
import { logOut, setCountNoti, setAccount, socketUpdateNoti } from "/redux/account/actions"
import { search } from "/redux/actions"
import { useDebounce } from "/hook"

const Header = props => {
  const { setCountNoti } = props
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  const { info, countNoti, user, account, homePage, logOut, search, socketUpdateNoti } = props

  const handleClickSignIn = () => {
    Router.push("/account/sign-in")
  }

  const handleClickSignUp = () => {
    Router.push("/account/sign-up")
  }

  const handleClickAvatar = () => {
    Router.push(`/account/${account.account_url}/posts`)
  }

  const handleCreatePost = () => {
    Router.push("/posts/new")
  }

  const handleClickItem = ({ key }) => {
    switch (key) {
      case "sign-out": {
        logOut()
        Router.push("/")
        break
      }
      case "posts": {
        Router.push(`/account/${props.account.account_url}/posts`)
        break
      }
      case "comments": {
        Router.push(`/account/${props.account.account_url}/comments`)
        break
      }
      case "favorites": {
        Router.push(`/account/${props.account.account_url}/favorites`)
        break
      }
      case "settings": {
        Router.push(`/account/${props.account.account_url}/settings`)
        break
      }
    }
  }

  const renderUserDropdown = () => {
    return (
      <Menu onClick={handleClickItem}>
        <Menu.Item key="posts">
          <a>Bài viết</a>
        </Menu.Item>
        <Menu.Item key="favorites">
          <a>Yêu thích</a>
        </Menu.Item>
        <Menu.Item key="comments">
          <a>Bình luận</a>
        </Menu.Item>
        <Menu.Item key="settings" className="dropdown-option is-flex is-flex--vcenter mt-15">
          <Icon type="setting" /> <a> Cài đặt </a>
        </Menu.Item>
        <Menu.Item key="sign-out" className="dropdown-option is-flex is-flex--vcenter">
          <Icon type="poweroff" /> <a> Đăng xuất </a>
        </Menu.Item>
      </Menu>
    )
  }

  const menuSearch = () => {
    return (
      <Menu onClick={handleSelect}>
        <div className="pl-20">Bài viết</div>
        {
          homePage ?.post ?.posts.map((el, index) => (
            <Menu.Item key={index} value={el.id} type="post">
              {el.title}
            </Menu.Item>
          ))
        }
        <Menu.Divider />
        <div className="pl-20">Người dùng</div>
        {
          homePage ?.account ?.accounts.map((el, index) => (
            <Menu.Item key={index} value={el.account_url} type="account">
              <Avatar className="mr-10" src={el.avatar} />
              @{el.user_name}
            </Menu.Item>
          ))
        }
      </Menu>
    )
  }

  const onChangeSearch = e => {
    setSearchTerm(e.target.value)
  }

  const handleSelect = ({ item }) => {
    switch (item.props.type) {
      case "post": {
        Router.push(`/posts/${item.props.value}/edit`)
        break
      }
      case "account": {
        Router.push(`/account/${item.props.value}/posts`)
        break
      }
    }
  }

  const contentNoti = (
    <ListNotification data={account ?.notifications || []} />
  )

  useEffect(() => {
    if (searchTerm) {
      search({ term: searchTerm })
    }
  }, [debounceSearchTerm])

  useEffect(() => {
    socket.on(`noti:${account.id}`, data => {
      socketUpdateNoti(data)
    })
  }, [])

  return (
    <div className="header is-flex is-flex--space-between pd-lr--20">
      <div className="header-item header-left">
        <div className="header-item--content">
          <img onClick={() => Router.push("/")} src="https://s.imgur.com/desktop-assets/desktop-assets/Navbar-logo.9c748ecccb607d5f3f00d7eee7a22f42.svg" />
          {
            account && user && account.id == user.id &&
            <div className="add-post sign-up ml-20 is-flex is-flex--center" onClick={handleCreatePost}>
              <img className="add-post--image mr-10" src="https://s.imgur.com/desktop-assets/desktop-assets/icon-new-post.13ab64f9f36ad8f25ae3544b350e2ae1.svg" />
              <div className="add-post--text">
                Tạo mới
              </div>
            </div>
          }
        </div>
      </div>

      <div className="header-item header-center">
        <div className="header-item--content">
          <Dropdown overlay={menuSearch()}>
            <Input
              onChange={onChangeSearch}
              placeholder="Images, #tags, @users oh my!"
              suffix={<Icon type="search" />} />
          </Dropdown>
        </div>
      </div>

      <div className="header-item header-right">
        <div className="header-item--content">
          {
            account ?.id &&
              <div className="button-link is-flex is-flex--vcenter" onClick={() => Router.push("/conversations")}>
                <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-chat.f91379e0c16bc9fe39a41956da9457c4.svg" />
              </div>
          }
          {
            account ?.id &&
              <Popover title="Thông báo" overlayClassName="popover-noti" placement="bottom" content={contentNoti} trigger="click">
                <Badge count={countNoti}>
                  <div className="button-link is-flex is-flex--vcenter">
                    <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-notifications.aeebfeab4400518b87f939217d186198.svg" />
                  </div>
                </Badge>
              </Popover>
          }
          {
            account ?.id &&
              <div className="user is-flex is-flex--vcenter ml-10">
                {
                  account.user_name && account.user_name &&
                  <div className="user-name">
                    {account.user_name}
                  </div>
                }
                {
                  account.avatar ?
                    <Dropdown className="user-dropdown" overlay={renderUserDropdown()}>
                      <div onClick={handleClickAvatar} className="user-avatar">
                        <img src={account.avatar} />
                      </div>
                    </Dropdown>
                    :
                    <Dropdown className="user-dropdown" overlay={renderUserDropdown()}>
                      <div onClick={handleClickAvatar} className="user-avatar user-avatar-default is-flex is-flex--center">
                        {account.user_name.charAt(0)}
                      </div>
                    </Dropdown>
                }
              </div>
          }
          {
            !account ?.id &&
              <div className="sign-action sign-in" onClick={handleClickSignIn}>
                Sign in
            </div>
          }
          {
            !account ?.id &&
              <div className="sign-action sign-up" onClick={handleClickSignUp}>
                Sign up
            </div>
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  homePage: state.homePage,
  countNoti: state.account.countNoti,
  info: state.account.info
})

export default connect(mapStateToProps, { logOut, search, setCountNoti, setAccount, socketUpdateNoti })(Header)
