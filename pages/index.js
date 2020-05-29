import { connect } from "react-redux"
import { useEffect, useState } from "react"

import HOC from "/hoc/index"
import ListPost from "/components/ListPost"
import ListStory from "/components/ListStory"
import { getAllArticle, getAllStory } from "/pages/actions"

const Index = props => {
  const { homePage, getAllArticle } = props
  const [listStory, setListStory] = useState([])

  useEffect(() => {
    getAllArticle()
    getAllStory({}, data => {
      console.log(data)
      setListStory(data.list_story)
    })
  }, [])

  return (
    <div className="container">
      <div className="mt-50">
        <div className="mt-20">
          <ListStory listStory={listStory || []} />
          <div className="mt-30">
            <ListPost posts={homePage ?.all ?.articles || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    account: state.account.info,
    homePage: state.homePage
  }
}
export default connect(mapStateToProps, { getAllArticle })(HOC(Index))
