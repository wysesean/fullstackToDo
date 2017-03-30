import React from 'react'
import STORE from '../../store'
import ACTIONS from '../../actions'
import User from '../../models/userModel'

var TextInputField = React.createClass({
	_handleKeyDown:function(event){
		if(event.key === 'Enter'){
			var obj = {
				userID: User.getCurrentUser().get('_id'),
				taskDescription: event.target.value
			}
			location.hash = 'allTasks'
			ACTIONS.addTask(obj)
			console.log('heres whats in data now', STORE.data)
			event.target.value = ''
			if(event.preventDefault) event.preventDefault(); // This should fix it
			return false // Just a workaround for old browsers		
		}
	},
	render:function(){
		return(
			<div id='textInput'>
				<textarea onKeyPress={this._handleKeyDown} rows='3' data-min-rows='3' placeholder='Create Task'></textarea>
			</div>
		)
	}
})

export default TextInputField