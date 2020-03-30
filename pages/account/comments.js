import { connect } from "react-redux"

import LayoutUser from "/layouts/layout-user"
import HOC from "/hoc/index"

const Comments = props => {
  return (
    <LayoutUser {...props} >comments</LayoutUser>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info,
    user: state.account.user
  }
}

export default connect(mapStateToProps, {})(HOC(Comments))