import {Button} from "antd"
import {connect} from "react-redux"

import HOC from "../hoc/index"
import {setToken} from "../pages/actions.js"

const Index = props => {
  const {setToken} = props
  return (
    <div>
      <Button onClick={() => setToken("KKKK")}> SET TOKEN</Button>
    </div>
  )

}
const mapStateToProps = state => {
  return {
    token: null
  }
}
export default connect(mapStateToProps, {setToken})(HOC(Index))
