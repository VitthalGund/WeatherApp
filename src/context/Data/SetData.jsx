/* eslint-disable react/prop-types */
import { useState } from "react";
import WeatherContext from "./userContext";

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

    // function to change background depending on weather conditions
    function changeBackground(condition) {
        let bg;
        if (condition === "partly-cloudy-day") {
            bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
        } else if (condition === "partly-cloudy-night") {
            bg = "https://i.ibb.co/RDfPqXz/pcn.jpg";
        } else if (condition === "rain") {
            bg = "https://i.ibb.co/h2p6Yhd/rain.webp";
        } else if (condition === "clear-day") {
            bg = "https://i.ibb.co/WGry01m/cd.jpg";
        } else if (condition === "clear-night") {
            bg = "https://i.ibb.co/kqtZ1Gx/cn.jpg";
        } else {
            bg = "https://i.ibb.co/qNv7NxZ/pc.webp";
        }
        document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${bg})`;
    }

    // function to change weather icons
    function getIcon(condition) {
        const weatherIconMappings = {
            "clear sky": "https://i.ibb.co/rb4rrJL/26.png",
            "few clouds": "https://i.ibb.co/PZQXH8V/27.png",
            "scattered clouds": "https://i.ibb.co/PZQXH8V/27.png",
            "broken clouds": "https://i.ibb.co/PZQXH8V/27.png",
            "shower rain": "https://i.ibb.co/kBd2NTS/39.png",
            "rain": "https://i.ibb.co/kBd2NTS/39.png",
            "thunderstorm": "https://i.ibb.co/kBd2NTS/39.png",
            "snow": "https://i.ibb.co/f954r0k/46.png",
            "mist": "https://i.ibb.co/728544g/50.png",
            "fog": "https://i.ibb.co/54N542B/47.png",
            // Add more mappings as needed based on OpenWeatherMap's descriptions
        };
        const matchingIcon = weatherIconMappings[condition.toLowerCase()]; // Case-insensitive matching

        return matchingIcon || "https://i.ibb.co/rb4rrJL/26.png";
    }

    //get hours from hh:mm:ss
    function getHour(time) {
        let hour = time.split(":")[0];
        let min = time.split(":")[1];
        if (hour > 12) {
            hour = hour - 12;
            return `${hour}:${min} PM`;
        } else {
            return `${hour}:${min} AM`;
        }
    }

    // convert time to 12 hour format
    function covertTimeTo12HourFormat(time) {
        let hour = time.split(":")[0];
        let minute = time.split(":")[1];
        let ampm = hour >= 12 ? "pm" : "am";
        hour = hour % 12;
        hour = hour ? hour : 12; // the hour '0' should be '12'
        hour = hour < 10 ? "0" + hour : hour;
        minute = minute < 10 ? "0" + minute : minute;
        let strTime = hour + ":" + minute + " " + ampm;
        return strTime;
    }

    // function to get day name from date
    function getDayName(date) {
        let day = new Date(date);
        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return days[day.getDay()];
    }


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