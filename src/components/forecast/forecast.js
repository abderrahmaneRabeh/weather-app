import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
  "Monday",
  "tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );

  // console.log(forecastDays);
  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((elem, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    alt="weather"
                    className="small-icon"
                    src={`icons/${elem.weather[0].icon}.png`}
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {elem.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(elem.main.temp_min)}°C /{" "}
                    {Math.round(elem.main.temp_max)}°C{" "}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{elem.main.pressure} hpa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{elem.main.humidity} %</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds</label>
                  <label>{elem.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed</label>
                  <label>{elem.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level</label>
                  <label>{elem.main.sea_level} m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like</label>
                  <label>{Math.round(elem.main.feels_like)} °C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
