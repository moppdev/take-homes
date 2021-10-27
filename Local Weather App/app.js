'use strict';

class WeatherCard extends React.Component {
    constructor (props)
    {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Weather</h1>
            </div>
        );
    };
};

document.addEventListener("DOMContentLoaded", () => {
    const domContainer = document.querySelector('#like_button_container');
    ReactDOM.render(<WeatherCard />, domContainer);
});