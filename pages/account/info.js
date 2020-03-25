import { Icon, Upload, Tabs, Button } from "antd"
import { userState, useState } from "react"
import { connect } from "react-redux"

import ModalSelectAvatar from "/components/ModalSelectAvatar"
import HOC from "/hoc/index"
import { getHostName } from "/utils/tools"
import { updateAccount, setAccount } from "/pages/account/actions"

const { TabPane } = Tabs

const AccountInfo = props => {
  const { account } = props
  const [visibleModalAva, setVisibleModalAva] = useState(false)

  const handleOpenModalAva = () => {
    setVisibleModalAva(true)
  }

  const handleCloseModalAva = () => {
    setVisibleModalAva(false)
  }

  const handleChange = ({ file, fileList }) => {
    if (file.size / 1024 / 1024 > 15) {
      Notification.error("File over 15Mb")
      return
    }
  }

  const handleBeforeUpload = (file) => {
    return new Promise((resolve) => {
      let fr = new FileReader;
      fr.onload = function () {
        let img = new Image;
        img.onload = function () {
          file.width = img.width
          file.height = img.height
          resolve(file)
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file)
    });
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  const upload = (
    <Upload
      action={`${getHostName()}/api/v1/files/upload`}
      listType="picture-card"
      fileList={[]}
      beforeUpload={handleBeforeUpload}
      onChange={handleChange}>
      {uploadButton}
    </Upload>
  )

  return (
    <div>
      {visibleModalAva && <ModalSelectAvatar {...props} handleCloseModalAva={handleCloseModalAva} />}

      <div className="info-header--wrapper pt-50">
        <div className="info-header container">
          <div className="info-header--user is-flex is-flex--row is-flex--vcenter">
            <div className="info-header--user__avatar is-flex is-flex--center is-relative">
              <div>
                {
                  account.avatar ?
                    <img src={account.avatar} />
                    :
                    account.user_name.charAt(0)
                }
              </div>
              <div className="is-absolute is-flex is-flex--center edit-avatar--mask">
                <Button shape="round" onClick={handleOpenModalAva}>Edit Avatar</Button>
              </div>
            </div>

            <div className="info-header--user__name ml-25">
              {account.email.substring(0, account.email.lastIndexOf("@"))}
            </div>
          </div>

          <div className="info-header--tab mt-30">
            <Tabs defaultActiveKey="1">
              <TabPane tab="POSTS" key="1">
              </TabPane>
              <TabPane tab="FAVORITES" key="2">
              </TabPane>
              <TabPane tab="COMMENTS" key="3">
              </TabPane>
            </Tabs>
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

export default connect(mapStateToProps, { updateAccount, setAccount })(HOC(AccountInfo))
