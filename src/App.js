import React, { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";
import "./App.css";
import styles from "./Component/Forecast.module.css";
import Forecast from "./Component/Forecast";

function App() {
  const [data, setData] = useState({});
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  const handleData = (data) => {
    let tempData = {
      name: data.location.name,
      currenctForecast: data.current.condition.text,
      country: data.location.country,
      localTime: new Date(data.location.localtime),
      forecastData: data.forecast.forecastday[0].hour.map((el) => {
        return {
          time: new Date(el.time).getHours(),
          temp_c: el.temp_c,
          temp_f: el.temp_f,
          condition: el.condition.text,
          photo: el.condition.icon,
        };
      }),
    };
    setData(tempData);
  };

  useEffect(() => {
    fetchData(
      "https://api.weatherapi.com/v1/forecast.json?key=698dc13c77094cf187695058201212&q=London&days=1",
      false,
      handleData
    );

    let timer1 = setInterval(() => {
      fetchData(
        "https://api.weatherapi.com/v1/forecast.json?key=698dc13c77094cf187695058201212&q=London&days=1",
        true,
        handleData
      );
    }, 15000);
    return () => {
      clearInterval(timer1);
    };
  }, [fetchData]);

  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        { error === null && isLoading ? <p>Loading...</p> : <Forecast data={data} />}
        { error && !isLoading && <p>Something went wrong</p>}
      </div>
    </div>
  );
}

export default App;
