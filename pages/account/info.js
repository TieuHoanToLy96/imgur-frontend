import { Icon, Upload } from "antd"
import { userState } from "react"
import { connect } from "react-redux"

import HOC from "/hoc/index"
import { getHostName } from "/utils/tools"

const AccountInfo = props => {
  
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

  return(
    <div>
      <Upload
        action={`${getHostName()}/api/v1/files/upload`}
        listType="picture-card"
        fileList={[]}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}>
        {uploadButton}
      </Upload>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info 
  }
}

export default connect(mapStateToProps)(HOC(AccountInfo))
