const listReactions = [
  {
    label: "Like",
    class: "like",
    image: "/static/image/like-reaction.png"
  },
  {
    label: "Love",
    class: "love",
    image: "/static/image/love-reaction.png"
  },
  {
    label: "Haha",
    class: "haha",
    image: "/static/image/haha-reaction.png"
  },
  {
    label: "Wow",
    class: "wow",
    image: "/static/image/wow-reaction.png"
  },
  {
    label: "Sad",
    class: "sad",
    image: "/static/image/sad-reaction.png"
  },
  {
    label: "Angry",
    class: "angry",
    image: "/static/image/angry-reaction.png"
  }
]

const Reaction = props => {
  const { handleChangeReaction } = props

  const handleSelectReaction = index => () => {
    handleChangeReaction(index + 1)
  }

  const content = (
    <div className="reaction-box">
      {
        listReactions.map((el, index) => (
          <div
            key={el.label}
            className={`reaction-icon ${el.class} show`}
            style={{ backgroundImage: `url(${el.image})` }}
            onClick={handleSelectReaction(index)}>
            <label>{el.label}</label>
          </div>
        ))
      }
    </div>
  )

  return (
    <div className="like-btn is-fullwidth is-flex is-flex--center">
      {/* <Popover trigger="hover" placement="top" content={content} trigger="click">
      {props.children}
    </Popover> */}
      {content}
      {props.children}
    </div>
  )
}

export default Reaction