import {Input, Button, Icon} from "antd"
import {connect} from "react-redux"
import Router from "next/router"

import HOC from "/hoc/index"
import {setToken, getAllArticle} from "/pages/actions.js"
import "/static/style/main.scss"

const Index = props => {
  const {setToken} = props
  
  const handleClickSignIn = () => {
    Router.push("/sign-in")
  }

  const handleClickSignUp = () => {
    Router.push("/sign-up")
  }

  return (
    <div>
      <div className="header is-flex is-flex--space-between pd-lr--20">
        <div className="header-item header-left">
          <div className="header-item--content">
            <img src="https://s.imgur.com/desktop-assets/desktop-assets/Navbar-logo.9c748ecccb607d5f3f00d7eee7a22f42.svg"/>
          </div>
        </div>
        <div className="header-item header-center">
          <div className="header-item--content">
            <Input
              placeholder="Images, #tags, @users oh my!"
              suffix={<Icon type="search" />}
            />
          </div>
        </div>
        <div className="header-item header-right">
          <div className="header-item--content">
            <div className="top-comment">
              <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-leaderboard.2c7c197ab7cc58a23c14b83dcc3025a9.svg"/>
            </div>
            <div className="sign-action sign-in" onClick={handleClickSignIn}>
              Sign in
            </div>
            <div className="sign-action sign-up" onClick={handleClickSignUp}>
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
const mapStateToProps = state => {
  return {
    token: null
  }
}
export default connect(mapStateToProps, {setToken, getAllArticle})(HOC(Index))
