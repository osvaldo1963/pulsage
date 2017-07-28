import React, { Component } from 'react';
import {Link,} from 'react-router-dom';
import Parse from 'parse';
//CSS style import
import NavStyle from './style';
//Images import
import pulsagelogo from '../images/pulsagelogo.png';
import plusIcon from '../images/plusIcon.png';
//Componnents
import Notibtn from './components/Notibtn';
import UserBtn from './components/UserBtn';
import FeedBack from './components/Feedback';

class Navbar extends Component {
  constructor(props) {
        super(props);
        this.state = {
            notificationsTab : "hakndksjdbkh" ,
            SinginOrOut: null,
            SingupOrnot: null,
            postChallenge: null,
        }
    }

    componentDidMount() {
        this.CheckSession();
    }

    CheckSession() {
        var session = Parse.User.current();
        if(session) {
            this.setState({
                SinginOrOut: <UserBtn />,
                SingupOrnot: <Notibtn />,
                postChallenge: <Link to="/Challenge"><a className="nav-link" >Post Challenge</a></Link>
            })
        } else {
            this.setState({
                SinginOrOut: <li className="nav-item">
                                <Link to='/sigIn' style={NavStyle.style.linkdecaoration}><span className="nav-link">Sing In</span></Link> 
                             </li>,
                SingupOrnot:  <li className="nav-item">
                                <Link to='/Signup' style={NavStyle.style.linkdecaoration}><span className="nav-link">Sing up</span></Link>
                              </li>,
                postChallenge: '',
            })
        }
    }
    
    feedvalue(value) {
        this.setState({
            feedtext: value.target.value,
        })
    }

    render() {
        return(
            <div style={{width: '100%'}}>
                <nav className="navbar navbar-toggleable-md navbar-light">
                    <button type="button" className="navbar-toggler navbar-toggler-right" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/">
                        <span className="navbar-brand">
                            <img src={pulsagelogo} alt="Pulsage logo"></img>
                        </span>
                    </Link>
                    
                    <div className="uploadButton hidden-lg-up">
                        <Link to='/Upload'>
                            <img src={plusIcon} alt="uploadvideo"></img>
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <div className="search input-group">
                            <input type="text" className="form-control" placeholder="coming soon" aria-describedby="btnGroupAddon"></input>
                            <span className="input-group-addon" id="btnGroupAddon">
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </span>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="modal" data-target="#myModal" href="0">Feedback</a>
                            </li>
                            <li className="nav-item">
                                {this.state.postChallenge}
                                
                            </li>
                            {this.state.SingupOrnot}

                            {this.state.SinginOrOut}
                        </ul>
                    </div>
                </nav>
                <FeedBack />
            </div>
        );
    }
 }


 export default Navbar;
