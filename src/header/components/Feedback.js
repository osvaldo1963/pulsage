import React, {Component} from 'react';
import Parse from 'parse';
class Feedback extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            feedtext: '',
            feedmessage: '',
            messageColor: '',
        }
    }

    sendfeedback() {
        if(this.state.feedtext !== '') {
            var currentuser = Parse.User.current();
            var feedback = new Parse.Object('FeedBack');
                feedback.set('feedback', this.state.feedtext);
                    if(currentuser !== null){
                        feedback.set('Users', currentuser.id);
                    } else {
                        feedback.set('Users', 'none');
                    }
                feedback.save(null, {
                    success: (response) => {
                        this.setState({
                                feedtext: ''
                        })
                    }, 
                    error: (err) => {
                        console.log(err.code);
                    }
                });
        }
    }
     
    render(){
        return(
            <div className="modal fade" id="myModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">FeedBack</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body" >
                                <div className="form-group">
                                    <label >Tell us what to improve. What don't you like?</label>
                                    <textarea 
                                        type="text" 
                                        className="form-control"
                                        placeholder="Write something in here" 
                                        value={this.state.feedtext} 
                                        onChange={ (value) => {
                                            this.setState({
                                                feedtext: value.target.value,
                                            })
                                        } }
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={ this.sendfeedback.bind(this) }>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Feedback;