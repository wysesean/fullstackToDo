import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

var LoginPageView = React.createClass({
	componentWillMount: function(){
		$(document).on("keypress", ".preventEnter", function(event) { 
		    return event.keyCode != 13;
		});

	
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function(){
		STORE.off()
	},
	getInitialState: function(){
		return STORE.data
	},
	_handleKeyDown: function(){
		location.hash = 'allTasks'
	},
	render: function(){
		return(
			<div className='loginPage slider'>
				<div className='slider-inner inputs-wrapper'>
					<LoginMenu />
					<RegisterMenu />
				</div>
				<div className="buttonContainer">
				</div>
			</div>
		)
	}
})


var LoginMenu = React.createClass({
	handleLogin: function(evtObj){
		evtObj.preventDefault()
		var formEl = evtObj.target
		ACTIONS.logUserIn(formEl.loginEmail.value, formEl.userPassword.value)
	},
	render: function() {
		return(
			<div className="loginMenu slide">
				<form className="formStyle loginForm" onSubmit={this.handleLogin}>
					<input className="preventEnter" name="loginEmail" type="text" placeholder="Username" />
					<br />
					<input name="userPassword" type="password" placeholder="Password" />
					<br />
					<button type="submit">Sign In</button>
				</form>
			</div>
		) 
	}
})

var RegisterMenu = React.createClass({
	handleRegister: function(evtObj){
		evtObj.preventDefault()
		var formEl = evtObj.target,
			userData = {
				email: formEl.registerEmail.value,
				password: formEl.registerPassword.value
			}
		ACTIONS.registerUser(userData)
	},
	render: function() {
		return(
			<div className="registerMenu slide">
				<form className="formStyle registerForm" onSubmit={this.handleRegister}>
					<input className="preventEnter" name="registerEmail" type="text" placeholder="Username" />
					<br />
					<input name="registerPassword" type="password" placeholder="Password" />
					<br />
					<button type="submit">Register</button>
				</form>
			</div>
		) 
	}
})
export default LoginPageView