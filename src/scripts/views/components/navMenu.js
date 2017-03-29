import React from 'react'
import TextInputField from './textInputField'
import STORE from '../../store'
import LoginRegister from '../components/loginRegister'

var NavMenu = React.createClass({
	componentDidMount: function(){
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	getInitialState: function(){
		return STORE.data
	},
	handleClick(e,hashValue){
		location.hash = hashValue
	},
	render: function() {
		return(
			<div id='input-wrapper'>
				<nav className='slider-nav'>
					<div id='button-wrapper'>
						<div onClick={(e)=>{this.handleClick(e,'allTasks')}} className={this.state.activeValue==='allTasks'?'allTaskButton active task-button':'allTaskButton task-button'}>
								<h3>All</h3>
						</div>
					</div>
					<div id='button-wrapper'>
						<div onClick={(e)=>{this.handleClick(e,'doneTasks')}} className={this.state.activeValue==='doneTasks'?'doneTaskButton active task-button':'doneTaskButton task-button'}>
							<h3>Done</h3>
						</div>
					</div>
					<div id='button-wrapper'>
						<div onClick={(e)=>{this.handleClick(e,'undoneTasks')}} className={this.state.activeValue==='undoneTasks'?'undoneTaskButton active task-button':'undoneTaskButton task-button'}>
								<h3>Undone</h3>
						</div>
					</div>
				</nav>
				<div className='text-input'>
					<TextInputField />
				</div>
				<LoginRegister />
			</div>
		) 
	}
})

export default NavMenu