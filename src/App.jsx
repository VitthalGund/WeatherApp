import { useContext, useEffect } from 'react';
import './index.css'
import Sidebar from './components/Sidebar';
import Highlights from './components/Highlights';
import WeatherContext from './context/Data/userContext';
import Forcast from './components/Forcast';
import { weather, location } from './api/axios';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function App() {

  const {
    locationInfo,
    weatherData,
    setWeatherData,
    getIcon,
    setLocationInfo,
    changeBackground,
    setLoading,
    loading
  } = useContext(WeatherContext)

  const getWeatherData = async (city) => {
    try {
      if (!city) {
        return;
      }

      setLoading(true)

      const resp = await toast.promise(weather.get(`/weather?q=${city}&units=metric&appid=${import.meta.process.env.apiKey}`), {
        error: "invalid city",
        loading: "find your city",
        success: `Here is weather details of ${city}`
      })
      if (!resp.data) {
        return
      }
      const data = resp.data
      setLocationInfo({
        city,
      })
      return ({
        city: city,
        temperature: data.main.temp,
        condition: data.weather[0].description,
        // location: {
        //     ...locationInfo
        // },
        windSpeed: data.wind.speed,
        Sunrise: data.sys.sunrise,
        Sunset: data.sys.sunset,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility,
        clouds: data.clouds.all // Per
      })
    } catch (error) {
      console.log("invalid city name");
    }
  }


  const getLiveLocation = async () => {
    try {
      const data = await (await location.get("/json/")).data
      return {
        city: data.city,
        country: data.country_name,
        state: data.state,
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getLiveLocation().then((data) => {
      setLocationInfo(data)
    })

  }, [setLocationInfo])

  useEffect(() => {
    getWeatherData(locationInfo.city).then((data) => {
      if (!data) {
        return
      }
      console.log(data)
      setWeatherData(data)
      changeBackground(data?.condition)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationInfo.city])


  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <div className="wrapper">
        {loading ? "" : <Sidebar
          clouds={weatherData.clouds}
          condition={weatherData.condition}
          tempUnit={"C"}
          icons={getIcon(weatherData.condition)}
          temperature={weatherData.temperature}
          key={weatherData.city}
          onChangeCity={getWeatherData}
        />}
        <div className="main">
          <nav>
            <ul className="options">
              <button className="week active">week</button>
            </ul>
          </nav>
          {<Forcast />}
          <div className="highlights">
            <h2 className="heading">today&apos;s highlights</h2>
            {loading ? "" : <Highlights
              Humidity={weatherData.humidity}
              Sunrise={+weatherData.Sunrise}
              Sunset={+weatherData.Sunset}
              Visibility={weatherData.visibility}
              WindStatus={+weatherData.windSpeed}
              key={locationInfo.city}
            />}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
