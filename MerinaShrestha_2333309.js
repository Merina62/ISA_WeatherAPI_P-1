let weather = {
    apiKey: "fb36d68804fc357a51b6190764d2df0d", 

    // define method name fetchWeather that takes city as parameter
    fetchWeather: function (city) { 
      // request OpenWeatherMap API by passing city name and api key as query parameters in url
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          // Checks if the respone received from the API is sucessful
          if (!response.ok) {
            alert("No weather found.");
            // throws an error with an alert message
            throw new Error("No weather found.");
          }
          // return the response in JSON format
          return response.json();
        })
        // invoke displayWeather method by passing tha data as parameter
        .then((data) => this.displayWeather(data));
    },

// define method displayWeather that take JSON data from API as parameter
    displayWeather: function (data) {
      // extract the data from JSON response
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, pressure, humidity } = data.main;
        const { speed } = data.wind;
        
      // calculate current date using timesone offset value from API to user friendly date string
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const localDateString = now.toLocaleString(undefined, options);
        document.getElementById("datetime").innerHTML = localDateString;


        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".pressure").innerText =
            "Pressure: " + pressure + " hPa";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector('.city-date').innerText= cityDateString;
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
        },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  // add a click event listener to call weather.search() to fetch and display data
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  // fetch and display the weather data of Basingstoke by default
  weather.fetchWeather("Basingstoke");