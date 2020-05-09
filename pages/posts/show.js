import { Avatar, message, Tag, Icon, Input, Switch, Button, Divider, Dropdown, Menu } from "antd"
import { useState, useEffect } from "react"
import { connect } from "react-redux"
import produce from "immer"
import Router from "next/router"

import Comment from "/components/Comment"
import ListComment from "/components/ListComment"
import Reaction from "/components/Reaction"
import ModalPreviewImage from "/components/ModalPreviewImage"
import ModalUploadImage from "/components/ModalUploadImage"
import HOC from "/hoc/index"
import { copyToClipBoard } from "/utils/tools"
import { createOrUpdatePost, getPost } from "/pages/posts/actions"

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
  const { editPost, account, createOrUpdatePost, getPost } = props
  const [data, setData] = useState(editPost || {})
  const [indexImage, setIndexImage] = useState(null)
  const [visibleModalPreview, setVisibleModalPreview] = useState(false)
  const [indexPreview, setIndexPreview] = useState(0)

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

  const handleAddImageIndex = index => () => {
    setVisibleModalUpload(true)
    setIndexImage(index)
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

  const handlePreviewImage = index => () => {
    setIndexPreview(index)
    setVisibleModalPreview(true)
  }

  const handleChangeReaction = type => {
    handleChangeData("reaction", {
      type: type,
      account_id: account.id
    })

    console.log({
      type: type,
      account_id: account.id
    })
  }

  useEffect(() => {
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
                        <Input className="mr-10 post-content--item__action--copy" addonAfter={<div onClick={handleCopyUrl(el.image)}>Copy</div>} value={el.image} />
                      </div>
                    </div>
                    <div>{el.description}</div>
                    {/* <Input.TextArea value={el.description} onChange={e => handleChangeContents(index, "description", e.target.value)} placeholder="Add description" className="post-content--item__description" rows={1} /> */}
                  </div>
                ))
              }
            </div>
            <div>

            </div>

            <div className="post-interactive">
              <div className="post-interactive--count is-flex is-flex--space-between">
                <div className="post-interactive--count__reaction">
                  <img src={reaction["1"]["image"]} />
                  <img src={reaction["2"]["image"]} />
                  <img src={reaction["3"]["image"]} />
                  <img src={reaction["4"]["image"]} />
                  <img src={reaction["5"]["image"]} />
                  <img src={reaction["6"]["image"]} />
                  987
                </div>
                <div className="post-interactive--count__comment">
                  13 comment
                </div>
              </div>
              <div className="is-flex post-interactive--action">
                <div className="post-interactive--action__item post-interactive--like is-flex--1">
                  <Reaction handleChangeReaction={handleChangeReaction}>
                    {likeSvg}<div className="ml-10">Like</div>
                  </Reaction>
                </div>

                <div className="post-interactive--action__item post-interactive--comment is-flex--1">
                  <i className="far fa-comment"></i> Comment
                </div>
              </div>

              <div className="is-flex post-interactive--action pl-10 pr-10 pt-10 pb-10">
                <Avatar className="mr-10" src={account.avatar} />
                <Comment accountId={account.id} articleId={editPost.id} />
              </div>

              <ListComment comments={editPost.comments || []} />
            </div>

            <div className="post-content--add is-flex is-flex--center" onClick={() => setVisibleModalUpload(true)}>
              <Icon type="plus-circle" className="mr-10" theme="filled" />
              Add another image
            </div>
          </div>

          <div className="mt-20 post-action">
            <div className="post-action--tag">
              <div className="post-action--tag__add is-flex">
                {
                  data.tags && data.tags.map((el, index) => (
                    <Tag key={index} closable>
                      {el}
                    </Tag>
                  ))
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
