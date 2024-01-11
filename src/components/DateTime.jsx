import { useState } from "react";

const DateTime = () => {
    const [dateTime, setDateTime] = useState();
    //get hours from hh:mm:ss
    // function to get date and time
    function getDateTime() {
        let now = new Date(),
            hour = now.getHours(),
            minute = now.getMinutes();

        let days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        // 12 hours format
        hour = hour % 12;
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        let dayString = days[now.getDay()];
        setDateTime(`${dayString}, ${hour}:${minute}`);
    }

    setInterval(() => {
        getDateTime()
    }, 2000)

    return (
        <>
            <div className="date-time">
                <p id="date-time">{dateTime}</p>
            </div>
        </>
    )
}

export default DateTime
