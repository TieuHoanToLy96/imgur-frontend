import { Icon, Upload, Tabs, Button, Menu } from "antd"
import Masonry from "react-masonry-component"
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import Router from "next/router"

import LayoutUser from "/layouts/layout-user"
import HOC from "/hoc/index"
import { getHostName } from "/utils/tools"
import { updateAccount, setAccount } from "/pages/account/actions"
import { getPostsUser } from "/pages/posts/actions"

const Posts = props => {
  const { posts, user, account, getPostsUser } = props

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

  const handleSelectPost = id => () => {
    Router.push(`/posts/${id}`)
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
    getPosts(account.id, user.account_url, 1)
  }, [])

  return (
    <LayoutUser {...props} >
      <div className="container">
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            All
        </Menu.Item>
          <Menu.Item key="app">
            Public
        </Menu.Item>
        </Menu>

        {/* <div className="post-list"> */}
        <Masonry
          className={'post-list'} // default ''
          elementType={'div'} // default 'div'
          options={{ gutter: 10 }} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        // imagesLoadedOptions={imagesLoadedOptions} // default {}
        >
          {
            posts.map((el, index) => (
              <div className="post-item" key={index} onClick={handleSelectPost(el.id)}>

                <img src={el.contents[0].image} />
                <div className="post-item--detail">
                  <div className="post-item--detail__title is-flex is-flex--vcenter">
                    {el.title}
                  </div>
                  <div className="is-flex is-flex--space-between  is-flex--vcenter">
                    <div className="post-item--detail__count">
                      {el.view_count}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }

        </Masonry>

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