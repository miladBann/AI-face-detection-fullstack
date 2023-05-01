import React, {Component} from 'react';
import './ImageForm.css'

class ImageForm extends Component
{
    
    render()
    {
        const { onInputChange, onButtonSubmit } = this.props;

        return(
            <div className='mainCont'>
                <h1>Madina, AI Face Detection System</h1>
                <p>this magic Brain will detect faces in images! give it a try</p>
                <div className='secondCont'>
                    <input type='text' onChange={onInputChange}></input>
                    <button onClick={onButtonSubmit}>Detect</button>
                </div>
            </div>
        );
    }
}

export default ImageForm;