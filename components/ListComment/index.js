import { Avatar } from "antd"
import { useState, useEffect } from "react"
import { connect } from "react-redux"

import Comment from "/components/Comment"
import { getComments } from "/pages/posts/actions"

const ReplyComment = props => {
  const { articleId, comment, account, createOrUpdateComment } = props
  const [visibleComment, setVisibleComment] = useState(false)
  const [reply, setReply] = useState("")

  const handleCreateComment = (value, cb) => {
    let data = {
      content: value,
      parent_id: comment.id,
      account_id: account.id,
      article_id: articleId
    }

    createOrUpdateComment(account.id, data, cb)
  }

  return (
    <div>
      <div onClick={() => setVisibleComment(!visibleComment)}>
        Trả lời
      </div>
      <div div className="mt-10 mb-10">
        {
          visibleComment &&
          <div className="is-flex">
            <Avatar className="mr-10" src={account.avatar} />
            <Comment handleCreateComment={handleCreateComment} />
          </div>
        }
      </div>
    </div>
  )
}
const ListComment = props => {
  const { editPost, articleId, account, getComments } = props
  useEffect(() => {
    if (editPost && account) {
      getComments(account.id, articleId, { limit: 100, page: 1 })
    }
  }, [])

  return (
    <div className="comment-list--wrapper pl-20 pr-20">
      <div className="comment-list">
        {
          editPost ?.comments ?.map((comment, index) => (
            <div className="comment-item--wrapper is-flex" key={index}>
              <div className="comment-item--avatar">
                <Avatar src={comment ?.account ?.avatar} />
              </div>
              <div className="is-fullwidth">
                <div className="comment-item--detail">
                  <div className="comment-item--detail__account">
                    {comment ?.account ?.user_name}
                  </div>
                  <div className="comment-item--detail__content">
                    {comment.content}
                  </div>
                </div>

                <div className="comment-item--detail__reply is-cursor">
                  <ReplyComment {...props} comment={comment} />
                </div>
                <div className="comment-list">
                  {comment?.child_comments?.map((el, idx) => (
                    <div className="comment-item--wrapper is-flex mb-10" key={idx}>
                      <div className="comment-item--avatar">
                        <Avatar src={el ?.account ?.avatar} />
                      </div>
                      <div className="comment-item--detail">
                        <div className="comment-item--detail__account">
                          {el ?.account ?.user_name}
                        </div>
                        <div className="comment-item--detail__content">
                          {el.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    editPost: state.post.editPost,

  }
}

export default connect(mapStateToProps, { getComments })(ListComment)