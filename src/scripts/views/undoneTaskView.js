import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'
import User from '../models/userModel'

import TasksList from '../views/components/taskList'

var UndoneTaskView = React.createClass({
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
		let classValue = 'slide undoneSlide'
		return(
			<div className={classValue+=this.state.activeValue==='undoneTasks'?' active':''}>
				<TasksList tasks={this.state.taskCollection
					.where({
						completed:false,
						userID: User.getCurrentUser().get('_id')
					})
				}/>
			</div>
		)
	}
})

export default UndoneTaskView