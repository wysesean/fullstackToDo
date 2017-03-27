import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import GummyMenu from './views/gummyMenu'
import STORE from './store'

const app = function() {
	var AppRouter = Backbone.Router.extend({
		routes:{
			'allTasks': 'handleAllTasks',
			'doneTasks': 'handleDoneTasks',
			'undoneTasks': 'handleUndoneTasks',
			'': 'handleDefault'
		},
		handleAllTasks:function(){
			STORE.setActive('allTasks')
			$('.slider-inner').css("transform", "translateX(-" + 0 * $(window).width() + "px) translateZ(0)");
		},
		handleDoneTasks:function(){
			STORE.setActive('doneTasks')
			$('.slider-inner').css("transform", "translateX(-" + 1 * $(window).width() + "px) translateZ(0)");
		},
		handleUndoneTasks:function(){
			STORE.setActive('undoneTasks')
			$('.slider-inner').css("transform", "translateX(-" + 2 * $(window).width() + "px) translateZ(0)");
		},
		handleDefault:function(){
			location.hash = 'allTasks'
		}
	})
	ReactDOM.render(<GummyMenu />, document.querySelector('.container'))
	setTimeout(function(){
		$(".slider").fadeIn(500);
	}, 1000);
	new AppRouter()
	Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..