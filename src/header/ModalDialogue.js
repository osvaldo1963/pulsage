import React, {Component} from 'react';
import {Modal, Form, FormGroup, FormControl} from 'react-bootstrap';
import '../pulsage.css';

class ModalDialogue extends Component {
	constructor(props){
		super(props);
		this.state = {
			isVisible : this.props.isVisible,
			content : "",
			formVisible : true,
			feedback : "",
			emailvalue: '',
			password: '',
			repassword: ''
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			isVisible : nextProps.isVisible,
			content : nextProps.content,
		});
	}

	close() {
		this.setState({ showModal: false });
		this.props.showModal(false, "");
  	}

	feedbackInput(event){
		this.setState({feedback : event.target.value})
	}

	feedbackSubmit(){
		this.setState({formVisible : false});
		console.log(this.state.feedback);
		setTimeout(function(){this.props.showModal(false)}.bind(this), 2000);
		setTimeout(function(){this.setState({formVisible : true})}.bind(this), 2100);
	}

	bodyContent(){
		if (this.state.content === "menu"){
			return(
				<Modal.Body className="menuModal">
					<div className="closeButton" onClick={() => this.close()}>X </div>
					<ul className = "menuOptions">
						<li className="menuHighlite"> Create Challenge </li>
						<li onClick = {() =>this.props.showModal(true, "feedback")}>Feedback</li>
						<li> Challeneges Accepted </li>
						<li onClick={() => this.props.showModal(true, "signin")}> Log In </li>
						<li> Profile </li>
					</ul>
				</Modal.Body>
			)
		}
		else if (this.state.content === "feedback"){
		this.feedbackInput = this.feedbackInput.bind(this);
			return(
				<div className="feedbackModal">
					<Modal.Header closeButton>
						<Modal.Title>
							Feedback
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className ={"defaultContent " + (this.state.formVisible ? "" : "collapse")}>

							<div className="form-group">
								<label>Tell us what to improve. What don't you like?</label>
								<textarea type="text" className="form-control" placeholder="Write something in here" onChange= {this.feedbackInput} ></textarea>
							</div>
							<button type="button" className="btn btn-primary" onClick={()=> this.feedbackSubmit()}>Submit</button>
						</div>
						<div className ={"postSubmitContent " + (!this.state.formVisible ? "" : "collapse")}>
							Shots Fired...
						</div>
					</Modal.Body>
				</div>
			)
		}
		else if (this.state.content ==="signin"){
			return (
				<div className="signinModal">
					<Modal.Header closeButton>
							<img className="signinLogo"  alt="Pulsage logo"></img>
							<Modal.Title>
								Sign In
							</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="form-group">
							<div className="row">
								<div className="col">
									<input 
										type="text" 
										name="email" 
										placeholder ="Email"
										onChange={ (value) => this.setState({emailvalue: value.target.value}) }>
									</input>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<input 
										type="password" 
										name="password" 
										placeholder="Password" 
									></input>
								</div>
							</div>
							<div className ="row otherOptions">
								<div className="col-5">
									<button className="forgotPassword blueLink"> Forgot Password </button>
								</div>
								<div className= "col-2">
									<span>Or </span>
								</div>
								<div className="col-5">
									<button className="signUp"> Sign Up </button>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<button className="btn btn-primary" > Login </button>
								</div>
							</div>
						</div>
					</Modal.Body>
				</div>
			)
		}
		else if (this.state.content ==="signup"){
			return (
				<div className="signinModal">
					<Modal.Header closeButton>
						<img className="signinLogo"  alt="Pulsage logo"></img>
							<Modal.Title>
								Sign Up
							</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="form-group">
							<div className="row">
								<div className="col-6">
									<input type="text" name="firstName" placeholder ="First Name"></input>
								</div>
								<div className="col-6">
									<input type="text" name="lastName" placeholder ="Last Name"></input>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<input type="text" name="email" placeholder ="Email"></input>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<input type="text" name="username" placeholder ="Username"></input>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<input type="password" name="password" placeholder="Password"></input>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<input type="password" name="password" placeholder="Confirm Password"></input>
								</div>
							</div>
							<div className="row">
								<div className="col">
									<button className="btn btn-primary"> Sign Up </button>
								</div>
							</div>
						</div>
					</Modal.Body>
				</div>
			)
		}
	}
	render(){
		return (
			<Modal show={this.state.isVisible} onHide={()=>this.close()} className={this.state.isVisible ? "show" : ""} >
					{this.bodyContent()}
			</Modal>
		);
	}
}

export default ModalDialogue;