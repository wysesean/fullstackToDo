import React from 'react'
import ACTIONS from '../../actions'

var LogoutButton = React.createClass({
	render: function() {
		return(
			<div onClick={ACTIONS.logUserOut} id="login-register-link">
				<p>Logout</p>
			</div>
		) 
	}
})

export default LogoutButton