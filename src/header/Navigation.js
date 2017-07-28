import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../pulsage.css';

class Navigation extends Component {
	constructor(props){
		super(props);
		this.state = {
			//Feedback bar visibilty, default invisible
			feedbackState : ""
		}
	}
	render() {
		//Show feedback bar after 4 seconds
		setTimeout(function(){
			this.setState({feedbackState : "visible"})}.bind(this), 4000
		);
		
		return (
			<nav className="navbar navbar-toggleable-md navbar-light">
				<button type="button" className="navbar-toggler navbar-toggler-right" onClick={() => this.props.showModal(true, "menu")}>
					<span className="navbar-toggler-icon"></span>
				</button>
				<Link to="/">
					<span className="navbar-brand" href="#">
						<img src={require('../img/pulsagelogo.png')} alt="Pulsage logo"></img>
					</span>
				</Link>
				<div className={"navFeedback hidden-lg-up " +  this.state.feedbackState} onClick={() => this.props.showModal(true, "feedback")}>
					<span>Feedback</span>
				</div>
				<div className="uploadButton hidden-lg-up">
					<img src={require('../img/plusIcon.png')} alt="uploadvideo"></img>
				</div>
				<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
					<div className="search input-group">
						<input type="text" className="form-control" placeholder="coming soon" aria-describedby="btnGroupAddon"></input>
						<span className="input-group-addon" id="btnGroupAddon">
							<i className="fa fa-search" aria-hidden="true"></i>
						</span>
					</div>
					<ul className="navbar-nav">
						<li className="nav-link">
							<img src={require('../img/plusIcon.png')} className ="uploadIcon" alt="uploadvideo"></img> Post to Challenge 

						</li>
						<li className="nav-link" onClick={(val, content) => this.props.showModal(true, "feedback")}>
							Feedback
						</li>
						<li className="nav-link" onClick={(val, content) => this.props.showModal(true, "signup")}>
							Sign Up
						</li>
						<li className="nav-link" onClick={() => this.props.showModal(true, "signin")}>
							Sign In
						</li>
					</ul>
				</div>
				</nav>
		);
	}
}

export default Navigation;