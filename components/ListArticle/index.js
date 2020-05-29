import { Avatar } from "antd"
import Masonry from "react-masonry-component"
import Router from "next/router"

const ListArticle = props => {
  const { posts } = props

  const handleSelectPost = id => () => {
    Router.push(`/posts/${id}/edit`)
  }
  return (
    <Masonry
      className={'post-list'}
      elementType={'div'}
      options={{ gutter: 10 }}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}>
      {
        posts.map((el, index) => (
          <div className="post-item" key={index} onClick={handleSelectPost(el.id)}>

            <img src={el.contents[0].image} />
            <div className="post-item--detail is-flex is-flex--column is-flex--space-between">
              <div className="post-item--detail__title is-flex is-flex--vcenter">
                {el.title}
              </div>
              <div className="is-flex is-flex--space-between is-flex--vcenter">
                <div className="post-item--user is-flex is-flex--vcenter">
                  <Avatar size="small" src={el ?.account ?.avatar} />
                  <div className="name ml-5">
                    {el ?.account ?.user_name}
                  </div>
                </div>

                <div className="is-flex">
                  <div className="post-item--detail__icon">
                    <span className="icon iconfont mr-5">&#xe8e1;</span>
                    {el ?.count_comments || 0}
                  </div>

                  <div className="post-item--detail__icon ml-10">
                    <span className="icon iconfont mr-5">&#xe65e;</span>
                    {el ?.count_reactions || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </Masonry>
  )
}

export default ListArticle