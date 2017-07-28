import React, { Component } from 'react';
import NavStyle from '../style';
import Parse from 'parse';
import {Link} from 'react-router-dom';

class UserBtn extends Component {
    constructor(props) {
        super(props);
        var user = Parse.User.current();
        user.fetch({
            success: (user) => {
                //console.log(user.get('username'));
            }, 
            error: (err) => {

            }
        });
        this.state = {
            user: Parse.User.current().get('username'),
        }
    }
    
    LogoutAction() {
        Parse.User.logOut();
            history.pushState(null, null, '/');
            window.location.reload();
    }

    render() {
        return(
            <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="0">
                                  <i className="fa fa-bars fa-lg" aria-hidden="true"></i>
                              </a>
                              <div className="dropdown-menu dropdown-menu-right navbar-drop" style={NavStyle.style.dropdownProfile} aria-labelledby="navbarDropdownMenuLink">
                                  <Link to="/Profile"><a className="dropdown-item" href="#"><i className="fa fa-user" aria-hidden="true"></i> {this.state.user}</a></Link>
                                  <div className="dropdown-divider"></div>
                                  <a className="dropdown-item" href="#" onClick={this.LogoutAction.bind(this)}><i className="fa fa-sign-out" aria-hidden="true"></i>Sing out </a>
                              </div>
                          </li>
        );
    }
}

export default UserBtn;