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
    function changeBackground() {
        let bg = new Date().getHours() > 18 ? "https://i.ibb.co/RDfPqXz/pcn.jpg" : "https://i.ibb.co/qNv7NxZ/pc.webp";
        document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(${bg})`;
    }

    // function to change weather icons
    function getIcon(condition) {
        const weatherIconMappings = {
            "clear sky": "https://i.ibb.co/qNv7NxZ/pc.webp",
            "scattered clouds": "https://i.ibb.co/RDfPqXz/pcn.jpg",
            "broken clouds": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/625a747a-061b-477d-958f-a0d6cea9e4cb/dax9bd4-dd0da73d-5b6e-415c-b05e-19471f366e5a.jpg/v1/fill/w_1024,h_768,q_75,strp/broken_clouds_by_kevintheman_dax9bd4-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzY4IiwicGF0aCI6IlwvZlwvNjI1YTc0N2EtMDYxYi00NzdkLTk1OGYtYTBkNmNlYTllNGNiXC9kYXg5YmQ0LWRkMGRhNzNkLTViNmUtNDE1Yy1iMDVlLTE5NDcxZjM2NmU1YS5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.2HBtScMyydNDUe606gk2Jd8RHs6iM-76feSI7Dc3sLw",
            "shower rain": "https://i.ibb.co/rb4rrJL/26.png",
            "rain": "https://i.ibb.co/h2p6Yhd/rain.webp",
            "thunderstorm": "https://images.unsplash.com/photo-1429552077091-836152271555",
            "snow": "https://ugc.futurelearn.com/uploads/images/43/86/4386abb2-a26b-48f4-8e22-e3160b56bb89.jpg",
            "mist": "https://cff2.earth.com/uploads/2018/11/13053559/what-is-mist-960x640.jpg",
            "fog": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsafetowork.com.au%2Fthe-fog-phenomenon-explained%2F&psig=AOvVaw3INHwUJpDfb6P4D8sw8a56&ust=1705082679779000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjAupX21YMDFQAAAAAdAAAAABAD",
            // Add more mappings as needed based on OpenWeatherMap's descriptions
        };
        const matchingIcon = weatherIconMappings[condition.toLowerCase()]; // Case-insensitive matching

        return matchingIcon || new Date().getHours() > 18 ? "https://i.ibb.co/1nxNGHL/10.png" : "https://i.ibb.co/rb4rrJL/26.png";
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