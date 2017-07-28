import React, { Component } from 'react';
import Parse from 'parse';
import Videosection from './Videosection';
import {Link} from 'react-router-dom';
import Upload from './Upload';
import './styleSection.css';

class Section extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: ''
        }
    }

    componentDidMount()  {
        this.getvideos();
    }

    getvideos() {
        var challengeVideos = Parse.Object.extend("Videos");
        var query = new Parse.Query(challengeVideos);
        query.equalTo("challengeid", this.props.id);
        query.find({
            success: (data) => {
                var container = [];  
                if(data.length === 0) {
                    container = [<Upload key="" challengeid={this.props.id}/>];
                } else {
                    for(var i = 0;i < data.length; i++){
                        var object = data[i];
                        var url = object.get('video').url();
                        container.push(<Videosection id={object.id} videourl={url} name={object.get('name')}  key={i} />);
                    }
                }
                this.setState({
                    data: container
                })
            }, 
            error: (data, err) => {
                console.log(err.code);
            }
        });
    }

    render() {
        return(      
                <div className="row">
                    <div className="col cell" >             
                        <div>
                            <span className="celltitle"> {this.props.title} </span>
                            <Link to={'/ChallengePage/' + this.props.id} ><span className="viewmore">View More</span></Link>
                        </div>
                        <br/>
                        <br/>
                            <div className="section">{this.state.data}</div>
                    </div>
                </div>
        );
    }
}

export default Section;