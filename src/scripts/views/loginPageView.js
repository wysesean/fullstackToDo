import React from 'react'
import ACTIONS from '../actions'
import STORE from '../store'

var LoginPageView = React.createClass({
	componentWillMount: function(){
		ACTIONS.fetchAllTasks()
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function(){
		STORE.off()
	},
	getInitialState: function(){
		return STORE.data
	},
	render: function(){
		let classValue = 'slide loginSlide'
		return(
			<div className={classValue+=this.state.activeValue==='loginPage'?' active':''}>
				<p>sup</p>
			</div>
		)
	}
})


export default LoginPageView