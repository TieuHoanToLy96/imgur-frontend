import { connect } from "react-redux"

import ListArticle from "/components/ListArticle"
import LayoutUser from "/layouts/layout-user"
import HOC from "/hoc/index"
import { useEffect } from "react"
import { getPostsUser } from "/redux/posts/actions"

const Comments = props => {
  const { posts, account, getPostsUser } = props

  useEffect(() => {
    let params = {
      account_id: account.id,
      account_url: props.query.accountUrl,
      is_get_comment: true
    }

    getPostsUser(params)
  }, [])

  return (
    <LayoutUser {...props} >
      <div className="container">
        <div className="comment mt-20">
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

export default connect(mapStateToProps, { getPostsUser })(HOC(Comments))