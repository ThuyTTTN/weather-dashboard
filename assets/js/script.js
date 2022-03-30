var cityForm = document.querySelector("#city-form");
var cityNameInput = document.querySelector("#city-name");       //form input
var cityContainer = document.querySelector("#city-container");
var dataSearchTerm = document.querySelector("#data-search-term"); //City: results


var getCityData = function(city) {
    // format the openweathermap api url
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=7f371e4052b1c98d236355c1a3d79224`;

    //make a request to the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayData(data);
                // getFiveDays(data.lat, data.lon);      
                });
        } else {
            alert("Error");
        }
    });
    
}
//getCityData();





// get fiveDay(lon, lat){}
// var getFiveDays = function(lat, lon) {
//     var apiUrl5 = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=7f371e4052b1c98d236355c1a3d79224&units=imperial`;

//     //make a request to the url
//     fetch(apiUrl5).then(function(response) {
//         response.json().then(function(lat, lon) {
//             getFiveDays(lat, lon);
//         });
//     });
// }

// var displayFiveDays = function(data) {
//     const
// }

// Create function to display data  to the page
var displayData = function(data) {
    const place = data.name;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // const { uvi } = data.current.uvi;
    console.log(place, icon, description, temp, humidity, speed);
}


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

// call the function
cityForm.addEventListener("submit", formSubmitHandler);