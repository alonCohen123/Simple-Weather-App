import React, { useState, useEffect } from "react";
import sunrise from "./images/dawn.png";
import sunset from "./images/sunset.png";
import Timer from "./Timer";
const api = {
  key: "1265e9db0299736eaee9e752f2b05dbb",
  base: "https://api.openweathermap.org/data/2.5/",
  baseIcon: "http://openweathermap.org/img/wn/",
};

function App() {
  const [query, setQuery] = useState("New York");
  const [weather, setWeather] = useState({});
  const currentTimeZone = 10800;

  useEffect(() => {
    fetchData();
  }, []);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetchData();
    }
  };

  const fetchData = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };

  const msToTime = (duration) => {
    let offset = currentTimeZone - weather.timezone;
    let l = duration * 1000 - offset * 1000;
    var s = new Date(l).toLocaleTimeString("en-il");
    return s;
  };

  const dateBuilder = (d) => {
    let hour = d.getHours();
    d.setHours(hour + weather.timezone / 3600 - currentTimeZone / 3600);
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        weather.main
          ? weather.weather[0].main === "Rain"
            ? "app rain"
            : weather.main.temp > 26
            ? "app warm"
            : weather.main.temp < 10
            ? "app cold"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            onKeyPress={search}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
                <span className="caption">
                  <Timer queryZone={weather.timezone} currentZone={currentTimeZone} />
                </span>
              </div>
              <div className="weather">{weather.weather[0].main}
              </div>
            </div>

            <div className="sun-time">
              <div className="item">
                <span className="caption">Sunrise:</span>
                <img className="sunimg" src={sunrise} alt="" />
                <span className="caption">
                  {msToTime(weather.sys.sunrise)} AM
                </span>
              </div>
              {/* <div className="item">
                <img
                  className="sunimg"
                  src={`${api.baseIcon}${weather.weather[0].icon}@2x.png`}
                  alt=""
                />
              </div> */}
              <div className="item">
                <span className="caption">Sunset:</span>
                <img className="sunimg" src={sunset} alt="" />
                <span className="caption">
                  {msToTime(weather.sys.sunset)} PM
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="error">City Not Found</div>
        )}
      </main>
    </div>
  );
}

export default App;
