import React, {Component} from "react";
import './Register.css';

class Register extends Component
{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    nameChange = (event) => {
        this.setState({name: event.target.value});
    }

    emailChange = (event) => {
        this.setState({email: event.target.value});
    }

    passwordChange = (event) => {
        this.setState({password: event.target.value});
    }
    
    onRegisterSubmit = () => {
        fetch("http://localhost:3001/register", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json()).then(user => {
            if (user.id)
            {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else if (user === "user already exists")
            {
                alert("user already exists");
            }
        })
    }


    render()
    {
        return(
            <div>
                <h3 className="back" onClick={() => this.props.onRouteChange('signin')}>go back</h3>

                <div className="mainContainerR">
                    <h1>Register</h1>

                    <div className="NameContR">
                        <h4>Name</h4>
                        <input onChange={this.nameChange} type="text"></input>
                    </div>

                    <div className="emailContR">
                        <h4>Email</h4>
                        <input onChange={this.emailChange} type="email"></input>
                    </div>

                    <div className="passwordContR">
                        <h4>Password</h4>
                        <input onChange={this.passwordChange} type="password"></input>
                    </div>

                    <button onClick={this.onRegisterSubmit}>Register</button>

                </div>
            </div>
            
        );

    }
}

export default Register;