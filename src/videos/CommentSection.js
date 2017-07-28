import React, {Component} from 'react';
import './Player.css';
class CommentSection extends Component {
    render() {
        return(
            <div className="row commentsDiv">
                <img src="#" className="profilePic" alt="img test"/>
                <div className="comment">
                    {this.props.comment}
                </div>
            </div>
        );
    }

}
export default CommentSection;
