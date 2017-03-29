import STORE from './store'
import {TaskCollection, TaskModel} from './models/taskModel.js'
import User from './models/userModel.js'

var ACTIONS = {
	//Moves task from done to undone
	addTask: function(inputObj){
		var taskInstance = new TaskModel(inputObj)
		taskInstance.save().then(
			function(response){
				console.log('task added')
				ACTIONS.fetchAllTasks()
			},
			function(err){
				console.log('failed adding task', err)
			}
		)

	},
	deleteTask: function(inputID){
		var task = STORE.data.taskCollection.get(inputID)
		task.destroy().then(
			function(){
				console.log('deleting task')
				ACTIONS.fetchAllTasks()
			},
			function(err){
				console.log('error deleting task', err)
			}
		)
	},
	fetchAllTasks: function(){
		var taskColl = STORE.get('taskCollection')
		taskColl.fetch().then(
			function(){
				console.log('fetch succesful')
				STORE.set({
					taskCollection: taskColl
				})
			},
			function(err){
				console.log('error fetching tasks', err)
			}
		)
	},
	toggleTask: function(inputID){
		var task = STORE.data.taskCollection.get(inputID)
		console.log(task)
		if(task.get('completed')){
			task.set({completed:false})
		}
		else{
			task.set({completed:true})
		}
		task.save().then(
			function(){
				ACTIONS.fetchAllTasks()
			},
			function(err){
				console.log('error toggling completion status', err)
			}
		)
	},

	registerUser: function(userData) {
		User.register(userData)
			.done(
				//success function
				function(resp) {
					alert(`new user ${resp.email} registered`)
					console.log(resp)
					ACTIONS.logUserIn(userData.email, userData.password)
				}
				)
			.fail(
				function(err) {
					alert('problem registering user!')
					console.log(err)
				}
			)
	}
}

export default ACTIONS