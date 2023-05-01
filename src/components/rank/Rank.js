import React, {Component} from 'react';
import './Rank.css';


class Rank extends Component
{
    render()
    {
        return(
            <div className='mainCont2'>
                <div>
                    <h3>hello {this.props.name}</h3>
                </div>
            </div>
        );
    }
}

export default Rank;