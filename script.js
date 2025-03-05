let cityName = document.getElementById("city-name");
let button = document.getElementById("btn-btn");
let tempData = document.getElementById("temp-data");
let locationCity = document.getElementById("location");
let setDate = document.getElementById("set-date");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let pressureRT = document.getElementById("pressure");
let description = document.getElementById("description");
let error = document.getElementById("error");
let bottomContent = document.getElementById("bottom-content");
let weatherImage = document.getElementById("weather-image");

button.addEventListener("click", async function (event) {
  event.preventDefault();
  let city = cityName.value.trim();
  const apiKey = "c3626cb8d43fe27d7afb3731c55f25a1";
  let endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  console.log(city);

  try {
    let response = await fetch(endPoint);
    if (response.status === 400 || response.status === 404) {
      error.style.display = "block";
    } else {
      let weather = await response.json();

      const temperature = weather.main.temp;
      const humidityData = weather.main.humidity;
      const pressureData = weather.main.pressure;
      const cloudCover = weather.clouds.all;
      const weatherDescription = weather.weather[0].description.toLowerCase();
      const convertTemp = Math.round(temperature - 273.15);

      tempData.textContent = `${convertTemp}°C`;
      humidity.textContent = `${humidityData}%`;
      locationCity.textContent = city;
      wind.textContent = `${cloudCover}m/s`;
      pressureRT.textContent = `${pressureData}hpa`;
      description.textContent = `${weatherDescription}`;

      tempData.style.display = "block";
      bottomContent.classList.remove("bottom-content");
      bottomContent.classList.add("bottom-content-visible");
      error.style.display = "none";
      let todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      console.log(todayDate);

      setDate.textContent = `${todayDate}`;
      if (weather.weather[0].main === "Clouds") {
        weatherImage.src = "images/clouds.svg";
      } else if (weather.weather[0].main === "Clear") {
        weatherImage.src = "images/clear.svg";
      } else if (weather.weather[0].main === "Drizzle") {
        weatherImage.src = "images/drizzle.svg";
      } else if (weather.weather[0].main === "Rain") {
        weatherImage.src = "images/rain.svg";
      } else if (weather.weather[0].main === "Humidity") {
        weatherImage.src = "images/humidity.svg";
      } else if (weather.weather[0].main === "Thunderstorm") {
        weatherImage.src = "images/thunderstorm.svg";
      } else if (weather.weather[0].main === "Snow") {
        weatherImage.src = "images/snow.svg";
      }
    }
  } catch (error) {
    // alert(error.message);

    console.log(error);
  }
});
