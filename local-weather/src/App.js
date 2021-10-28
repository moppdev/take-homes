import './App.css';
import React from 'react'
import ReactDOM from 'react-dom'

class WeatherCard extends React.Component {
    constructor (props)
    {
        super(props);
        this.state = {
            icon: "",
            location: "",
            fahr_temps: {
                feels_like: 0,
                min: 0,
                max: 0
            },
            cel_temps: {
                feels_like: 0,
                min: 0,
                max: 0}
            };
    }
    render() {
        return (
          // TODO
          <p>TODO</p>
        );
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const domContainer = document.querySelector('#root');
    ReactDOM.render(<WeatherCard />, domContainer);
});

const getWeatherInfo = (lat, long) => {
    fetch(`https://weather-proxy.freecodecamp.rocks/api/current?lon:=${long}&lat:=${lat}`)
    .then(response => response.json)
    .then(data => console.log(data.icon));
};

export default WeatherCard;
