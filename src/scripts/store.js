import Backbone from 'backbone'
import {TaskCollection} from './models/taskModel.js'

var STORE = Object.assign({},Backbone.Events,{
	data:{
		taskCollection: new TaskCollection(),
		activeValue: '',
	},
	set: function(attrs){
		this.data = Object.assign(this.data, attrs)
		this.trigger('dataUpdated')
	},
	get: function(prop){
		return this.data[prop]
	},
	setActive: function(hashLocation){
		this.data.activeValue = hashLocation
		this.trigger('dataUpdated')
	},
	unsetActive: function(){
		this.data.activeValue = ''
		this.trigger('dataUpdated')
	}
})

export default STORE