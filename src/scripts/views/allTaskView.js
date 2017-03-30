import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'
import User from '../models/userModel'

var AllTaskView = React.createClass({
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
		let classValue = 'slide allSlide'
		return(
			<div className={classValue+=this.state.activeValue==='allTasks'?' active':''}>
				<AllTasksList tasks={this.state.taskCollection
					.where({
						userID:User.getCurrentUser().get('_id')
					})
				} />
			</div>
		)
	}
})

//Receives props 'tasks' which is an array called allTasks filled with objects
var AllTasksList = React.createClass({
	//Creates individual task elements
	_createTaskElements: function(singleElement){
		return(
			<TaskElement 
			key={singleElement.cid}
			uniqueID={singleElement.id}
			taskDescription={singleElement.attributes.taskDescription}
			completed={singleElement.attributes.completed}
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
	tickCheckBox:function(id){
		ACTIONS.toggleTask(id)
	},
	deleteItem:function(e,id){
		ACTIONS.deleteTask(id)
	},
	render:function(){
		return(
			<div id='task-element'>
				<div className='task-wrapper'>
					<img id='explosion-gif' src="" alt="" />
					<div onClick={()=>{this.tickCheckBox(this.props.uniqueID)}} className={this.props.completed?'tickBox ticked':'tickBox'}></div>
					<p className={this.props.completed?'crossed':''}>{this.props.taskDescription}</p>
					<div className='icon-wrapper' onClick={(e)=>{this.deleteItem(e,this.props.uniqueID)}}>
						<i className="material-icons">delete_forever</i>
					</div>
				</div>
			</div>
		)
	}
})


export default AllTaskView