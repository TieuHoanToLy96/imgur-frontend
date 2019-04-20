import { Input, Button, Icon } from "antd"
import Router from "next/router"
import { useState } from "react"
import { connect } from "react-redux"

import HOC from "/hoc/index"
import Notification from "/components/Notification/index"
import { createAccount } from "/pages/account/actions"
import { useInput } from "/hook/index"

const SignUp = props => {
  const { createAccount } = props
  const [userName, setUserName] = useInput("")
  const [email, setEmail] = useInput("")
  const [password, setPassword] = useInput("")
  const [confirmPassword, setConfirmPassword] = useInput("")
  const [loadingCreate, setLoadingCreate] = useState(false)

  const handleClickBack = () => {
    Router.push("/")
  }

  const handleClickSignIn = () => {
    Router.push("/account/sign-in")
  }

  const handleClickRegister = () => {
    if (password != confirmPassword) {
      Notification.error("Mật khẩu không khớp, Xác nhận lại")
      return
    }
    let data = {
      user_name: userName,
      email: email,
      password_hash: password,
      confirm_password: confirmPassword
    }
    setLoadingCreate(true)
    createAccount(data)
      .then(success => {
        if (success) {
          Router.push('/')
        }
      })
      .finally(() => {
        setLoadingCreate(false)
      })
  }

  return (
    <div className="sign">
      <div className="back-imgur is-cursor is-flex is-flex--vcenter" onClick={handleClickBack}>
        <img className="mr-10 is-cursor" src="https://s.imgur.com/images/access/back-to-imgur.png" />
        back to Imgur
      </div>
      <div className="sign-container">
        <div className="sign-logo">
          <img src="https://s.imgur.com/images/access/access-logo.png" />
        </div>
        <div className="sign-callout is-flex is-flex--hcenter">
          Register with
        </div>
        <div className="sign-social core-dark-bg">
          <div className="sign-social--content">
            <div className="is-cursor is-flex is-flex--center sign-social--item sign-social--item__fb">
              <i className="fab fa-facebook-f"></i>
            </div>
            <div className="is-cursor is-flex is-flex--center sign-social--item sign-social--item__twitter">
              <i className="fab fa-twitter"></i>
            </div>
            <div className="is-cursor is-flex is-flex--center sign-social--item sign-social--item__google">
              <i className="fab fa-google"></i>
            </div>
            <div className="is-cursor is-flex is-flex--center sign-social--item sign-social--item__yahoo">
              <i className="fab fa-yahoo"></i>
            </div>
          </div>
        </div>
        <div className="fade-content-break is-flex is-flex--center">
          <span className="fade-break"></span>
          <div className="sign-callout is-flex is-flex--hcenter">or with Imgur</div>
          <span className="fade-break fade-break-flip"></span>
        </div>

        <div className="sign-form core-dark-bg">
          <div className="sign-form--content">
            <Input className="mb-10" placeholder="Username" onChange={setUserName} />
            <Input className="mb-10" placeholder="Email" onChange={setEmail} />
            <Input.Password className="mb-10" placeholder="Password" onChange={setPassword} />
            <Input.Password placeholder="Retype Password" onChange={setConfirmPassword} />
          </div>
        </div>
        <div className="is-flex is-flex--vcenter is-flex--end mt-5">
          <div className="back-imgur mr-10 is-cursor" onClick={handleClickSignIn}>sign in</div>
          <Button className="button-register" type="primary" size="large" onClick={handleClickRegister}>
            {loadingCreate ? <Icon type="loading" /> : "Register"}
          </Button>
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
export default connect(null, { createAccount })(HOC(SignUp, true))
