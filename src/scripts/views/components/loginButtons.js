import React from 'react'

var LoginButtons = React.createClass({
	handleLoginButton: function(){
		this.setState({
			buttonStatus: 'loginButtonActive'
		})
		$('body').css('background-color','#ccc')
		$('.slider-inner').css("transform", "translateX(-" + 0 * $(window).width() + "px) translateZ(0)");

	},
	handleRegisterButton: function(){
		this.setState({
			buttonStatus: 'registerButtonActive'
		})
		$('body').css('background-color','#aaa')
		$('.slider-inner').css("transform", "translateX(-" + 1 * $(window).width() + "px) translateZ(0)");

	},
	getInitialState: function(){
		return {
			buttonStatus: 'loginButtonActive'
		}
	},
	render: function() {
		return(
			<div className="LoginButton">
				<nav className='login-nav'>
					<h1 id='titleToDo'>To Do List</h1>

					<div id='button-wrapper'>
						<div onClick={this.handleLoginButton} className={this.state.buttonStatus==='loginButtonActive'?'active':''}>
								<h3>Login</h3>
						</div>
					</div>
					<div id='button-wrapper'>
						<div onClick={this.handleRegisterButton} className={this.state.buttonStatus==='registerButtonActive'?'active':''}>
								<h3>Register</h3>
						</div>
					</div>
				</nav>
			</div>
		) 
	}
})

export default LoginButtons