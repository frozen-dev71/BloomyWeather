
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';

function App() {

  const [todayWeather, setTodayWeather] = useState({ name: "", country: "", temp: "", icon: "03d", weather: "", weatherDesc: "", feelsLike: "", humidity: "", wind: "", highest: "", lowest: "" });
  const [searchedLocation, setSearchedLocation] = useState("Paris");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [searchDone, setSearchDone] = useState(false);
  const [theme, setTheme] = useState('clear');
  const [loading, setLoading] = useState("");
  const [formValue, setFormValue] = useState({ searchedLocation: "" });
  const [formError, setFormError] = useState({});
  const [noData, setNoData] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    setNoData(false);
    
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedLocation}&limit=1&appid=aa3b70851ff3cfaab595923162142fe3
`)
      .then(response => response.json())
      .then(data => {
        setLat(data[0]?.lat);
        setLon(data[0]?.lon);
        setSearchDone(true);
        setTodayWeather(prev => { return { ...prev, name: data[0]?.local_names?.en, country: data[0]?.country } })
       
      }).catch((err) => {
        console.log(err.message);
      });

  }, [searchedLocation]);

  useEffect(() => {
    if (searchDone) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=aa3b70851ff3cfaab595923162142fe3
&units=metric`)
        .then(response => response.json())
        .then(data => {
          setTodayWeather({ ...todayWeather,  temp: Math.ceil(data?.main?.temp), icon: data.weather[0].icon, weather: data.weather[0].main.toLowerCase(), weatherDesc: data.weather[0].description, feelsLike: data.main.feels_like, humidity: data.main.humidity, wind: data.wind.speed, highest: data.main.temp_max, lowest: data.main.temp_min });
          setLoading(false);
        }).catch((err) => {
          setLoading(false);
          setNoData(true);
          console.log(err.message, "errrr");
        });
    }
    const toggleTheme = () => {
      if (todayWeather.weather === '' || todayWeather.weather === 'clear') {
        setTheme('default');
      }else if (todayWeather.weather === 'rain') {
        setTheme('rain');
      }else if (todayWeather.weather === 'thunderstorm') {
        setTheme('thunderstorm');
      }else if (todayWeather.weather === 'drizzle') {
        setTheme('drizzle');
      }else if (todayWeather.weather === 'mist' || todayWeather.weather === 'fog') {
        setTheme('mist');
      }else if (todayWeather.weather === 'haze') {
        setTheme('haze');
      }else if (todayWeather.weather === 'snow') {
        setTheme('snow');
      }else if (todayWeather.weather === 'smoke') {
        setTheme('smoke');
      }else if (todayWeather.weather === 'clouds') {
        setTheme('clouds');
      }else {
        setTheme('default');
      }
    
    }

    toggleTheme();
    return () => setSearchDone(false);

  }, [searchDone, lat, lon, todayWeather, searchedLocation]);


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
