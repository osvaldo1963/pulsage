import React, {Component} from 'react';
import pulsageLogoGrey from '../images/pulsageLogoGrey.png';
import './style.css';

class Footer extends Component {
    render() {
        return(
            <footer>
			<div className="footer row">
				<div className="footerLeft col col-xs-6  offset-sm-2 ">
					<ul className="footerItems">
						<li>Contact Us</li>
						<li>The Team</li>
						<li>Our Mission</li>
					</ul>
				</div>
				<div className="footerRight col col-xs-6  offset-sm-2">
					<ul className="footerItems">
						<li>Portland, OR</li>
						<li>info@pulsage.com</li>
						<li>
							<a href="#" className="fa fa-facebook"></a>
							<a href="#" className="fa fa-twitter"></a>
							<a href="#" className="fa fa-instagram"></a>
						</li>
					</ul>
				</div>
			</div>
			<div className="footerBottom row">
				<div className="col offset-sm-2">
					<img className="footerLogo" src={pulsageLogoGrey} alt="footerLogo"></img>
				</div>
			</div>
		</footer>
        );
    }
}

export default Footer;