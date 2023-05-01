import React, {Component} from "react";
import './Signin.css';

class Signin extends Component
{
    constructor(){
        super();
        this.state = {
            emailChange: '',
            passwordChange: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({emailChange: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({passwordChange: event.target.value});
    }

    onSubmite = () => {
        fetch("http://localhost:3001/signin", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.emailChange,
                password: this.state.passwordChange
            })
        }).then(response => response.json()).then(data => {
            if (data === 'welcome')
            {
                this.props.onRouteChange('home');
            } else {
                alert("wrong email or password")
            }
        })  
    }

    render()
    {
        return(
            <div className="mainContainer">
                <h1>Sign In</h1>

                <div className="emailCont">
                    <h4>Email</h4>
                    <input onChange={this.onEmailChange} type="email"></input>
                </div>

                <div className="passwordCont">
                    <h4>Password</h4>
                    <input onChange={this.onPasswordChange} type="password"></input>
                </div>

                <button onClick={this.onSubmite}>Sign in</button>
                <h6 onClick={() => this.props.onRouteChange('register')}>Register</h6>

            </div>
        );

    }
}

export default Signin;