import React, {Component} from 'react';
import Parse from 'parse';

const Style = {
    alignCenter: {
        textAlign: 'center',
    }
}
class Resetpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: ''
        }
    }

    updateEmail(value) {
        this.setState({
            Email: value.target.value,
        });
    }
    resetPassword() { 
    
    }
    render() {
        return(
            <div className="container Padding">
                <div className="row">
                    <div className="graybox">
                        <div className="col" style={Style.alignCenter}>
                            <br/>
                            <span className="loginto">Reset Password</span>
                            <i className="fa fa-caret-right fa-2x" aria-hidden="true" ></i>
                            <span className="pulsage">Pulsage</span>
                        </div>
                        <br/>
                        <div className="w-100"></div>
                        <div className="col">
                            <form>
                                <div className="form-group">
                                    <input 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="E-mail" 
                                    onChange={(value) => this.updateEmail(value)}/> 
                                </div>
                
                                <div className="form-group">
                                    <button type="button" className="btn btn-danger" onClick={this.resetPassword.bind(this)}>Reset</button> 
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

export default Resetpassword;