import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import jQuery from "jquery"
import init from './init'
import GummyMenu from './views/gummyMenu'
import STORE from './store'
import NavMenu from './views/components/navMenu'
import LoginPageView from './views/loginPageView'
import LoginButtons from './views/components/loginButtons'
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
			ReactDOM.render(<LoginPageView />, document.querySelector('.container'))
			ReactDOM.render(<LoginButtons />, document.querySelector('.buttonContainer'))
			$(".slider-inner").width($(window).width() * 2)
			//Position each slide
			$(".slide").each(function(){
				$(this).width($(window).width());
				$(this).css("left", $(window).width() * $(this).index());
			})
			$('.loginPage').fadeIn(750)
		},
		handleAllTasks:function(){
			STORE.setActive('allTasks')
			ReactDOM.render(<GummyMenu />, document.querySelector('.container'))
			ReactDOM.render(<NavMenu />, document.querySelector('.nav-container'))
			
			$(".slider").fadeIn(750);
			$('.slider').css('background-color','#e94f37')
			$('.slider-inner').css("transform", "translateX(-" + 0 * $(window).width() + "px) translateZ(0)");
		},
		handleDoneTasks:function(){
			STORE.setActive('doneTasks')

			ReactDOM.render(<GummyMenu />, document.querySelector('.container'))
			ReactDOM.render(<NavMenu />, document.querySelector('.nav-container'))

			$(".slider").fadeIn(750);
			$('.slider-inner').css("transform", "translateX(-" + 1 * $(window).width() + "px) translateZ(0)");
		},
		handleUndoneTasks:function(){
			STORE.setActive('undoneTasks')

			ReactDOM.render(<GummyMenu />, document.querySelector('.container'))
			ReactDOM.render(<NavMenu />, document.querySelector('.nav-container'))

			$(".slider").fadeIn(750);
			$('.slider').css('background-color','#3f88c5')
			$('.slider-inner').css("transform", "translateX(-" + 2 * $(window).width() + "px) translateZ(0)");
		},
		handleDefault:function(){
			location.hash = 'loginPage'
		}
	})
	
	new AppRouter()
	Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..