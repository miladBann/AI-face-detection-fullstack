import React, {Component} from 'react';
import './FaceRecognition.css';

class FaceRecognition extends Component
{
    render()
    {
        return(
            <div className='PicCont'>
                <div className='fixPosition'>
                    <img id='detectedImage' alt='' src={this.props.imageURL} width="500px" height="auto"></img>
                    <div className='bounding-box' style={{top: this.props.box.topRow, right: this.props.box.rightCol, bottom: this.props.box.bottomRow, left: this.props.box.leftCol}}></div>
                </div>
            </div>
        );
    }
}

export default FaceRecognition;