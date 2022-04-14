function CityName(input) {
  this.inputSearch = input;
}

const key = {
  api: "316c57852569fe1a282f2b3959d2d8e8",
};

const resultsDiv = document.getElementById("res");

function searchCity() {
  let input = document.querySelector("input").value;

  let toUpper = input.charAt(0).toUpperCase() + input.slice(1);
  let resultSearch = new CityName(toUpper);

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${resultSearch.inputSearch}&units=metric&appid=${key.api}`
    )
    .then((response) => {
      const data = response.data;
      const weather = data.weather;

      if (toUpper === data.name) {
        document.getElementById("nosuchcity").innerHTML = "";

        resultsDiv.style.display = "block";
        document.getElementById("namecitynone").style.display = "block";

        document.getElementById(
          "namecity"
        ).innerHTML = `Weather in ${data.name}`;
        document.getElementById("deg").innerHTML = `${parseInt(
          data.main.temp
        )}&#176; C`;

        document.getElementById(
          "humidity"
        ).innerHTML = `Humidity: ${data.main.humidity}%`;

        document.getElementById(
          "windspeed"
        ).innerHTML = `Wind Speed: ${data.wind.speed} km/h`;
      }
      if (data.wind.gust) {
        document.getElementById(
          "windgust"
        ).innerHTML = `Wind Gust: ${data.wind.gust} km/h `;
      } else {
        document.getElementById("windgust").innerHTML = "";
      }

      weather.forEach((v) => {
        document.querySelector(".weather").innerHTML = `
        <img src=" http://openweathermap.org/img/wn/${v.icon}@2x.png" alt="404" />
        <p>Weather: ${v.main}, ${v.description}</p>
        `;
      });
    })
    .catch((error) => {
      resultsDiv.style.display = "none";
      document.getElementById("namecitynone").style.display = "none";

      document.getElementById("nosuchcity").innerHTML =
        "There is no such city!";
    });
}
