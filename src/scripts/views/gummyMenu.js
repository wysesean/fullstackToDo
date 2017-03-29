import React from 'react'
import STORE from '../store'
import TextInputField from './components/textInputField'
import AllTaskView from './allTaskView'
import UndoneTaskView from './undoneTaskView'
import DoneTaskView from './doneTaskView'
import LoginPageView from './loginPageView'
import NavMenu from './components/navMenu'

var GummyMenu = React.createClass({
	componentDidMount: function(){
		//Set Width to 4x the view width to create 4 slides
		$(".slider-inner").width($(window).width() * 4)
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
	handleClick(e,hashValue){
		location.hash = hashValue
	},
	render:function(){
		return(
			<div className='slider'>
				<div className="nav-container">
				</div>
				<div className='slider-inner'>
					<LoginPageView />
					<AllTaskView />
					<DoneTaskView />
					<UndoneTaskView />
				</div>
			</div>
		)
	}
})

export default GummyMenu