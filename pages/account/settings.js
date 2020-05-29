import { Input, Menu, Button } from "antd"
import { connect } from "react-redux"
import { useState, useEffect } from "react"
import produce from "immer"

import HOC from "/hoc/index"
import LayoutUser from "/layouts/layout-user"
import ModalSelectAvatar from "/components/ModalSelectAvatar"
import { updateAccount } from "/pages/account/actions"

const Settings = props => {
  const { user, account, updateAccount } = props
  const [selectedKey, setSelectedKey] = useState("settings")
  const [visibleModalAva, setVisibleModalAva] = useState(false)
  const [accountParams, setAccountParams] = useState(account)

  const handleChangeAccount = (key, value) => {
    setAccountParams(produce(accountParams, draft => {
      draft[key] = value
    }))
  }

  const handleSaveAccount = () => {
    console.log(accountParams, "ddddd")
    updateAccount(accountParams)
  }

  console.log(props)

  useEffect(() => {
    setSelectedKey(props ?.query ?.key || "settings")
  }, [])

  return (
    <LayoutUser {...props}>
      <div className="container">
        <div className="settings is-flex is-flex--space-between">
          <div className="settings--left">
            <Menu
              mode="inline"
              style={{ width: 155 }}
              selectedKeys={[selectedKey]}
            >
              <Menu.Item key="settings">Tài khoản</Menu.Item>
              <Menu.Item key="upload">Tải lên</Menu.Item>
            </Menu>
          </div>
          <div className="settings--right">
            <div className="is-flex is-flex--space-between">
              <div>
                <div className="form-section">
                  <div className="label">
                    Tên tài khoản
                  </div>
                  <Input value={accountParams.user_name} size="large" onChange={e => handleChangeAccount("user_name", e.target.value)} />
                </div>
                <div className="form-section">
                  <div className="label">
                    Mật khẩu mới
                  </div>
                  <Input size="large" onChange={e => handleChangeAccount("password", e.target.value)} />
                </div>
                <div className="form-section">
                  <div className="label">
                    Nhập lại mật khẩu
                  </div>
                  <Input size="large" onChange={e => handleChangeAccount("re_password", e.target.value)} />
                </div>

                <div className="form-section mt-10 is-flex--end" style={{ alignItems: "flex-end" }}>
                  <Button onClick={handleSaveAccount} size="large">Cập nhật tại khoản</Button>
                </div>
              </div>

              <div className="info-header--user__avatar is-flex is-flex--center is-relative">
                {
                  user.avatar ?
                    <img src={user.avatar} />
                    :
                    user.user_name && user.user_name.charAt(0)
                }
                <div className="is-absolute is-flex is-flex--center edit-avatar--mask">
                  {account.id == user.id && <Button shape="round" onClick={() => setVisibleModalAva(true)}>Edit Avatar</Button>}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {visibleModalAva && <ModalSelectAvatar {...props} handleCloseModalAva={() => setVisibleModalAva(false)} />}
    </LayoutUser>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info,
    user: state.account.user
  }
}

export default connect(mapStateToProps, { updateAccount })(HOC(Settings))