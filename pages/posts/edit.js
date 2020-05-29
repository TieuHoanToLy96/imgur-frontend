import { Avatar, message, Tag, Icon, Input, Switch, Button, Divider, Dropdown, Menu } from "antd"
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import produce from "immer"
import Router from "next/router"

import Reaction from "/components/Reaction"
import ModalPreviewImage from "/components/ModalPreviewImage"
import ModalUploadImage from "/components/ModalUploadImage"
import Comment from "/components/Comment"
import ListComment from "/components/ListComment"
import HOC from "/hoc/index"
import { copyToClipBoard } from "/utils/tools"
import { createOrUpdatePost, getPost, createOrUpdateReaction, createOrUpdateComment } from "/pages/posts/actions"

const likeSvg =
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.59998 17.8008C5.02172 17.8071 5.4408 17.869 5.84638 17.9848L8.75358 18.8152C9.18207 18.9377 9.62553 18.9999 10.0712 19H13.9792C15.1691 19 16.3167 18.558 17.1992 17.7598C18.0816 16.9616 18.6362 15.864 18.7552 14.68L18.9952 10.6C19.0376 9.76718 18.7896 8.94544 18.2935 8.27515C17.7975 7.60485 17.0841 7.12756 16.2752 6.9248L15.1112 6.6704C14.851 6.60589 14.62 6.45615 14.4548 6.24505C14.2897 6.03394 14.2 5.77363 14.2 5.5056V2.8C14.2 2.32261 14.0103 1.86477 13.6728 1.52721C13.3352 1.18964 12.8774 1 12.4 1C11.9226 1 11.4647 1.18964 11.1272 1.52721C10.7896 1.86477 10.6 2.32261 10.6 2.8V4.0432C10.6 5.6345 9.96783 7.16062 8.84262 8.28584C7.7174 9.41106 6.19127 10.0432 4.59998 10.0432V17.8008Z" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.6 8.19995H1V19H4.6V8.19995Z" stroke="#4D4D4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

const reaction = {
  "1": {
    "image": "/static/image/like-reaction.svg"
  },
  "2": {
    "image": "/static/image/love-reaction.svg"
  },
  "3": {
    "image": "/static/image/haha-reaction.svg"
  },
  "4": {
    "image": "/static/image/wow-reaction.svg"
  },
  "5": {
    "image": "/static/image/sad-reaction.svg"
  },
  "6": {
    "image": "/static/image/angry-reaction.svg"
  }
}

