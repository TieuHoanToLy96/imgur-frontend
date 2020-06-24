import { Avatar } from "antd"
import Router from "next/router"
import { useEffect } from "react"
import { connect } from "react-redux"

import { getAllArticle } from "/redux/actions"

const ListPost = props => {
  const { posts, getAllArticle } = props

  const handleSelectPost = id => () => {
    Router.push(`/posts/${id}/edit`)
  }

  useEffect(() => {
    getAllArticle()
  }, [])

  return (
    <div className="article-list--wrapper">
      <div className="article-list">
        {
          posts ?.map((el, index) => (
            <div key={index} className="article-item--wrapper" onClick={handleSelectPost(el.id)}>
              <div className="article-item">
                <div className="article-item--image">
                  <img src={el ?.contents ?.[0] ?.image} />
                  <div className="article-item--options">
                    <div className="article-item--title is-flex is-flex--center">
                      {el.title}
                    </div>
                  </div>
                </div>

                <div className="is-cursor article-item--detail is-flex is-flex--space-between">
                  <div className="is-flex article-item--detail__user">
                    <Avatar size="small" src={el ?.account ?.avatar} />
                    <div className="name">
                      {el ?.account ?.user_name}
                    </div>
                  </div>

                  <div className="is-flex">
                    <div className="article-item--detail__icon is-flex is-flex--center">
                      <span className="icon iconfont mr-5">&#xe8e1;</span>
                      {el ?.count_comments || 0}
                    </div>
                    <div className="ml-10 article-item--detail__icon is-flex is-flex--center">
                      <span className="icon iconfont mr-5">&#xe65e;</span>
                      {el ?.count_reactions || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default connect(null, { getAllArticle })(ListPost)