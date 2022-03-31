var cityForm = document.querySelector("#city-form");
var cityNameInput = document.querySelector("#city-name");       //form input
var cityContainer = document.querySelector("#city-container");
var dataSearchTerm = document.querySelector("#data-search-term"); //City: results

let city = document.getElementById('city-name').value;

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
                var apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${api_key}`;  
                
                fetch(apiUrl2).then(function(response){
                    response.json().then(function(data) {
                        console.log(data);
                        displayData(data);  
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
            <div>Temp:   ${temp}°F</div>
        </div>
        <div class="weatherInfo">
            <div>Wind:   ${wind_speed} MPH</div>
        </div>
        <div class="weatherInfo">
            <div>Humidity:   ${humidity}%</div>
        </div>
        <div class="weatherInfo">
            <div>UV Index:   ${uvi}</div>
        </div>`;
}

// call the function
cityForm.addEventListener("submit", formSubmitHandler);

// // Create function to display data  to the page
// var displayData = function(data) {
//     const { icon, description } = data.current.weather[0];
//     const { temp, humidity, uvi, wind_speed } = data.current;
//     console.log(icon, description, temp, humidity, wind_speed);
    


//     cityContainer.innerHTML = 
//         `<div class="weatherInfo">
//             <div>Temp</div>
//             <div>${temp}°F:</div>
//         </div>
//         <div class="weatherInfo">
//             <div>Wind</div>
//             <div>${speed} MPH:</div>
//         </div>
//         <div class="weatherInfo">
//             <div>Humidity</div>
//             <div>${humidity}%:</div>
//         </div>
//         <div class="weatherInfo">
//             <div>UV Index:</div>
//             <div>${uvi}</div>
//         </div> `
// }