const EditPost = props => {
  const { editPost, account, createOrUpdatePost, getPost, createOrUpdateReaction, createOrUpdateComment } = props
  const [visibleModalUpload, setVisibleModalUpload] = useState(false)
  const [data, setData] = useState(editPost || {})
  const [indexImage, setIndexImage] = useState(null)
  const [isAddTag, setIsAddTag] = useState(false)
  const [visibleModalPreview, setVisibleModalPreview] = useState(false)
  const [indexPreview, setIndexPreview] = useState(0)
  const [visibleComment, setVisibleComment] = useState(false)

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
    message.success("Copy đường dẫn ảnh thành công");
  }

  const handlePreviewImage = index => () => {
    setIndexPreview(index)
    setVisibleModalPreview(true)
  }

  const handleChangeReaction = type => {
    handleChangeData("reaction", {
      type_reaction: type,
      account_id: account.id
    })

    let data = {
      type_reaction: type,
      account_id: account.id,
      article_id: editPost.id
    }

    createOrUpdateReaction(account.id, data)
  }

  const handleCreateComment = (value, cb) => {
    let data = {
      content: value,
      parent_id: null,
      article_id: editPost.id,
      account_id: account.id
    }

    createOrUpdateComment(account.id, data, cb)
  }

  const menu = index => {
    return (
      <Menu onClick={handleMenuClick(index)}>
        <Menu.Item key="1">
          Tải ảnh
        </Menu.Item>

        <Menu.Item className="delete" key="2">
          Xoá ảnh
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
                      <div className="post-content--item__image" onClick={handlePreviewImage(index)}>
                        <img src={el.image} />
                      </div>

                      <div className="post-content--item__action is-flex">
                        <Input className="mr-10 post-content--item__action--copy" addonAfter={<div onClick={handleCopyUrl(el.image)}>Sao chép</div>} value={el.image} />
                        <Dropdown className="mr-10 post-content--item__action--select" overlayClassName="min-overlay" placement="bottomRight" overlay={menu(index)}>
                          <Button>
                            <Icon type="down" />
                          </Button>
                        </Dropdown>
                      </div>
                    </div>
                    <Input.TextArea value={el.description} onChange={e => handleChangeContents(index, "description", e.target.value)} placeholder="Add description" className="post-content--item__description" rows={1} />
                    {
                      index != data.contents.length - 1 &&
                      <div className="post-content--item__add is-relative" onClick={handleAddImageIndex(index)}>
                        <div className="tear"></div>
                        <div className="icon-plus"></div>
                      </div>
                    }
                  </div>
                ))
              }
            </div>
            <div>

            </div>

            <div className="post-interactive">
              <div className="post-interactive--count is-flex is-flex--space-between">
                <div className="post-interactive--count__reaction">
                  {
                    editPost ?.reaction_count ?.map((el, index) => (
                      <img key={index} src={reaction[`${el.type_reaction}`]["image"]} />
                    ))
                  }
                  {
                    editPost ?.reaction_count ?.reduce((acc, el) => acc + el.count, 0)
                  }
                </div>
                <div className="post-interactive--count__comment">
                  {
                    editPost ?.count_comments || 0
                    
                  } comment
                </div>
              </div>
              <div className="is-flex post-interactive--action">
                <div className="post-interactive--action__item post-interactive--like is-flex--1">
                  <Reaction handleChangeReaction={handleChangeReaction}>
                    {likeSvg}<div className="ml-10">Like</div>
                  </Reaction>
                </div>

                <div className="post-interactive--action__item post-interactive--comment is-flex--1" onClick={() => setVisibleComment(!visibleComment)}>
                  <i className="far fa-comment"></i> Comment
                </div>
              </div>
              {
                visibleComment &&
                <div className="is-flex post-interactive--action pl-10 pr-10 pt-10 pb-10">
                  <Avatar className="mr-10" src={account.avatar} />
                  <Comment handleCreateComment={handleCreateComment} />
                </div>
              }
              {
                props.query.postId && editPost ?.id &&
                  <ListComment articleId={props.query.postId} account={account} createOrUpdateComment={createOrUpdateComment} />
              }

            </div>

            <div className="post-content--add is-flex is-flex--center" onClick={() => setVisibleModalUpload(true)}>
              <Icon type="plus-circle" className="mr-10" theme="filled" />
              Add another image
            </div>
          </div>

          <div className="mt-20 post-action">
            <div>
              <Button className="post-action--save is-fullwidth" onClick={handleSavePost}>Lưu</Button>
            </div>
            <div className="mt-20">
              <Switch checked={data.is_published} onChange={value => handleChangeData("is_published", value)} size="small" className="mr-5" /> Công khai
            </div>
            <div className="mt-20">
              <Switch checked={data.is_story} onChange={value => handleChangeData("is_story", value)} size="small" className="mr-5" /> Đặt làm story
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
                    <Button className="button" shape="round" icon="plus" onClick={() => setIsAddTag(true)}>Thẻ</Button>
                }
              </div>
            </div>
          </div>
        </div>

      </div>

      {
        visibleModalPreview &&
        <ModalPreviewImage
          imagesPreview={data.contents ? data.contents.map(el => el.image) : []}
          indexPreview={indexPreview}
          closeModal={() => setVisibleModalPreview(false)} />
      }

      {
        visibleModalUpload &&
        <ModalUploadImage
          uploadImage={handleUploadImage}
          handleCloseModal={() => setVisibleModalUpload(false)} />
      }
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

export default connect(mapStateToProps, { createOrUpdateReaction, createOrUpdatePost, getPost, createOrUpdateComment })(HOC(EditPost))
