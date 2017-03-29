import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

var UndoneTaskView = React.createClass({
	componentWillMount: function(){
		ACTIONS.fetchAllTasks()
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
				<UndoneTasksList tasks={this.state.taskCollection.where({completed:false})} />
			</div>
		)
	}
})

//Receives props 'tasks' which is an array called allTasks filled with objects
var UndoneTasksList = React.createClass({
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


export default UndoneTaskView