import './App.css';
import React from 'react'
import ReactDOM from 'react-dom'

class WeatherCard extends React.Component {
    constructor (props)
    {
        super(props);
        this.state = {
            data: [],
            fahr_temps: false,
            loaded: false
        }
    }
    handleConversions(type)
    {

    }
    componentDidMount()
    {
        if (navigator.geolocation)
        {
          navigator.geolocation.getCurrentPosition((pos) => {
            fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lon=${pos.coords.longitude}&lat=${pos.coords.latitude}`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              let newData = [data.weather[0].icon, data.weather[0].description, 
              data.main.temp, data.main.temp_min, data.main.temp_max, data.main.feels_like, data.name + ", " + data.sys.country];
              this.setState({
                data: this.state.data.concat(newData),
                loaded: true
              })
            });
          }, showError);
        }
        else 
        {
          alert("Geolocation is not supported by your browser");
        }
    }
    render() {
        let fahrOrCel = this.state.fahr_temps;
        let button;
        if (fahrOrCel === false)
        {
          button = <button className={"btn btn-primary"}>Convert To Fahrenheit</button>;
        }
        else
        {
          button = <button className={"btn btn-primary"}>Convert To Celsius</button>
        }
        if (this.state.loaded === true)
        {
          return (
            <div className="container">
                <img src={this.state.data[0]} alt={`icon of  {this.state.data[1]}`}/>
                <span id={"main-temp"}><h3>{this.state.data[3]}&#8451;</h3></span>
                <p>{this.state.data}</p>
                {button}
            </div>
          );
        }
        else
        {
          return (
            <div>
               <h2>Loading...</h2>
            </div>
          );
        }
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const domContainer = document.querySelector('#root');
    ReactDOM.render(<WeatherCard />, domContainer);
});

const convertToFahr = (num) => {
    return (num * 9/5) + 32;
};

const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
    }
  }

export default WeatherCard;
