import React, {Component} from 'react';
import Parse from 'parse';
import 'sweetalert2/dist/sweetalert2.css';
import { Link} from 'react-router-dom';

class Uploadpage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videofile: null,
            videotitle: null,
            videodescription: null,
            challengeid: null,
            challnegeOption: null,
            btnDisable: true,
            filemessag: null,
        }
    }

    componentDidMount() {
        this.retriveChallneges();
        this.session();     
    }

    session() {
        let session = Parse.User.current();
        if(!session) {
            history.pushState(null, null, '/SigIn');
            window.location.reload();
        }
    }

    retriveChallneges() {
        var challneges = Parse.Object.extend('Challenges')
        var query = new Parse.Query(challneges);
        query.find({
            success: (data) => {
                var container = [];
                for(var i = 0; i < data.length; i++) {
                    var object = data[i];
                    container.push(<option  key={i} value={object.id}>{object.get('title')} </option>);
                }
                this.setState({
                    challnegeOption: container
                })

            }
        });
    }
    asignChallnege(event) {
        this.setState({
            challengeid: event.target.value
        })
        
    }

    asignFile(event) {
        this.setState({
            videofile: event.target.files[0],
        })
        var videosize = event.target.files[0].size * 0.0000010;
        if (videosize > 20.00) {
            console.log('video is too large');
            this.setState({
                btnDisable: true,
                filemessag: 'video is too large'
            });
        } else {
            this.setState({
                btnDisable: false,
                filemessag: null
            });
        }
    }

    setTitle(value) {
        this.setState({
            videotitle: value.target.value
        })
    }

    setDescription(value) {
        this.setState({
            videodescription: value.target.value
        })
    }
    cargar(event) {
        this.props.fileup(this.state.videotitle,this.state.videodescription, this.state.videofile, this.state.challengeid); 
    }

    render() {
        return(
            <div className="container Padding" >
                <div className="row" >
                    <div className="graybox">
                        <div className="col">
                            <span className="loginto">Challenge</span>
                            <i className="fa fa-caret-right fa-2x" aria-hidden="true" ></i>
                            <span className="pulsage">Pulsage</span>
                        </div>
                    
                        <div className="w-100"></div>
                        <br />
                        <div className="col">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" onChange={ (value) => this.setTitle(value) }/>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" id="exampleTextarea" rows="3" onChange={ (value) => this.setDescription(value) } >
                                    </textarea>
                                </div>
                                 <div className="form-group">
                                    <label >Category</label>
                                    <select className="form-control" id="exampleSelect1" onChange={ (value) => this.asignChallnege(value) } >
                                        <option value="">Select Category</option>
                                        {this.state.challnegeOption}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Upload file can not be larger than 20mb</label> <br />
                                    <label>{this.state.filemessag}</label>
                                    <input type="file" name="video" accept="video/*" className="form-control-file" onChange={ (value) => this.asignFile(value) }/>
                                </div>

                                <div className="form-group">
                                    <Link to="/"><button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={(event) => this.cargar(event)}  
                                        disabled={this.state.btnDisable}
                                        data-toggle="modal"
                                        data-target="#video">Done</button></Link>
                                </div>
                        </div>
                    </div>
                </div>

               
        
                


            </div>
        );
    }

}

export default Uploadpage;