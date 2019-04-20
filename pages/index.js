import { connect } from "react-redux"

import HOC from "/hoc/index"

const Index = props => {
  

  return (
    <div>
     
    </div>
  )
}
const mapStateToProps = state => {
  return {
    account: state.account.info
  }
}
export default connect(mapStateToProps, {})(HOC(Index))
