import React, { Component } from 'react';
import Parse from 'parse';
import './ProfileStyle.css';
import Functions from '../functions/Functions';
import Videosection from '../challenge/components/Videosection';


const Style = {
    centerAligntment: {
        textAlign: 'center',
    },
    sectionBtn: {
        width: 120,
        padding: [20, 20],
   
    }, 
    FollowBtn: {
        width: 140,
    },
    sectionTitle: {
        fontSize: 20,
    },
    lightgray: {
        color: 'gray',
    },
    prifilePic: {
        width: 100,
        height: 90,
    }
}

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            email: '',
            username: '',
            emailInput: '',
            usernameInput: '',
            currentPass: '',
            newpassInput: '',
            profilePicture: '',
            proPicHolder: '',
            videosSection: ''
        }
         
    }

    componentDidMount() {
        this.session();
        this.getVideo();  
    }
    componentWillUnmount(){

    }

    session() {
        let session = Parse.User.current();
        
        if(!session) {
            history.pushState(null, null, '/');
            window.location.reload();
        } else {
            let profilepic = session.get('profilePicture').url();
            console.log(profilepic);
            if(profilepic === '') {
                this.setState({
                    profilePicture: 'https://grandlodgeofvirginia.org/wp-content/uploads/blank-profile.jpg',
                });
            } else {
                this.setState({
                    profilePicture: profilepic,
                });
            }

            this.setState({
                userid: session.id,
                email: session.get('email'),
                emailInput: session.get('email'),
                username: session.get('username'),
                usernameInput: session.get('username'),
                currentPass: '',
                newpassInput: '',
            });
        }
    }

    getVideo() {
        var current = Parse.User.current();
        var func = new Functions();
        console.log(this.state.userid);
        var query =  func.getdataEqueTo("Videos", "user", current.id);
            query.find({
                success: (data) => {
                    var container = [];
                    for(var i = 0; i < data.length; i++){
                        var object = data[i];
                        container.push(<Videosection id={object.id} name={object.get('name')} key={i}/>);
                    }
                    this.setState({
                        videosSection: container
                    })
                }, 
                error: (err) => {
                    console.log(err.code);
                }
            });
    }
    
    updateUser() {
        var file = new Parse.File(this.state.proPicHolder.name, this.state.proPicHolder);
        file.save().then( (pic) => {
            var current = Parse.User.current();
            current.set('username', this.state.usernameInput);
            current.set('email', this.state.emailInput);
            current.set('profilePicture', pic);
            /*
            current.save(null, {
                success: (data) => {
                    this.setState({
                        username: data.get('username'),
                        email: data.get('email'),
                        profilePicture: data.get('profilePicture')
                    })
                }, 
                error: (error) => {
                    console.log('');
                }
            });
            */
            current.save().then((data) => {
                this.setState({
                        username: data.get('username'),
                        email: data.get('email'),
                        profilePicture: data.get('profilePicture')
                    })
            });
        });

        
    }


    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col header">          
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                        <div className="col-md-4 col-lg-4 offset-md-4 offset-lg-4 proDiv">
                            <div style={Style.centerAligntment}>
                
                                <img 
                                    src={this.state.profilePicture}
                                    className="img-fluid rounded-circle mx-auto d-block propic" 
                                    style={Style.prifilePic} 
                                    alt="prifilepic"
                                />     
                                <span className="untext">{this.state.username} </span>&emsp;<span><a href="#" data-toggle="modal" data-target="#exampleModal"><i className="fa fa-cog fa-lg" aria-hidden="true"></i></a></span><br/><br/>
                                <button type="button" className="btn btn-sm btn-secondary" style={Style.FollowBtn}>Followers 239</button>
                                <button type="button" className="btn btn-sm btn-secondary" style={Style.FollowBtn}>Following 3456</button>
                            </div>   
                        </div>

                        <div className="col" style={Style.centerAligntment}>
                            <button type="button" className="btn btn-secondary hideborder" style={Style.sectionBtn}><i className="fa fa-video-camera" aria-hidden="true"></i><br/>Best Videos</button>
                            <button type="button" className="btn btn-secondary hideborder" style={Style.sectionBtn}><i className="fa fa-video-camera" aria-hidden="true"></i><br/>First Video</button>
                            <button type="button" className="btn btn-secondary hideborder" style={Style.sectionBtn}><i className="fa fa-video-camera" aria-hidden="true"></i><br/>Best Videos</button>
                            <button type="button" className="btn btn-secondary hideborder" style={Style.sectionBtn}><i className="fa fa-video-camera" aria-hidden="true"></i><br/>Best Videos</button>
                        </div>
                        <div className="col prolowercontainer">
                        <br/>
                        <div>
                        <span style={Style.sectionTitle}>My Videos</span>
                         
                            <div className="col">
                                {this.state.videosSection}
                            </div>
                        </div> 
                        </div>
                        
                    </div>
                </div>

            <div className="modal fade" id="exampleModal"   aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Profile Information</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label style={Style.lightgray}>Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" value={this.state.emailInput} onChange={
                                (value) => this.setState({emailInput: value.target.value})
                            }/>
                            
                        </div>
                        <div className="form-group">
                            <label style={Style.lightgray}>Username</label>
                            <input type="text" className="form-control" id="userInput"  placeholder="Enter username" value={this.state.usernameInput} onChange={
                                (value) => this.setState({usernameInput: value.target.value})
                            }/>
                            
                        </div>
                        <div className="form-group">
                            <label style={Style.lightgray}>Current Password</label>
                            <input type="password" className="form-control" id="exampleInputEmail1" placeholder="Current password" onChange={
                                (value) => this.setState({currentPass: value.target.value})
                            }/>
                        </div>
                        <div className="form-group">
                            <label style={Style.lightgray}>New Password</label>
                            <input type="password" className="form-control" id="exampleInputEmail1" placeholder="New password" onChange={
                                (value) => this.setState({newpassInput: value.target.value})
                            }/>
                        </div>
                        <div className="form-group">
                            <label style={Style.lightgray}>Prifile Picture</label>
                            <input type="file" className="form-control-file" id="exampleInputEmail1"  accept="image/*" onChange={
                                (file) => this.setState({ proPicHolder: file.target.files[0]})
                            }/>
                        </div>                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.updateUser.bind(this)} data-dismiss="modal">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Profile;