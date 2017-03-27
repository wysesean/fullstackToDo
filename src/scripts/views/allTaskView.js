import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

var AllTaskView = React.createClass({
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
		let classValue = 'slide allSlide'
		if(this.state.activeValue==='allTasks'){
			$('.slider').css('background-color','#e94f37')
		}
		return(
			<div className={classValue+=this.state.activeValue==='allTasks'?' active':''}>
				<AllTasksList tasks={this.state.taskCollection} />
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
				{this.props.tasks.models.map(this._createTaskElements)}
			</div>
		)
	}
})

//Receives props 'uniqueID' and 'taskDescription'
var TaskElement = React.createClass({
	tickCheckBox:function(id){
		ACTIONS.toggleTask(id)
	},

	render:function(){
		return(
			<div id='task-element' onClick={()=>{this.tickCheckBox(this.props.uniqueID)}}>
				<div className='task-wrapper'>
					<div className={this.props.completed?'tickBox ticked':'tickBox'}></div>
					<p className={this.props.completed?'crossed':''}>{this.props.taskDescription}</p>
				</div>
			</div>
		)
	}
})


export default AllTaskView