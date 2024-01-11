import { useContext } from 'react';
import WeatherContext from '../context/Data/userContext';

const Highlights = () => {
    const { weatherData } = useContext(WeatherContext)

    // function to get humidity status
    function updateHumidityStatus(humidity) {
        if (humidity <= 30) {
            return "Low";
        } else if (humidity <= 60) {
            return "Moderate";
        } else {
            return "High";
        }
    }

    // function to get visibility status
    function updateVisibiltyStatus(visibility) {
        visibility = visibility / 1000
        if (visibility <= 0.03) {
            return "Dense Fog";
        } else if (visibility <= 0.16) {
            return "Moderate Fog";
        } else if (visibility <= 0.35) {
            return "Light Fog";
        } else if (visibility <= 1.13) {
            return "Very Light Fog";
        } else if (visibility <= 2.16) {
            return "Light Mist";
        } else if (visibility <= 5.4) {
            return "Very Light Mist";
        } else if (visibility <= 10.8) {
            return "Clear Air";
        } else {
            return "Very Clear Air";
        }
    }


    return (
        <>
            <div className="cards">
                <div className="card2">
                    <h4 className="card-heading">Wind Status</h4>
                    <div className="content">
                        <p className="wind-speed">{weatherData.windSpeed}</p>
                        <p>m/h</p>
                    </div>
                </div>
                <div className="card2">
                    <h4 className="card-heading">Humidity</h4>
                    <div className="content">
                        <p className="humidity">{weatherData.humidity}</p>
                        <p className="humidity-status">{updateHumidityStatus(weatherData.humidity)}</p>
                    </div>
                </div>
                <div className="card2">
                    <h4 className="card-heading">Visibility</h4>
                    <div className="content">
                        <p className="visibilty">{weatherData.visibility}</p>
                        <p className="visibilty-status">{updateVisibiltyStatus(weatherData.visibility)}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Highlights
