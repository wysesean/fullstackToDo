import React from 'react'

//Receives props 'tasks' which is an array called allTasks filled with objects
var TasksList = React.createClass({
	//Creates individual task elements
	_createTaskElements: function(singleElement){
		return(
			<TaskElement 
				key={singleElement.cid}
				taskDescription={singleElement.attributes.taskDescription}
			/>
		)
	},
	render:function(){
		return(
			<div className='task-list'>
				{this.props.tasks.map(this._createTaskElements)}
			</div>
		)
	}
})

//Receives props 'uniqueID' and 'taskDescription'
var TaskElement = React.createClass({
	render:function(){
		return(
			<div id='task-element'>
				<div className='task-wrapper'>
					<p>{this.props.taskDescription}</p>
				</div>
			</div>
		)
	}
})

export default TasksList