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
        this.handleConversions = this.handleConversions.bind(this);
    }
    handleConversions()
    {
        let newData = [...this.state.data];
        if (this.state.fahr_temps === false)
        {
            newData[2] = convertToFahr(newData[2]);
            newData[3] = convertToFahr(newData[3]);
            newData[4] = convertToFahr(newData[4]);
            newData[5] = convertToFahr(newData[5]);
           this.setState({
             fahr_temps: true,
             data: newData
           })
        }
        else
        {
          newData[2] = convertToCel(newData[2]);
          newData[3] = convertToCel(newData[3]);
          newData[4] = convertToCel(newData[4]);
          newData[5] = convertToCel(newData[5]);
          this.setState({
            fahr_temps: false,
            data: newData
          })
        }
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
          button = <button className={"btn btn-primary"} onClick={this.handleConversions}>Convert To Fahrenheit</button>;
        }
        else
        {
          button = <button className={"btn btn-primary"} onClick={this.handleConversions}>Convert To Celsius</button>
        }
        if (this.state.loaded === true)
        {
          if (this.state.fahr_temps === true)
          {
            return (
              <div className="contain">
                  <h2 className={"titles"}>Your Weather:</h2>
                  <div>
                    <img className={"img-fluid"} src={this.state.data[0]} alt={`icon of  {this.state.data[1]}`}/>
                    <span id={"main-temp"}><h3>{this.state.data[3]}&#8457;</h3></span>
                  </div>
                  <b><p className={"info"}>{this.state.data[6]}</p></b>
                  <hr className={"separator"}/>
                  <div className={"second-container"}>
                      <h3 className={"titles"}>Today's Temps:</h3>
                      <p><b>Min:</b> {this.state.data[3]}&#8457;</p>
                      <p><b>Max:</b> {this.state.data[4]}&#8457;</p>
                      <p><b>Feels Like:</b> {this.state.data[5]}&#8457;</p>
                  </div>
                  <hr className="separator"/>
                  {button}
              </div>
            );
          }
          else 
          {
            return (
              <div className="contain">
                  <h2 className={"titles"}>Your Weather:</h2>
                  <span>
                    <img className={"img-fluid"} src={this.state.data[0]} alt={`icon of  {this.state.data[1]}`}/>
                    <span id={"main-temp"}><h3>{this.state.data[3]}&#8451;</h3></span>
                  </span>
                  <b><p className={"info"}>{this.state.data[6]}</p></b>
                  <hr className={"separator"}/>
                  <div className={"second-container"}>
                      <h3 className={"titles"}>Today's Temps:</h3>
                      <p><b>Min:</b> {this.state.data[3]}&#8451;</p>
                      <p><b>Max:</b> {this.state.data[4]}&#8451;</p>
                      <p><b>Feels Like:</b> {this.state.data[5]}&#8451;</p>
                  </div>
                  <hr className="separator"/>
                  {button}
              </div>
            );
          }
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
    let result = (num * 9/5) + 32;
    return parseFloat(result.toFixed(2));
};

const convertToCel = (num) => {
  let result = (num - 32) * (5/9);
  return parseFloat(result.toFixed(2));
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
