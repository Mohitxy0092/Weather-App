document.addEventListener('DOMContentLoaded' ,() => {
    const city_input=document.getElementById("city-input");
    const getWeatherbtn=document.getElementById("get-weather-button");
    const weatherinfo=document.getElementById("weather-info");
    const displayCity=document.getElementById("city");
    const displayTemp=document.getElementById("temperature");
    const displayDiscription=document.getElementById("discription");
    const errorMessage=document.getElementById("error-message");
    const API_KEY="b4fcf66fae96b3f94cc17aa3aef8fb6f";
    getWeatherbtn.addEventListener('click', async () => {
        const city=city_input.value.trim();
        if(!city) return;
        try{
            const weatherData=await fetchWeatherData(city);
                displayWeatherData(weatherData);
        }catch(error){
            displayError();
        }
    })
    async function fetchWeatherData(city) {
        //fetch data
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response=await fetch(url);
        if(!response.ok) {
            throw new Error("City Not Found.");
        }
        const data= await response.json();
        return data;
    }
    function displayWeatherData(weatherData) {
        //display data
        const {name,main,weather} = weatherData;
       displayCity.textContent=name;
       displayTemp.textContent=`Temperature : ${main.temp}°C`;
       displayDiscription.textContent=`Weather : ${weather[0].description}`;
       weatherinfo.classList.remove("hidden");
       errorMessage.classList.add("hidden");
    }
    function displayError() {
       weatherinfo.classList.add("hidden");
       errorMessage.classList.remove("hidden");
    }








})