import React, { Component } from 'react';
import './Player.css';
import ReactPlayer from 'react-player';
import Parse from 'parse';
import Functions from '../functions/Functions';
import CommentSection from './CommentSection';



class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: '',
            disable: true,
            commentText: '',
            videoLink: '',
            videoTitle: '',
            description: '',
            commentSection: {
                height: 40,
            },
            videocomments: null,
        }
    }

    componentDidMount() {
        this.loadvideo();
        this.loadCommets();
        console.log(this.props);
    }
     
    loadvideo() {
        console.log(Parse.User.current());
        var video = Parse.Object.extend('Videos');
        var query = new Parse.Query(video);
        query.equalTo('objectId', this.props.match.params.value);
        query.find({
            success: (data) => {
                var result = data[0];
                var func = new Functions();
                this.setState({
                    videoLink: result.get('video').url(),
                    videoTitle: func.capitalizeFirstLetter(result.get('name')),
                    description: result.get('description'),
                })
            }, 
            error: (data, err) => {
                console.log(err);
            }
        });
    }

    loadCommets() {
        var func = new Functions();
        var que  = func.getdataEqueTo('VideoComments', 'videoId', this.props.match.params.value);
        que.find({
            success: (comments) => {
                var holder = [];
                for(var i = 0; i < comments.length; i++) {
                    var object = comments[i];
                    holder.push(<CommentSection key={i} comment={object.get('comment')}/>);
                }
                this.setState({
                    videocomments: holder,
                });

            },
            error: (error) => {
                console.log(error);
            }
        });

    }

    change(value) {
        this.setState({
            rate: value.target.value
        })
    }

    editcomment(value) {
        var transvalue = value.target.value;
        if(transvalue === '') {
            this.setState({ 
                disable: true,
                commentText: ''
            })
        } else {
            this.setState({
                commentText: value.target.value,
                disable: false,
                
            })
        }
    }

    submitComment() {
        var userid = Parse.User.current().id;
        var func = new Functions();
        var query = func.insertComment(this.state.commentText, userid, this.props.match.params.value);
        query.save().then( (data) => {    
            var object = data.get('comment');
            var newcomment = <CommentSection key={this.state.videocomments.length} comment={object}/>;
            var holder = this.state.videocomments.slice();
            holder.push(newcomment);
            this.setState({ videocomments: holder })
        });
    }

    render() {
        return(
            <div className="cntainer-fluid">
                <div className="row" >
                    <div className="col main">
                        <div className="col videoP">
                                <ReactPlayer 
                                    url={this.state.videoLink}
                                    playing={true}
                                    className=' videoP'
                                    width='100%'
                                    height='100%'
                                    controls={true}
                                    playsinline
                                />
                        </div>

                        <div className="w-100"></div>

                        <div className="col title font-weight-bold"><span>{this.state.videoTitle}</span></div>

                        <div className="w-100"></div>

                        <div className="col">
                            <div className="row videomenu ">
                                <span className="col-3" > 134 views</span>
                                <span className="col-4">Posted: 2w ago</span>
                                <span className="col-3 "> <i className="fa fa-user" aria-hidden="true"></i> 7 Att</span>
                                <span className="col-2"><i className="fa fa-first-order fa-2x" aria-hidden="true"></i></span>
                            </div>
                        </div>
                        <hr />

                        <div className="w-100"></div>

                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <span>Created by: UberSoft</span>
                                    <br />
                                    <span>Attempt by: Panda</span>
                                </div>
                                <div>
                                    <button type="button" className="btn btn-primary">Accept Challenge</button>
                                </div>
                            </div>
                            <br/>
                            <div className="textContainer_Truncate collapse" id="desCollapse">
                                <p>{this.state.description}</p>
                            </div>
                            <div className="col text-center" >
                                <a className="btn btn-secondary" data-toggle="collapse" href="#desCollapse" aria-expanded="false" aria-controls="desCollapse">
                                    <i className="fa fa-arrow-down" aria-hidden="true"></i> Show Description <i className="fa fa-arrow-up" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                       
                        <div className="w-100"></div>
                        <hr />
                        <div className="col">
                                <div className="row">
                                    <div className="col">
                                        <img src="#" className="profilePic" alt="img test" />
                                        <textarea 
                                            className="form-control comment" 
                                            id="exampleTextarea" 
                                            rows="3" 
                                            placeholder="Add a public comment..." 
                                            value={this.state.commentText}
                                            onChange={ 
                                                (value) => this.editcomment(value)
                                            }
                                        ></textarea>
                                    </div>

                                    <div className="w-100"><br /></div>
                                    
                                    <div className="col">   
                                        <button 
                                            type="button" 
                                            className="col-6 btn btn-secondary btn-sm" 
                                            disabled={this.state.disable} 
                                            onClick={ () => this.setState({ commentText:'', disable: true})}> Cancel </button>
                                        <button  
                                            className="col-6 btn btn-primary btn-sm" 
                                            disabled={this.state.disable}
                                            onClick={
                                                this.submitComment.bind(this)
                                            }> Comment </button> 
                    
                                    </div>

                                    <div className="w-100"><br /></div>

                                    <div className="col">
                                        {this.state.videocomments}
                                    </div>
                            </div>
                        </div>        
                    </div>
                </div>
            </div>          
        );
    }
}

export default Player;