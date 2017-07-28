import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Notibtn extends Component {
    render() {
        return(
            <li className="nav-item">
                <a className="nav-link"><Link to="Upload"><i className="fa fa-upload fa-lg" aria-hidden="true"></i></Link></a>
            </li>
        );
    }
}

export default Notibtn;