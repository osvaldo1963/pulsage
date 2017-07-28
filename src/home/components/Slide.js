import React, {Component} from 'react';
import './Bannerstyle.css';
import { Link } from 'react-router-dom';


class Slide extends Component {
    render() {
        const slide = this.props.data;
        return(
            <div className="col heroSlide" style={{backgroundImage : 'url(https://ind5.ccio.co/b6/gB/y/e7682b36d441c71ea91b7bffa38c76a5.jpg)'}}>
				<div className="row contentWrapper">
						<div className="col-12 heroTitle toptitle">Popular Challenge</div>
						<div className="col-12 heroTitle ofthisweek">Of This Week :</div>
						<div className="col-12 heroTitle">
							<div className = "chall">
								<span>Challenge</span>
							</div>
						</div>
						<div className="col-12 heroLinks">
							<ul>
								<li className ="">
									<Link to = "ChallengePage" query = {{play : "first"}} >Watch The First</Link> |
								</li>

								<li className ="">
									<Link to = "ChallengePage" query = {{play : "first"}} >Watch The Best</Link> |
								</li>	

								<li className ="">
									<Link to = "ChallengePage"> Post To Challenge</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
        );
    }
}

export default Slide;