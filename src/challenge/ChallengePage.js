import React, {Component} from 'react';
import Functions from '../functions/Functions';
import Videosection from './components/Videosection';

class ChallengePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videosSection: '',
        }

    }

    componentDidMount() {
        this.loadcontent();
    }

    loadcontent() {
        var func = new Functions();
        var data = func.getdataEqualTo("Videos", this.props.match.params.id);
        data.find({
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
            error: (data, error) => {
                console.log(error);
            }
        });
    }

    render() {
        return(
            <div>{this.state.videosSection}</div>
        );
    }
}

export default ChallengePage;