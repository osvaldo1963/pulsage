import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Parse from 'parse';

const Style = {
    centerAlignt: {
        textAlign: 'center',
    },
    facebook: {
        color: 'blue',   
    },
    google: {
        color: 'red'
    },
    twitter: {
        color: 'skyblue'
    }, 
    errorDiv: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        borderRadius: 3
    }
}

class SignIn extends Component{
  constructor(props) {
    super(props);
    this.state = {
        EmailValues: '',
        PassValue: '',
        error: null,
    }

  }

  updateEmail(value) {
        this.setState({EmailValues: value.target.value});
  }
    
  updatePass(value) {
      this.setState({PassValue: value.target.value});
  }

  login() {
    Parse.User.logIn(this.state.EmailValues, this.state.PassValue, {
        success: (user) => {
            this.setState({
                error: null,
            })
            
            history.pushState(null, null, '/');
            window.location.reload();
        },
         error: (user, error) => {
             this.setState({
                error: <div style={Style.errorDiv}> <i className="fa fa-exclamation-triangle fa-1x" aria-hidden="true"></i> Authentication failed. You entered an incorrect username or password.</div> 
             })
         }
    });
  }

  render() {
      return(
        <div className="container Padding" >
        <div className="row" >
            <div className="graybox">
                <div className="col" style={Style.centerAlignt}>
                    <span className="loginto">Log Into</span>
                    <i className="fa fa-caret-right fa-2x" aria-hidden="true" ></i>
                    <span className="pulsage">Pulsage</span>
                </div>
                <div className="w-100" ></div>
                    <br/>
                    <div className="col" style={Style.centerAlignt} >Connect With</div>
                    <br/>
                <div className="w-100" ></div>
                    <div className="col" style={Style.centerAlignt}>
                        <i className="fa fa-facebook-square fa-4x socialPad" style={Style.facebook} aria-hidden="true"></i>
                        <i className="fa fa-google-plus-square fa-4x socialPad" style={Style.google} aria-hidden="true"></i>
                        <i className="fa fa-twitter-square fa-4x socialPad" style={Style.twitter} aria-hidden="true"></i>
                    </div>
                <div className="w-100"></div>
                <br/>
                    <div className="col" style={Style.centerAlignt}>Or Log in Below</div>
                <br/>
                <div className="w-100"></div>
                <div className="col">
                        {this.state.error}
                        <br />
                        <div className="form-group">
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Username or E-mail" onChange={(value) => this.updateEmail(value)} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Password" onChange={(value) => this.updatePass(value)} />
                        </div>
                        <div className="col form-group" >
                            <div className="row">
                                <div className="col-6">
                                    <Link to="/Resetpassword">Forgot Password</Link>
                                </div>
                                <div className="col-1">
                                    <span className="or">Or</span>
                                </div>
                                <div className="col-5">
                                    <Link to="/Signup"><a className="sup">Sign Up</a> </Link>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-danger" onClick={this.login.bind(this)}>Sign In</button>
                        </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default SignIn;
