import {Input, Button, Icon} from "antd"
import Router from "next/router"
import { connect } from "react-redux"

import HOC from "/hoc/index"
import "/static/style/main.scss"
import { authAccount } from "/pages/account/actions"

const Index = props => {
  const {account, token} = props
  
  const handleClickSignIn = () => {
    Router.push("/account/sign-in")
  }

  const handleClickSignUp = () => {
    Router.push("/account/sign-up")
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
            <div className="button-link">
              <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-leaderboard.2c7c197ab7cc58a23c14b83dcc3025a9.svg"/>
            </div>
            {
              (account) &&
              <div className="button-link">
                <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-chat.f91379e0c16bc9fe39a41956da9457c4.svg"/>
              </div>
            }
            {
              (account) && 
              <div className="button-link">
                <img src="https://s.imgur.com/desktop-assets/desktop-assets/icon-notifications.aeebfeab4400518b87f939217d186198.svg"/>
              </div>
            }
            {
              account &&
              <div className="user is-flex is-flex--vcenter ml-10">
                {
                  account.user_name &&
                  <div className="user-name">
                    {account.user_name}  
                  </div>
                }
                {
                  account.avatar ?
                  <div className="user-avatar">
                    <img className="user-avatar" src={account.avatar}/>
                  </div>
                  :
                  <div className="user-avatar user-avatar-default is-flex is-flex--center">
                    { account.user_name.charAt(0)}
                  </div>
                }
              </div>
            }
            
            {
              (!account) && 
              <div className="sign-action sign-in" onClick={handleClickSignIn}>
              	Sign in
            	</div>
            }
            {
							(!account) &&
							<div className="sign-action sign-up" onClick={handleClickSignUp}>
              	Sign up
            	</div>
						}
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    account: state.account.info
  }
}
export default connect(mapStateToProps, {})(HOC(Index))
