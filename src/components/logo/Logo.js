import React, {Component} from "react";
import Tilt from 'react-parallax-tilt';
import brainPic from './brain.png';
import './Logo.css';

class LOGO extends Component
{
    render()
    {
        return(
            <div className="logoMain" style={{ position: 'relative', width: '170px', height: '140px' }}>
                <Tilt
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    perspective={1000}
                    scale={1.1}
                    reset
                >
                    <img alt="" src={brainPic}></img>
                </Tilt>
            </div>
        );
    }
}

export default LOGO;