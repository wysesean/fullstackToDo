import Backbone from 'backbone'

export var TaskModel = Backbone.Model.extend({
	urlRoot: '/api/task',
	idAttribute: '_id'
})

export var TaskCollection = Backbone.Collection.extend({
	model: TaskModel, 
	url: '/api/task'
})