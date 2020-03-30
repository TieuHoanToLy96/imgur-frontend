import { Menu, Dropdown, Input, Button, Icon } from "antd"
import Router from "next/router"
import { connect } from "react-redux"

import { logOut } from "/pages/account/actions"

const Header = props => {
  const { user, account, logOut } = props

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
    }
  }

  const renderUserDropdown = () => {
    return (
      <Menu onClick={handleClickItem}>
        <Menu.Item key="posts">
          <a>Posts</a>
        </Menu.Item>
        <Menu.Item key="favorites">
          <a>Favorite</a>
        </Menu.Item>
        <Menu.Item key="comments">
          <a>Comment</a>
        </Menu.Item>
        <Menu.Item key="about">
          <a>About</a>
        </Menu.Item>
        <Menu.Item key="images">
          <a>Images</a>
        </Menu.Item>
        <Menu.Item key="settings" className="dropdown-option is-flex is-flex--vcenter mt-15">
          <Icon type="setting" /> <a> Settings </a>
        </Menu.Item>
        <Menu.Item key="sign-out" className="dropdown-option is-flex is-flex--vcenter">
          <Icon type="poweroff" /> <a> Sign Out </a>
        </Menu.Item>
      </Menu>
    )
  }

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
                New post
              </div>
            </div>
          }
        </div>
      </div>

      <div className="header-item header-center">
        <div className="header-item--content">
          <Input
            placeholder="Images, #tags, @users oh my!"
            suffix={<Icon type="search" />} />
        </div>
      </div>

      <div className="header-item header-right">
        <div className="header-item--content">
          <div className="button-link is-flex is-flex--vcenter">
            <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-leaderboard.2c7c197ab7cc58a23c14b83dcc3025a9.svg" />
          </div>
          {
            account.id &&
            <div className="button-link is-flex is-flex--vcenter">
              <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-chat.f91379e0c16bc9fe39a41956da9457c4.svg" />
            </div>
          }
          {
            account.id &&
            <div className="button-link is-flex is-flex--vcenter">
              <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-notifications.aeebfeab4400518b87f939217d186198.svg" />
            </div>
          }
          {
            account.id &&
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
            !account.id &&
            <div className="sign-action sign-in" onClick={handleClickSignIn}>
              Sign in
            </div>
          }
          {
            !account.id &&
            <div className="sign-action sign-up" onClick={handleClickSignUp}>
              Sign up
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default connect(null, { logOut })(Header)
