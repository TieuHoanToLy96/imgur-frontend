import { Icon, Upload, Tabs, Button, Menu } from "antd"
import { useState, useEffect } from "react"
import { connect } from "react-redux"

import ListArticle from "/components/ListArticle"
import LayoutUser from "/layouts/layout-user"
import HOC from "/hoc/index"
import { getHostName } from "/utils/tools"
import { updateAccount, setAccount } from "/pages/account/actions"
import { getPostsUser } from "/pages/posts/actions"

const Posts = props => {
  const { posts, user, account, getPostsUser } = props
  const [type, setType] = useState("public")

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

  

  const handleSelectTab = ({ key }) => {
    setType(key)
  }

  const getPosts = (account_id, account_url, type) => {
    let params = {
      account_id: account_id,
      account_url: account_url,
      type: type
    }

    getPostsUser(params)
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

  useEffect(() => {
    getPosts(account.id, props.query.accountUrl, type)
  }, [type])

  return (
    <LayoutUser {...props} >
      <div className="container">
        <div className="post">
          <Menu className="mb-20" mode="horizontal" onSelect={handleSelectTab} selectedKeys={[type]}>
            <Menu.Item key="public">
              Công khai
            </Menu.Item>
            {
              user.id == account.id &&
              <Menu.Item key="private">
                Chỉ mình tôi
              </Menu.Item>
            }
          </Menu>

          <ListArticle posts={posts} />
        </div>
      </div>
    </LayoutUser>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info,
    user: state.account.user,
    posts: state.post.posts
  }
}

export default connect(mapStateToProps, { getPostsUser, updateAccount, setAccount })(HOC(Posts))