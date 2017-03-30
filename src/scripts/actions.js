import STORE from './store'
import {TaskCollection, TaskModel} from './models/taskModel.js'
import User from './models/userModel.js'

var ACTIONS = {
	//Moves task from done to undone
	addTask: function(inputObj){
		inputObj.userID = User.getCurrentUser().get('_id')
		var taskInstance = new TaskModel(inputObj)
		taskInstance.save().then(
			function(response){
				console.log('task added')
				ACTIONS.fetchUserTasks()
			},
			function(err){
				console.log('failed adding task', err)
			}
		)

	},

	//Sends a delete request to server and deletes task with given id.
	deleteTask: function(inputID){
		var task = STORE.data.taskCollection.get(inputID)
		task.destroy().then(
			function(){
				console.log('deleting task')
				ACTIONS.fetchUserTasks()
			},
			function(err){
				console.log('error deleting task', err)
			}
		)
	},

	//Fetches all tasks from the server and stores them in taskCollection which triggers
	// a rerender
	fetchUserTasks: function(){
		var taskColl = STORE.get('taskCollection')
		console.log('fetching users tasks')
		taskColl.fetch({
			data:{
				userID: User.getCurrentUser().get('_id')
			}
		}).then(
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

	//Toggles the completion status (a boolean variable) of a task with a given input.
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
				ACTIONS.fetchUserTasks()
			},
			function(err){
				console.log('error toggling completion status', err)
			}
		)
	},

	//Adds a user to the database
	registerUser: function(userData) {
		User.register(userData).then(
			function(resp){
				console.log(resp.email, ' has registered.')
				ACTIONS.logUserIn(userData.email, userData.password)
			},
			function(err){
				console.log('failed registering user', err)
			}
		)
	},
	logUserIn: function(userEmail, userPass){
		User.login(userEmail, userPass).then(
			function(resp){
				console.log(resp.email, ' has logged in.')
				location.hash='allTasks'
			},
			function(err){
				console.log('failed logging in ', err)
			}
		)
	}, 
	logUserOut: function(){
		User.logout().then(
			function(resp){
				console.log('logged user out')
				location.hash = 'loginPage'
			},
			function(err){
				console.log('failed to log user out')
			}
		)
	}

}

export default ACTIONS