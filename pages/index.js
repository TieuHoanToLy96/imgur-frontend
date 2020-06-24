import { connect } from "react-redux"

import HOC from "/hoc/index"
import ListPost from "/components/ListPost"
import ListStory from "/components/ListStory"
import ListFriend from "/components/ListFriend"

const Index = props => {
  const { homePage } = props

  return (
    <div className="is-flex">
      <div className="" style={{ width: "calc(100% - 340px)" }}>
        <div className="mt-50" style={{ width: "80%", margin: "auto" }}>
          <ListStory />
          <div className="mt-30">
            <ListPost posts={homePage ?.all ?.articles || []} />
          </div>
        </div>
      </div>

      <ListFriend {...props} />
    </div>
  )
}
const mapStateToProps = state => {
  return {
    account: state.account.info,
    homePage: state.homePage
  }
}
export default connect(mapStateToProps, {})(HOC(Index))
