import PropTypes from 'prop-types';
import '../index.css'

const WeatherCards = ({ iconSrc, dayName, dayTemp, tempUnit }) => {
    return (
        <>
            <div className="card">
                <h2 className="day-name">{dayName}</h2>
                <div className="card-icon">
                    <img src={`${iconSrc}`} className="day-icon" alt="" />
                </div>
                <div className="day-temp">
                    <h2 className="temp">{dayTemp}</h2>
                    <span className="temp-unit">{tempUnit}</span>
                </div>
            </div>
        </>
    )
}
WeatherCards.propTypes = {
    iconSrc: PropTypes.string,
    dayName: PropTypes.string,
    dayTemp: PropTypes.string,
    tempUnit: PropTypes.string
}




export default WeatherCards
