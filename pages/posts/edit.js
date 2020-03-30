import { message, Tag, Icon, Input, Switch, Button, Divider, Dropdown, Menu } from "antd"
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import produce from "immer"
import Router from "next/router"

import ModalUploadImage from "/components/ModalUploadImage"
import HOC from "/hoc/index"
import { copyToClipBoard } from "/utils/tools"
import { createOrUpdatePost, getPost } from "/pages/posts/actions"

const EditPost = props => {
  const { editPost, account, createOrUpdatePost, getPost } = props
  const [visibleModalUpload, setVisibleModalUpload] = useState(false)
  const [data, setData] = useState(editPost || {})
  const [indexImage, setIndexImage] = useState(null)
  const [isAddTag, setIsAddTag] = useState(false)
  const [contents, setContents] = useState(editPost.contents || [])

  const handleChangeData = (key, value) => {
    setData(produce(data, draft => {
      draft[key] = value
    }))
  }

  const handleChangeContents = (index, key, value) => {
    let contents = produce(data.contents || [], draft => {
      draft[index][key] = value
    })
    handleChangeData("contents", contents)
  }

  const handleUploadImage = image => {
    setVisibleModalUpload(false)
    console.log(indexImage)
    let contents = []
    if (indexImage != null) {
      contents = produce(data.contents || [], draft => {
        draft.splice(indexImage + 1, 0, { image: image })
        return draft
      })
    } else {
      contents = produce(data.contents || [], draft => {
        draft.push({ image: image, description: "" })
        return draft
      })
    }

    handleChangeData("contents", contents)
  }

  const handleAddImageIndex = index => () => {
    setVisibleModalUpload(true)
    setIndexImage(index)
  }

  const handleAddTag = (value) => {
    let tags = produce(data.tags || [], draft => {
      draft.push(value)
      return draft
    })

    handleChangeData("tags", tags)

    setIsAddTag(false)
  }

  const handleSavePost = () => {
    createOrUpdatePost(account.id, data)
      .then(res => {
        if (res.status == 200 && res.data.success == true) {
          console.log(res.data)
          if (!props.query.postId) {
            Router.push(`/posts/${res.data.article.id}/edit`)
          }
        }
      })
  }

  const handleMenuClick = index => ({ key }) => {
    if (key == "2") {
      let contents = produce(data.contents || [], draft => {
        draft[index].is_deleted = true
        return draft
      })

      handleChangeData("contents", contents)
    }
  }

  const handleCopyUrl = url => () => {
    copyToClipBoard(url, document)
    message.success("Copy to clipboard success");
  }

  const menu = index => {
    return (
      <Menu onClick={handleMenuClick(index)}>
        <Menu.Item key="1">
          Download image
        </Menu.Item>

        <Menu.Item className="delete" key="2">
          Delete image
      </Menu.Item>
      </Menu>
    )
  }

  useEffect(() => {
    console.log(props)
    let postId = props.query.postId
    if (postId) {
      getPost(postId, account.id)
    }
  }, [])

  useEffect(() => {
    setData(editPost)
  }, [editPost])

  console.log(data, "data")

  return (
    <div className="post--wrapper">
      <div className="container">
        <div className="is-flex is-flex--row post">
          <div className="mt-20 post-content">
            <div className="post-content--title is-flex is-flex--vcenter">
              <Input value={data.title} placeholder="Give post a title" onChange={e => handleChangeData("title", e.target.value)} />
            </div>

            <div className="post-image--list">
              {
                data.contents && data.contents.map((el, index) => (
                  !el.is_deleted &&
                  <div key={index}>
                    <div className="post-content--item is-relative">
                      <div className="post-content--item__image">
                        <img src={el.image} />
                      </div>

                      <div className="post-content--item__action is-flex">
                        <Input className="mr-10 post-content--item__action--copy" addonAfter={<div onClick={handleCopyUrl(el.image)}>Copy</div>} value={el.image} />
                        <Dropdown className="mr-10 post-content--item__action--select" overlayClassName="min-overlay" placement="bottomRight" overlay={menu(index)}>
                          <Button>
                            <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>
                    </div>
                    <Input.TextArea value={el.description} onChange={e => handleChangeContents(index, "description", e.target.value)} placeholder="Add description" className="post-content--item__description" rows={1} />
                    <div className="post-content--item__add is-relative" onClick={handleAddImageIndex(index)}>
                      <div className="tear"></div>
                      <div className="icon-plus"></div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="post-content--add is-flex is-flex--center" onClick={() => setVisibleModalUpload(true)}>
              <Icon type="plus-circle" className="mr-10" theme="filled" />
              Add another image
            </div>
          </div>

          <div className="mt-20 post-action">
            <div>
              <Button className="post-action--save is-fullwidth" onClick={handleSavePost}>Save</Button>
            </div>
            <div className="mt-20">
              <Switch checked={data.is_published} onChange={value => handleChangeData("is_published", value)} size="small" className="mr-5" /> Public
            </div>

            <Divider />

            <div className="post-action--tag">

              <div className="post-action--tag__add is-flex">
                {
                  data.tags && data.tags.map((el, index) => (
                    <Tag key={index} closable>
                      {el}
                    </Tag>
                  ))
                }

                {
                  isAddTag ?
                    <Input autoFocus className="input" onPressEnter={e => handleAddTag(e.target.value)} onBlur={() => setIsAddTag(false)} />
                    :
                    <Button className="button" shape="round" icon="plus" onClick={() => setIsAddTag(true)}>Tag</Button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {visibleModalUpload && <ModalUploadImage uploadImage={handleUploadImage} handleCloseModal={() => setVisibleModalUpload(false)} />}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info,
    user: state.account.user,
    editPost: state.post.editPost
  }
}

export default connect(mapStateToProps, { createOrUpdatePost, getPost })(HOC(EditPost))
