import React from 'react'
import STORE from '../store'
import TextInputField from './components/textInputField'
import AllTaskView from './allTaskView'
import UndoneTaskView from './undoneTaskView'
import DoneTaskView from './doneTaskView'


var GummyMenu = React.createClass({
	componentDidMount: function(){
		//Set Width to 3x the view width to create 3 slides
		$(".slider-inner").width($(window).width() * 3)
		//Position each slide
		$(".slide").each(function(){
			$(this).width($(window).width());
			$(this).css("left", $(window).width() * $(this).index());
		});	

		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	getInitialState: function(){
		return STORE.data
	},
	changeHash(hashValue){
		location.hash = hashValue
	},
	render:function(){
		return(
			<div className='slider'>
				<div id='input-wrapper'>
					<nav className='slider-nav'>
						<div id='button-wrapper'>
							<div onClick={()=>{this.changeHash('allTasks')}} className={this.state.activeValue==='allTasks'?'allTaskButton active task-button':'allTaskButton task-button'}>
									<h3>All</h3>
							</div>
						</div>
						<div id='button-wrapper'>
							<div onClick={()=>{this.changeHash('doneTasks')}} className={this.state.activeValue==='doneTasks'?'doneTaskButton active task-button':'doneTaskButton task-button'}>
								<h3>Done</h3>
							</div>
						</div>
						<div id='button-wrapper'>
							<div onClick={()=>{this.changeHash('undoneTasks')}} className={this.state.activeValue==='undoneTasks'?'undoneTaskButton active task-button':'undoneTaskButton task-button'}>
									<h3>Undone</h3>
							</div>
						</div>
					</nav>
					<div className='text-input'>
						<TextInputField />
					</div>
				</div>
				<div className='slider-inner'>
					<AllTaskView />
					<DoneTaskView />
					<UndoneTaskView />
				</div>
			</div>
		)
	}
})

export default GummyMenu