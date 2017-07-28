import React, {Component} from 'react';
import Parse from 'parse';
import Functions from '../functions/Functions';
class Challenge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category: '',
            categories: null,
        }
        
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        this.loadcategories();
    }

    loadcategories() {
        var func = new Functions();
        var data = func.getdataEqualTo("Categories")
        data.find({
            success: (data) => {
                var container = [];
                for (var i = 0; i < data.length; i++) {
                    var object = data[i];
                    container.push(<option value={object.id} key={i}> {object.get("category")} </option>);
                }
                this.setState({
                        categories: container,
                })
            }, 
            error: (err) => {
                console.log(err);
            }
        });
    }

    createChallenge() {
        var current = Parse.User.current();
        var challenge = new Parse.Object('Challenges');

        challenge.set('title', this.state.title);
        challenge.set('description', this.state.description);
        challenge.set('category', this.state.category);
        challenge.set('user', current.id);
        challenge.save(null, {
            success: (data) => {
                history.pushState(null, null, 'Challenge');
                window.location.reload();
            }, 
            error: (err, more) => {
                console.log(more.code);
            }
        });
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
                                    <input type="text" className="form-control" onChange={(value) => this.setState({ title: value.target.value })}/>
                                    
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea className="form-control" id="exampleTextarea" rows="3" onChange={ (value) => this.setState({ description: value.target.value }) } >
                                    </textarea>
                                </div>
                                 <div className="form-group">
                                    <label >Category</label>
                                    <select className="form-control" id="exampleSelect1" onChange={ (value) => this.setState({ category: value.target.value }) }>
                                        <option value="">Select Category</option>
                                        {this.state.categories}
                                    </select>
                                </div>
                                
                                <div className="form-group">
                                   <button type="button" className="btn btn-danger"  onClick={this.createChallenge.bind(this)}>Done</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Challenge;