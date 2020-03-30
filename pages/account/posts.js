import { Icon, Upload, Tabs, Button } from "antd"
import { useState } from "react"
import { connect } from "react-redux"

import LayoutUser from "/layouts/layout-user"
import HOC from "/hoc/index"
import { getHostName } from "/utils/tools"
import { updateAccount, setAccount } from "/pages/account/actions"

const Posts = props => {
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
    <LayoutUser {...props} >
      POST LIST
    </LayoutUser>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info,
    user: state.account.user
  }
}

export default connect(mapStateToProps, { updateAccount, setAccount })(HOC(Posts))