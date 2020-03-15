import { Icon, Upload, Tabs } from "antd"
import { userState } from "react"
import { connect } from "react-redux"

import HOC from "/hoc/index"
import { getHostName } from "/utils/tools"

const { TabPane } = Tabs;

const AccountInfo = props => {
  const { account } = props

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

  return (
    <div>
      {/* <Upload
        action={`${getHostName()}/api/v1/files/upload`}
        listType="picture-card"
        fileList={[]}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}>
        {uploadButton}
      </Upload> */}

      <div className="info-header--wrapper pt-50">
        <div className="info-header container">
          <div className="info-header--user is-flex is-flex--row is-flex--vcenter">
            <div className="info-header--user__avatar is-flex is-flex--center">
              {
                account.avatar ?
                  <img src={account.avatar} />
                  :
                  account.user_name.charAt(0)
              }
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

export default connect(mapStateToProps)(HOC(AccountInfo))
