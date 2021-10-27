import './App.css';
import React from 'react'
import ReactDOM from 'react-dom'

class WeatherCard extends React.Component {
    constructor (props)
    {
        super(props);
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

export default WeatherCard;
