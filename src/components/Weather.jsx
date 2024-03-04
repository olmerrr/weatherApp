import Day from "./Day";

const Weather = ({ weather, location }) => {
  const { temperature_2m_max: max, temperature_2m_min: min, time: dates, weathercode: codes } = weather;

  function formatDay(dateStr) {
    return new Intl.DateTimeFormat("en", {
      weekday: "short",
    }).format(new Date(dateStr));
  }

  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [ [ 0 ], "☀️" ],
      [ [ 1 ], "🌤" ],
      [ [ 2 ], "⛅️" ],
      [ [ 3 ], "☁️" ],
      [ [ 45, 48 ], "🌫" ],
      [ [ 51, 56, 61, 66, 80 ], "🌦" ],
      [ [ 53, 55, 63, 65, 57, 67, 81, 82 ], "🌧" ],
      [ [ 71, 73, 75, 77, 85, 86 ], "🌨" ],
      [ [ 95 ], "🌩" ],
      [ [ 96, 99 ], "⛈" ],
    ]);
    const arr = [ ...icons.keys() ].find((key) => key.includes(wmoCode));
    if ( !arr ) return "NOT FOUND";
    return icons.get(arr);
  }

  return <>

    <div className="weather__title">Weather in {location.toUpperCase()}</div>
    <ul className="weather">
      {dates.map(((date, index) => <Day
        date={formatDay(date)}
        key={index}
        max={Math.ceil(max.at(index))}
        min={Math.floor(min.at(index))}
        code={getWeatherIcon(codes.at(index))}
        isToday={index === 0}
      />))}
    </ul>
  </>
}

export default Weather;