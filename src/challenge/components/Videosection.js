import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Functions from '../../functions/Functions';
import './stylevideoSection.css';

class Videosection extends Component {
    constructor(props) {
        super(props);
        this.state = {
           title: ''
        }   
    }
    componentDidMount()  {
        var func = new Functions();
        var data = func.capitalizeFirstLetter(this.props.name);
        this.setState({
            title: data,
        })
        
    }
    render() {
        return(
            <div>
                <Link 
                    to={'/Player/' + this.props.id}
                >
                    <div className="videocon" >
                        <span className="videoTitle">{this.state.title}</span>
                        <div className="videoView">
                            <video width="100%" height="100%" playsInline preload>
                                <source  src={this.props.videourl}/>
                            </video>
                        </div>
                        
                        <div className="bottomSection ">
                            <span className="Attemps">By RomoPanda</span>
                            <div className="profile">
                                <img src="http://www.uuthaa.com/contenido/imagenes/usuarios/85/1449512510650_img_222_nafarroa-bai-irunea-propone-ampliar-el-perfil-de-los-destinatarios-de-las-viviendas-municipales.jpg" className="rounded-circle" alt="er'" />
                                <br/>
                                <span className="profileText">By: sodmskdmlsdn</span>
                            </div>
                            <div className="profile ">
                                <img src="http://www.uuthaa.com/contenido/imagenes/usuarios/85/1449512510650_img_222_nafarroa-bai-irunea-propone-ampliar-el-perfil-de-los-destinatarios-de-las-viviendas-municipales.jpg" className="rounded-circle" alt="pic"/>
                                <br/>
                                <span className="profileText">First: Cristian</span>
                            </div>
                        </div>
                    </div>                    
                </Link>
            </div>
        );
    }
}

export default Videosection;