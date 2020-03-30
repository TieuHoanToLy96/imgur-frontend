import { connect } from "react-redux"

import LayoutUser from "/layouts/layout-user"
import HOC from "/hoc/index"

const Favorites = props => {
  return (
    <LayoutUser {...props} >
      favorites
    </LayoutUser>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.info,
    user: state.account.user
  }
}

export default connect(mapStateToProps, {})(HOC(Favorites))