import React, { Component } from 'react';
import Slider from 'react-slick';
import './Bannerstyle.css';
import Slide from './Slide';

class Banner extends Component {

    render() {
		const settings={
			slidesToShow: 1,
			arrows: false,
			speed: 1000,
			autoplay: true,
			autoplaySpeed: 5000,
			infinite: true
		}
		const slider = [{'sdsd': [
			{
				challenge: 'sdsd'
			}
		]}];
        return(
			<Slider
				{...settings}
				className="heroSlider"
			>
				<div>
					{
						slider.map( (value) => {
							return <div><Slide data={value} /> </div>
						})
					}
				</div>
			</Slider>            
        );
    }
}

export default Banner;