import React, { Component } from 'react';
import Parse from 'parse';
import './style.css';
import Section from '../challenge/components/Section';
import Banner from './components/Banner';

const style= {
    TopBottom: {
        width: 200,
    },
    videoSection: {
        height: 200,
    },
    horizontals: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    }
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            challengeSection: [],
        }
    }

    componentDidMount() {
        this.renderChallenges();
    }

    renderChallenges() {
        var challengeCl = Parse.Object.extend("Challenges");
        var query = new Parse.Query(challengeCl);
            query.find({
                success: (data) => {
                    var sectionHolder = [];
                    for(var key = 0; key < data.length; key++) {
                        var object = data[key];
                        sectionHolder.push(<Section id={object.id} title={object.get("title")} key={key} />);
                    }
                    this.setState({
                        challengeSection: sectionHolder,
                    })
                }, 
                error: (data, error) => {
                    
                } 
            });
    }
  
    render() {
      return(
        <div className="container-fluid">
            <div className="row">
                <div className="col main">
                    <div className="row"> 
                        <Banner />
                        <div className="w-100"></div>
                        <div className="col">
                            <div style={style.horizontal}>
                                {this.state.challengeSection}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }

}
export default Home;
