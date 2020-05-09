import { Input, Popover, Icon } from "antd"
import { Picker } from "emoji-mart"
import { useState, useEffect } from "react"
import { connect } from "react-redux"

const Comment = props => {
  const { handleCreateComment } = props
  const [comment, setComment] = useState("")

  const handleChangeComment = e => {
    let value = e.target.value
    setComment(value)
  }

  const handleSaveComment = () => {
    handleCreateComment(comment, () => setComment(""))
  }

  const handleSelectEmoji = value => {
    let v = `${comment} ${value.native}`
    setComment(v)
  }

  return (
    <Input
      className="comment"
      value={comment}
      placeholder="Viết bình luận"
      suffix={
        <Popover overlayClassName="emoji" content={<Picker onSelect={handleSelectEmoji} />}>
          <Icon type="smile" />
        </Popover>
      }
      onChange={handleChangeComment}
      onPressEnter={handleSaveComment} />
  )
}

export default Comment