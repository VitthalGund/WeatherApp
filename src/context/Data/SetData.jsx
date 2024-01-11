/* eslint-disable react/prop-types */
import { useState } from "react";
import WeatherContext from "./userContext";
import { changeBackground, covertTimeTo12HourFormat, getDayName, getHour, getIcon } from "../../helper/index"
const SetData = (props) => {

    const [locationInfo, setLocationInfo] = useState({
        city: "",
        state: "",
        country: ""
    })

    const [unit, setUnit] = useState("C");
    const [loading, setLoading] = useState(true);

    const [weatherData, setWeatherData] = useState({
        city: "",
        temperature: "",
        condition: "",
        location: "",
        windSpeed: "",
        Sunrise: "",
        Sunset: "",
        humidity: "",
        pressure: "",
        visibility: "",
        clouds: "",
    });




    return (
        <WeatherContext.Provider value={{
            getDayName, getHour, getIcon,
            covertTimeTo12HourFormat,
            setLocationInfo,
            weatherData,
            setWeatherData,
            locationInfo,
            unit, setUnit,
            changeBackground,
            setLoading,
            loading,
        }}>
            {props.children}
        </WeatherContext.Provider>
    )
}
export default SetData;