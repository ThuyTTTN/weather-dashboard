var cityForm = document.querySelector("#city-form");
var cityNameInput = document.querySelector("#city-name");       //form input
var cityContainer = document.querySelector("#city-container");
var dataSearchTerm = document.querySelector("#data-search-term"); //City: results
var forecast1 = document.querySelector("#card-1");
var forecast2 = document.querySelector("#card-2");
var forecast3 = document.querySelector("#card-3");
var forecast4 = document.querySelector("#card-4");
var forecast5 = document.querySelector("#card-5");
var forecastDate1 = document.querySelector("#forecastDate1");
var forecastDate2 = document.querySelector("#forecastDate2");
var forecastDate3 = document.querySelector("#forecastDate3");
var forecastDate4 = document.querySelector("#forecastDate4");
var forecastDate5 = document.querySelector("#forecastDate5");

let city = document.getElementById('city-name').value;


//Get date only for javaScript
const date = new Date();
const month = date.getMonth()+1;
const day = date.getDate();
const year = date.getFullYear();
const fullYear = " " + "(" + month + "/" + day + "/" + year + ")";
console.log(fullYear);

//create handler to execute form upon submission
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var cityName = cityNameInput.value.trim();
    if (cityName) {
        getCityData(cityName);
        cityNameInput.value = "";
    } else {
        alert("Please enter a city.");
    }
};


var getCityData = function(city) {
    // format the openweathermap api url
    var apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`;

    //make a request to the url for the lat/lon
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                const { lat, lon, name } = data[0];
                 console.log(data[0]);  
                 
                     dataSearchTerm.innerHTML = `<h2 class="city-title">${name + fullYear}</h2>`;
  
                //make a 2nd url request for the weather data
                var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=${api_key}`;  
                
                fetch(apiUrl2).then(function(response){
                    response.json().then(function(data) {
                        console.log(data);
                        displayData(data);  

                        const { dt } = data.daily[1];
                        const { temp, wind_speed, humidity } = data.daily[1]; 
                        const { icon } = data.current.weather[0]; 
                        
                        const milliseconds = dt * 1000;
                        const dateObject = new Date(milliseconds);
                        const humanDate = dateObject.toLocaleString("en-US", {timeZoneName: "short"});
                        const splits1 = humanDate.split(", ")[0];
                        console.log(splits1);
                        forecastDate1.innerHTML = `<div class="F-date">${splits1}</div>`

                        forecast1.innerHTML =
                            `<div class="forecast">
                                <div class="w-icon"><img src="http://openweathermap.org/img/w/${icon}.png"></div>
                                <div>Temp:   ${temp.day}°F</div>
                                <div>Wind:   ${wind_speed} MPH</div>
                                <div>Humidity:   ${humidity}%</div> 
                            </div>`

                    }); 
                });
            })
        } else {
            alert("Error");
        }
    }) 
    
}

// Show weather data
var displayData = function(data) {

    const { temp, wind_speed, humidity, uvi } = data.current;   
    const { icon } = data.current.weather[0]; 

    cityContainer.innerHTML = 
        `<div class="weatherInfo">
            <div class="w-icon"><img src="http://openweathermap.org/img/w/${icon}.png"></div>
            <div class="weatherInfo">
            <div>Temp:   ${temp}°F</div>
            <div>Wind:   ${wind_speed} MPH</div>
            <div>Humidity:   ${humidity}%</div>
            <div>UV Index:   ${uvi}</div>
        </div>`;
        
}




// call the function
cityForm.addEventListener("submit", formSubmitHandler);





