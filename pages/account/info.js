import { Icon, Upload, Tabs } from "antd"
import { userState } from "react"
import { connect } from "react-redux"

import HOC from "/hoc/index"
import { getHostName } from "/utils/tools"

const { TabPane } = Tabs;

const avatarImage = [
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-1.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-2.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-3.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-4.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-5.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-6.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-7.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-8.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-9.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-10.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-11.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-12.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-13.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-14.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-15.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-16.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-17.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-18.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-19.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-20.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-21.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-22.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-23.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-24.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-25.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-26.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-27.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-28.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-29.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-30.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-31.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-32.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-33.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-34.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-35.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-36.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-37.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-38.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-39.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-40.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-41.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-42.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-43.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-44.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-45.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-46.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-47.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-48.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-49.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-50.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-51.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-52.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-53.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-54.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-55.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-56.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-57.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-58.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-59.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-60.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-61.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-62.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-63.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-64.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-65.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-66.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-67.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-68.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-69.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-70.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-71.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-72.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-73.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-74.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-75.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-76.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-77.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-78.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-79.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-80.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-81.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-82.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-83.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-84.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-85.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-86.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-87.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-88.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-89.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-90.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-91.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-92.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-93.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-94.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-95.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-96.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-97.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-98.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-99.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-100.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-101.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-102.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-103.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-104.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-105.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-106.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-107.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-108.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-109.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-110.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-111.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-112.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-113.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-114.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-115.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-116.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-117.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-118.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-119.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-120.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-121.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-122.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-123.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-124.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-125.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-126.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-127.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-128.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-129.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-130.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-131.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-132.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-133.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-134.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-135.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-136.png",
 "https://storage.tieuhoan.dev/root/imgur_storage/upload/2020/3/25/avatar-image-137.png"
]

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

      {avatarImage.map(el => (<img src={el}/>))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info
  }
}

export default connect(mapStateToProps)(HOC(AccountInfo))
