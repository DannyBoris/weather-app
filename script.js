const API_KEY = '87e48eb3f37bc8796faefddebef9ee94'

async function  query(){
    let loc = document.querySelector('input').value
    let res = await fetch(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${loc}`)
    let resJson =  await res.json();
    let {wind_degree, wind_speed, temperature ,weather_descriptions} = resJson.current
    let {name, country } = resJson.location
    let weatherInfo = {
        wind:{
            direction: wind_degree,
            speed: wind_speed
        },
        temp:temperature,
        desc:weather_descriptions[0],
        loc:{
            city:name,
            country
        }
    }
    console.log(resJson)
createHtmlInfo(weatherInfo.temp, weatherInfo.wind.direction, weatherInfo.wind.speed, weatherInfo.loc.city, weatherInfo.loc.country,weatherInfo.desc)

}


function createHtmlInfo(temp, windDir, windSpeed, city, country,icon){
    icons ={
        'Cloudy':'cloud~',
        'Partly cloudy':'partly-cloudy-day',
        'Sunny': 'sun',
        'Clear':'sun'
    }

    let htmlStr = `  <div class="temp-info flex align-center space-between" >
    <h3 class="temp">${temp}&#176C </h3>
    <img src="https://img.icons8.com/android/44/FFFFFF/${icons[icon]}.png"/>
    </div>
    <div class="wind-info">
    <h5>Direction: <span>${windDir}&#176</span></h5>
    <h5>Speed:  <span>${windSpeed}km/m</span></h5>
    </div>
    <h3>${city}, ${country}</h3>`
    document.querySelector('.right-section').innerHTML =htmlStr
}
