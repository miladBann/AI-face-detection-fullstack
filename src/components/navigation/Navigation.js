import React, {Component} from "react";
import './Navigation.css';

class Navigation extends Component
{
    render()
    {
        return(
            <nav>
                <p onClick={() => this.props.onRouteChange('signin')}>Sign Out</p>
            </nav>
        );
    }
}

export default Navigation;