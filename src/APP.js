import React, {Component} from "react";
import Navigation from './components/navigation/Navigation'
import LOGO from './components/logo/Logo';
import ImageForm from "./components/url_image_form/ImageForm";
//import Rank from './components/rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/signin/Signin';
import Register from "./components/register/Register";

const initialState = {
    input: "",
    imageURL: "",
    box: {},
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    }
} 


class APP extends Component
{

    constructor(props)
    {
        super(props);

        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined,
        }})
    }

    componentDidMount() {
        fetch("http://localhost:3001/")
        .then(response => response.json())
        .then(data => console.log(data))
    }

    calculateFaceLocation = (data) => {
        const clarifaiImage = data;

        const image = document.getElementById("detectedImage");
        const width = Number(image.width);
        const height = Number(image.height);
        
        return {
            leftCol: clarifaiImage.left_col * width,
            topRow: clarifaiImage.top_row * height,
            rightCol: width - (clarifaiImage.right_col * width),
            bottomRow: height - (clarifaiImage.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }
    
    onInputChange = (event) => {
        this.setState({ input: event.target.value});
    }
    
    onButtonSubmit = () => {
        this.setState({imageURL: this.state.input});
        const url = this.state.input;
        const PAT = '16c9906e256a4ab1897071801cf3eaf7';
        const USER_ID = 'milad2002';       
        const APP_ID = 'my-first-application';
        const MODEL_ID = 'face-detection'; 
        const IMAGE_URL = url;

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });
    
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };
    
        fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
            .then(response => response.json())
            .then(result => {
                let data = result.outputs[0].data.regions[0].region_info.bounding_box;
                this.displayFaceBox(this.calculateFaceLocation(data));
            })
            .catch(error => console.log('error', error));
    }

    onRouteChange = (route) => {
        if (route === 'signin'){
            this.setState(initialState)
        }
        this.setState({route: route});
    }
    
    render()
    {
        return(
            <div>  
                {this.state.route === 'home'
                    ? <div>
                        <Navigation onRouteChange={this.onRouteChange}/>
                        <LOGO />
                        <ImageForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
                        <ParticlesBg type="cobweb" bg={true} num={300} range={400}/>
                      </div> 
                    : (
                        this.state.route === 'signin'
                        ? <div>
                            <Signin onRouteChange={this.onRouteChange}/>
                            <ParticlesBg type="cobweb" bg={true} num={300} range={400}/>
                          </div> 
                        : <div>
                            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                            <ParticlesBg type="cobweb" bg={true} num={300} range={400}/>
                          </div> 
                       )  
                }
            </div>
        );
    }
}



export default APP;