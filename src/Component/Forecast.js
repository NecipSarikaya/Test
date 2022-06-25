import React, { Fragment, useState } from "react";
import styles from "./Forecast.module.css";

function Forecast(props) {
  const [isCelc, setIsCelc] = useState(true);

  let currenctHour = new Date().getHours();

  const changeCelc = (isCelcius) => {
    if(isCelcius)
      setIsCelc(true)
    else
      setIsCelc(false)
  };

  const renderForecasts = () => {
    if (Object.keys(props.data).length !== 0) {
      return props.data.forecastData.map((el, index) => {
        return (
          <div className={`${styles.content_container_item} ${currenctHour === el.time && styles.active_hour}`} key={index}>
            <p className={styles.time}>
              {el.time} {el.time > 12 ? "PM" : "AM"}
            </p>
            <img className={styles.photo} src={el.photo} alt={"forecast"}/>
            <p className={styles.degree}>{ isCelc ? el.temp_c : el.temp_f}°</p>
          </div>
        );
      });
    }
  };

  return (
    <Fragment>
      <div className={styles.heading_container}>
        <div className={styles.city_info}>
          <h2>{props.data.currenctForecast}</h2>
          <p>{`${props.data.name}, ${props.data.country}`}</p>
        </div>
        <div>
          <span className={`${styles.tab_option} ${isCelc && styles.active}`} onClick={()=>changeCelc(true)}>°C</span>
          <span className={`${styles.tab_option} ${!isCelc && styles.active}`} onClick={()=>changeCelc(false)}>°F</span>
        </div>
      </div>
      <div className={styles.content_container} onClick={()=>changeCelc(false)}>{renderForecasts()}</div>
    </Fragment>
  );
}

export default Forecast;
