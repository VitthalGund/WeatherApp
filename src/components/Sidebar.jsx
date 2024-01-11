import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import DateTime from './DateTime';
import WeatherContext from '../context/Data/userContext';


const Sidebar = ({ temperature, condition, onChangeCity, clouds }) => {

    const {
        locationInfo,
        unit,
        loading,
        getIcon,
    } = useContext(WeatherContext)
    const [currentCity, setCurrentCity] = useState("");

    return (
        <>
            <div className="sidebar">
                <div className='innerbar'>
                    <form className="search" id="search" onSubmit={(e) => {
                        e.preventDefault()
                        onChangeCity(currentCity)
                    }}>
                        <input type="text" id="city" placeholder="Search..."
                            value={currentCity}
                            onChange={(e) => setCurrentCity(e.target.value)}
                        />
                        <button><i className="fas fa-search"></i></button>
                    </form>
                    <div className="weather-icon">
                        {/* <img id="icon" src={"icons/sun/4.png"} alt="" /> */}
                        <img id="icon" src={getIcon(condition)} alt="" />
                    </div>
                    <div className="temperature">
                        <h1 id="temp">{temperature}</h1>
                        <span className="temp-unit">{unit}</span>
                    </div>
                    {loading ? "" : <DateTime />}
                    <div className="divider"></div>
                    <div className="condition-rain">
                        <div className="condition">
                            <i className="fas fa-cloud"></i>
                            <p id="condition">{condition}</p>
                        </div>
                        <div className="rain">
                            <i className="fas fa-tint"></i>
                            <p id="rain">perc - {clouds}%</p>
                        </div>
                    </div>
                </div>
                <div className="location">
                    <div className="location-icon">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="location-text">
                        <p id="location">{locationInfo.city},{locationInfo.state},{locationInfo.country}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
Sidebar.propTypes = {
    temperature: PropTypes.number,
    tempUnit: PropTypes.string,
    condition: PropTypes.string,
    clouds: PropTypes.number,
    icons: PropTypes.string,
    onChangeCity: () => { },
    location: PropTypes.object
}
export default Sidebar
