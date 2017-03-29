import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import GummyMenu from './views/gummyMenu'
import STORE from './store'
import NavMenu from './views/components/navMenu'
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const app = function() {
	var AppRouter = Backbone.Router.extend({
		routes:{
			'loginPage': 'handleLoginRegister',
			'allTasks': 'handleAllTasks',
			'doneTasks': 'handleDoneTasks',
			'undoneTasks': 'handleUndoneTasks',
			'': 'handleDefault'
		},
		handleLoginRegister:function(){
			STORE.setActive('loginPage')

			$('#input-wrapper').css("opacity","0");
			
			$('#input-wrapper').fadeOut(750);

			$('.slider').css('background-color','#ddd')
			$('.loginSlide').css('background-color','#ddd')
			$('.slider-inner').css("transform", "translateX(-" + 0 * $(window).width() + "px) translateZ(0)");
		},
		handleAllTasks:function(){
			STORE.setActive('allTasks')
			ReactDOM.render(<NavMenu />, document.querySelector('.nav-container'))

			$('#input-wrapper').css("opacity","1");

			setTimeout(function(){
				$('#input-wrapper').fadeIn(750);
			}, 500);
			$('.loginSlide').css('background-color','#e94f37')
			$('.slider-inner').css("transform", "translateX(-" + 1 * $(window).width() + "px) translateZ(0)");
		},
		handleDoneTasks:function(){
			STORE.setActive('doneTasks')
			ReactDOM.render(<NavMenu />, document.querySelector('.nav-container'))

			$('.slider-inner').css("transform", "translateX(-" + 2 * $(window).width() + "px) translateZ(0)");
		},
		handleUndoneTasks:function(){
			STORE.setActive('undoneTasks')
			ReactDOM.render(<NavMenu />, document.querySelector('.nav-container'))

			$('.slider').css('background-color','#3f88c5')
			$('.slider-inner').css("transform", "translateX(-" + 3 * $(window).width() + "px) translateZ(0)");
		},
		handleDefault:function(){
			location.hash = 'allTasks'
		}
	})

	ReactDOM.render(<GummyMenu />, document.querySelector('.container'))
	setTimeout(function(){
		$(".slider").fadeIn(750);
	}, 50);

	new AppRouter()
	Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..