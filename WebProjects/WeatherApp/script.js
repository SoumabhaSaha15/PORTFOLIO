import Weather from "./packages/Weather.js";
(function main() {
  const MAIN = document.querySelector("body div#root main");
  /**
  * @type {SearchBar} CONDITION
  */
  const INPUT = MAIN.querySelector("section search-bar");
  
  /**
  * @type {WeatherCondition} CONDITION
  */
  const CONDITION = MAIN.querySelector("section weather-condition");
  CONDITION.setAttribute("icon", 'Components/SeaechBar/location.svg');
  CONDITION.setAttribute("location", 'location');
  CONDITION.setAttribute("temperature","--°-");
  const DETAILS = MAIN.querySelectorAll("section div#details icon-tiles");
  const getTimeZone=(sec)=>{
    let hr = parseInt(sec/3600);
    let mnt = (sec % 3600)/60
    return hr+":"+mnt;
  }
  const FetchWeather = async (data) => {
    fetch(Weather.WeatherSrting(data))
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let Data = new Weather(data);
        if (!Data.Empty) {
          CONDITION.setAttribute("icon", Data.Icon);
          CONDITION.setAttribute("location", Data.CityName+","+Data.Country);
          CONDITION.setAttribute("temperature", Math.trunc(Data.Temperature) + "°C");
          CONDITION.setStyle(`div[part="container"] img[part="condition"]`,` backdrop-filter: drop-shadow(10px 30px 20px #80808080);`);
          DETAILS[0].setAttribute('data',Data.WindSpeed+"kmph");
          DETAILS[1].setAttribute('data',Data.Humidity+"%");
          DETAILS[2].setAttribute('data',Data.Cloudiness+"%");
          DETAILS[3].setAttribute('data',Data.Pressure/10 +"Kpa");
          DETAILS[4].setAttribute('data',Data.Visibility/1000 +"km");
          DETAILS[5].setAttribute('data',"GMT "+getTimeZone(Data.TimeZone));
          DETAILS[6].setAttribute('data','lon:'+(parseFloat(Data.Longitude).toPrecision(4))+",lat:"+(parseFloat(Data.Latitude).toPrecision(4)));
          DETAILS[7].setAttribute('data',Data.WindDierection+"°");
        }
        else
          INPUT.setAttribute("value",'invalid-place');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  INPUT.addEventListener("search-input", (e) => {
    FetchWeather(e.detail);
    [...MAIN.querySelectorAll('section .hide')].forEach((element) => { 
        element.style.opacity = 0;
       setTimeout(()=>{
         element.style.opacity = 1
       },750) ;
      
      });
  });
  
})();