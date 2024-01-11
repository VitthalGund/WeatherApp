import { useContext, useEffect, useState, useCallback } from 'react';
import WeatherContext from '../context/Data/userContext';
import WeatherCards from './WeatherCards';
import PropType from "prop-types"
import { weather } from '../api/axios';

const Forcast = () => {
    const [forecast, setForecast] = useState([])

    const {
        locationInfo,
        unit,
        getIcon,
    } = useContext(WeatherContext)


    const updateForecast = useCallback(async () => {
        try {
            const data = (await weather.get(`/forecast?q=${locationInfo.city}&units=metric&appid=8b496e84b9bd1c4dcfa4636f8ceb066f`)).data

            // Track seen days and unique entries
            const seenDays = new Set();
            const forecastData = [];

            for (const { dt, weather, main } of data.list) {
                const day = new Date(dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
                if (!seenDays.has(day)) {
                    seenDays.add(day);
                    forecastData.push({
                        day,
                        condition: weather[0].description,
                        temperature: main.temp,
                    });
                }
            }
            setForecast(forecastData)
        } catch (error) {
            console.error('Error fetching weather forecast:', error);
        }

    }, [locationInfo.city])

    useEffect(() => {
        updateForecast()
    }, [locationInfo.city, updateForecast])

    return (
        <>
            <div className="cards" id="weather-cards">{forecast?.map((item, key) => {
                return <WeatherCards
                    key={key}
                    dayName={item.day}
                    iconSrc={getIcon(item.condition)}
                    dayTemp={item.temperature}
                    tempUnit={unit}
                />
            })}</div>
        </>
    )
}

Forcast.prototype = {
    forecast: PropType.array
}

export default Forcast
