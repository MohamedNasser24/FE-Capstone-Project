import React, { useEffect, useState ,useRef} from 'react'
import './WeatherCard.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import storm_icon from '../assets/storm.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const WeatherCard = () => { 
    const inputRef = useRef()
    const [weatherData, SetweatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":humidity_icon,
        "04n":humidity_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
        


    }

    const api_key = `03dbae8c5b2383ac57d71788e972ded1`

    const search = async (city)=>{
        if(city === ""){
            alert("Enter City Name");
            return;
        }
        try {
            const url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
            const response = await fetch(url)
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
          
           }
            console.log(data);
            const icon = allIcons[data.weather[0].icon ] || clear_icon;
            SetweatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
              
        } catch (error) {
            SetweatherData(flase);
            console.error("Error in fetching weather data")
        }   
    }
    useEffect(()=>{
        search("Cairo");
    },[])
     
  return (
    <div className='weather'>
    <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
    </div>
    {weatherData?<>
    <img src={weatherData.icon} alt="" className='weather-icon' />
    <p className='temperature'>{weatherData.temperature}°C</p>
    <p className='location'>{weatherData.location}</p>
    <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windSpeed} km/h </p>
                <span>Wind Speed</span>
            </div>
        </div>
    </div>
    </>:<></>}

    
    </div>
  )
}
export default WeatherCard;
