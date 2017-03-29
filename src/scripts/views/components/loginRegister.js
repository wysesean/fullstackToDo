import React from 'react'

var LoginRegister = React.createClass({
	handleClick:function(){
		location.hash = 'loginPage'
	},
	render: function() {
		return(
			<div onClick={this.handleClick} id="login-register-link">
				<p>Login / Register</p>
			</div>
		) 
	}
})

export default LoginRegister