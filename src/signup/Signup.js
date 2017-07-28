import React, { Component } from 'react';
var Parse = require('parse');
const Style = {
    alignCenter: {
        textAlign: 'center',
    }
}

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Username: '',
            Password: '',
            ConfirmPass: '',
        }

    }

    updateEmail(value) {
        this.setState({
            Email: value.target.value,
        });
    }

    Updateusername(value) {
        this.setState({
            Username: value.target.value,
        });

    }

    updatePassword(value) {
        this.setState({
            Password: value.target.value,
        });
    }
    updateConpass(value) {
        this.setState({
            ConfirmPass: value.target.value,
        });
    }

    singup() {
        var pass = this.state.Password;
        var rpass = this.state.ConfirmPass;
        var user = new Parse.User();

        if(pass === rpass) {
            user.set("username", this.state.Email);
            user.set("email", this.state.Email);
            user.set("password", this.state.Password);
            user.signUp(null, {
                success: function(user) {
                    history.pushState(null, null, '/');
                    window.location.reload();
                }, 
                error: function(user, error) {
                    console.log(error);
                    console.log(user);
                }
            });
        } else {
            alert("password does not match");
        }

        
    }

    render() {
        return(
            <div className="container Padding">
                <div className="row">
                    <div className="graybox">
                        <div className="col" style={Style.alignCenter}>
                            <br/>
                            <span className="loginto">Log Into</span>
                            <i className="fa fa-caret-right fa-2x" aria-hidden="true" ></i>
                            <span className="pulsage">Pulsage</span>
                        </div>
                        <br/>
                        <div className="w-100"></div>
                        <div className="col">
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail" onChange={(value) => this.updateEmail(value)}/> 
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" onChange={(value) => this.Updateusername(value)}/> 
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password" onChange={(value) => this.updatePassword(value)}/> 
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Confirm Password" onChange={(value) => this.updateConpass(value)}/> 
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-danger" onClick={this.singup.bind(this)}>Login</button> 
                                </div>

                            </form>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Signup;