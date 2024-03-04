const Day = ({ date, min, max, code, isToday }) => {

  return <li className="day">
    <span>{code}</span>
    <p>{isToday ? "Today" : `${date}`}</p>
    <p>{min} &deg; &mdash;  <strong>{max}</strong> &deg;</p>
  </li>
}

export default Day;