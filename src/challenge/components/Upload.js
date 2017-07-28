import React, {Component} from 'react';
import {Link} from 'react-router-dom';
const style = {
    greybackground: {
        backgroundColor: 'lightgrey',
        textAlign: 'center',
        top: 80
    }
}
class Upload extends Component {
    render() {
        return(
            <div className="videocon" style={style.greybackground}><Link to="/Upload"><i className="fa fa-upload fa-4x" aria-hidden="true"></i></Link></div>
        );
    }
}

export default Upload;