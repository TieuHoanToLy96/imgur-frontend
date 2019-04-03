import {Input, Button} from "antd"
import Router from "next/router"

import "/static/style/main.scss";
import HOC from "/hoc/index"

const SignUp  = props => {
	const handleClickBack = () => {
		Router.push("/")
  }

  const handleClickSignIn = () => {
  }

  return(
    <div className="sign">
      <div className="back-imgur is-cursor is-flex is-flex--vcenter" onClick={handleClickBack}>
        <img className="mr-10" src="https://s.imgur.com/images/access/back-to-imgur.png"/>
				back to Imgur
      </div>
      <div className="sign-container">
        <div className="sign-logo">
          <img src="https://s.imgur.com/images/access/access-logo.png"/>
        </div>
        <div className="sign-callout is-flex is-flex--hcenter">
          Sign In with
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
            <Input className="mb-10" placeholder="Username"/>
            <Input className="mb-10" placeholder="Password"/>
          </div>
        </div>
        <div className="is-flex is-flex--vcenter is-flex--end mt-15">
          <Button className="button-register" type="primary" size="large" onClick={handleClickSignIn}>Sign In</Button>
        </div>
      </div>
    </div>
  )
}

export default HOC(SignUp)

