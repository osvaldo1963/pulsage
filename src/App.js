import React, { Component } from 'react';
import Parse from 'parse';
import { HashRouter, Route } from 'react-router-dom'
import './App.css';

//sweet alert imports
import 'sweetalert2/dist/sweetalert2.css';
import Swal from 'sweetalert2';

//Server connection import
import Parsecon from './Parsecon';

//Page Conponents
import Navbar from './header/Navbar';
import Home from './home/Home';
import SignIn from './signin/signIn';
import Signup from './signup/Signup';
import Profile from './profile/Profile';
import Player from './videos/Player';
import Challenge from './challenge/Challenge';
import ChallengePage from './challenge/ChallengePage';
import Uploadpage from './upload/Uploadpage';
import Footer from './footer/Footer';
import Resetpassword from './resetPassword/Resetpassword';
import ModalDialogue from './header/ModalDialogue';
import Navigation from './header/Navigation';

class App extends Component {
    constructor(props) {
        super(props);
        this.ParseConnection();
        this.state = {
            username: '',
            modalVisible : false,
				modalContent : ""
        }
    }
    ParseConnection() {
        var connect = new Parsecon();
        connect.ConnectToServer();
    }
    componentDidMount() {
        this.CheckSession();   
    }
    //Mark: This will be move to class function
    CheckSession() {
        var currentuser = Parse.User.current();
        if(currentuser){
            this.setState({
                username: currentuser.get('username'),
            })
        }   
    }

    uploadVideo(videoTitle, videoDescription, videoFile, challengeId) {
        var file = new Parse.File(videoFile.name, videoFile);
            file.save().then( (video) => {
                var user = Parse.User.current();
                var upload = new Parse.Object('Videos');
                upload.set('name', videoTitle);
                upload.set('description', videoDescription);
                upload.set('user', user.id);
                upload.set('video', video);
                upload.set('challengeid', challengeId);
                upload.save({
                    success: (object) => {
                        Swal("Upload its done!", "Your video just finish uploading", "success");
                    },  
                    error: (error) => {
                        Swal("Upload error!", "There is a problem try again!", "error");
                    }
                });
            });
    }

    //Set modal visibility and content
	showModal(isVisible, content){
		this.setState({
			modalVisible : isVisible,
			modalContent : content,
		});

    }
    
    /* 
    
    */

    render() {
        return (
            <HashRouter>
                <div>
                    <ModalDialogue
					    content = {this.state.modalContent}
					    isVisible = {this.state.modalVisible}
					    showModal = {(isVisible, content) => this.showModal(isVisible, content)}
				    />
                    <Navigation showModal= { (isVisible, content) => this.showModal(isVisible, content) }/>
                    <Route exact path="/" component={() => ( <Home change={this.state.chan} /> )} />
                    <Route path="/SigIn" component={({match}) => ( <SignIn  match={match}/> )}  />
                    <Route path="/Signup" component={() => ( <Signup /> )} />
                    <Route path="/Profile" component={() => ( <Profile /> )} />
                    <Route path="/Player/:value" component={({match}) => ( <Player match={match}/>)}/>
                    <Route path="/Challenge" component={() => ( <Challenge />)}/>
                    <Route path="/ChallengePage/:id" component={ ({match}) => ( <ChallengePage match={match} />)}/>  
                    <Route path="/Upload" component={ () => (<Uploadpage  fileup={this.uploadVideo.bind(this)}  />) } />
                    <Route path="/Resetpassword" component={ () => (<Resetpassword /> ) }/>
                    <Footer/>
                </div>
            </HashRouter>
        );
    }
}

export default App;
