class Weather {
  constructor(object) {
    const ICON_URL = "https://openweathermap.org/img/wn/";
    if (object.cod === 200) {
      this.Empty = false
      this.CityName = object.name;
      this.Country = object.sys.country;
      this.Temperature = object.main.temp;
      this.FeelsLike = object.main.feels_like;
      this.Pressure = object.main.pressure;
      this.Humidity = object.main.humidity;
      this.SunRise = object.sys.sunrise;
      this.SunSet = object.sys.sunset;
      this.WindSpeed = object.wind.speed;
      this.Visibility = object.visibility;
      this.Cloudiness = object.clouds.all;
      this.Icon = ICON_URL + object.weather[0].icon + "@2x.png";
      this.Description = object.weather[0].description;
      this.TimeZone = object.timezone;
      this.WindDierection = object.wind.deg;
      this.Longitude = object.coord.lon;
      this.Latitude = object.coord.lat;
    }
    else{
      this.Empty=true;
    }
  }
  /**
   *@param {string} city
   *@param {string} unit
   *@param {string} lang
   *@return {string}
   */
  static WeatherSrting(city, unit = "metric", lang = "en") {
    const APP_ID = "a33861ca8963fc16cf88ec79ed282d5b";
    const URL = "https://api.openweathermap.org/data/2.5/weather";
    const PARAMETERS = new URLSearchParams({
      q: city,
      appid: APP_ID,
      units: unit,
      lang: lang,
    });
    return `${URL}?${PARAMETERS.toString()}`;
  }
}
export default Weather;
