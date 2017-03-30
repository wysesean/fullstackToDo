import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'
import User from '../models/userModel'

import TasksList from '../views/components/taskList'


var DoneTaskView = React.createClass({
	componentWillMount: function(){
		ACTIONS.fetchUserTasks()
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
	render: function(){
		let classValue = 'slide doneSlide'

		return(
			<div className={classValue+=this.state.activeValue==='doneTasks'?' active':''}>
				<TasksList tasks={this.state.taskCollection
					.where({
						completed:true,
						userID:User.getCurrentUser().get('_id')
					})
				} />
			</div>
		)
	}
})

export default DoneTaskView