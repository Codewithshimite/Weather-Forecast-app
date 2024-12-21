const resultIndex = document.getElementById("result-button"); //Here i got the button to search 
const ApiContainer = document.getElementById("container"); //Here i got the container for the main aoi so i can see all the APi
const weatherContainer = document.getElementById("weather-container");//Here is where the info are displayed
const cityInput = document.getElementById("city-input"); //This is the input for entering a city name.
const reset = document.getElementById("reset-button"); //This is the reset button


//This is the side for the  reset
reset.addEventListener("click", function(){
  weatherContainer.innerHTML = "";
  cityInput.value = "";
  resultIndex.style.display = "block"
  reset.style.display = "none"
})


//Here the keydown was user so that when user tap son enter button then a function is called.
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('result-button').click();
  }
});


//if  city input in empy then it should aler
resultIndex.addEventListener("click", function() {
  if (cityInput.value.trim() === "")  {
   weatherContainer.innerHTML = `<div class="style-error">Please enter a city name</div>`
    cityInput.value = '';
    return
  }if(!isNaN(cityInput.value)){
   weatherContainer.innerHTML = `<div class="style-error">Opps! sorry enter alphabets only</div>`
    cityInput.value = '';
    return
  }

  //This is my API key
  const apiKey = "6e1977dfcff8a498c0eab749941e7581";
  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; //This is the url for the Api


  //This are the data.
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const country = data.sys.country;
      const cityName = data.name;
      const temperature = data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      const windSpeed = data.wind.speed;
      const icon = data.weather[0].icon;
      const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      // Inject the weather info using innerHTML
      weatherContainer.innerHTML = `
      <div id="city" class="style-city">${cityName}, ${country}
      <div>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</div></div>
        <div id="day" class="center-day">${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]}</div>
        
        <div class="thd-container">
        <img class="style-image"src="${imageUrl}" alt="Weather Icon">
        
        <div>Temperature: ${temperature}°C</div>
        <div>Humidity: ${humidity}%</div>
        <div>Wind Speed: ${windSpeed} m/s</div> 
        <div class="des-img">
        <div class="description">Description: ${description}</div>
        </div>
        </div>
      `;
    })
    
    .catch((error) => error = weatherContainer.innerHTML = `<div class="style-error">Opps!Enter valid city name</div>`);
    resultIndex.style.display = "none";
    reset.style.display = "block"

});
