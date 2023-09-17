const APIKEY = '5e2739601f594747884103946231609'
let cityTag = document.querySelector('.city')
let weatherIcon = document.querySelector('.weather-icon')
let weatherDescr = document.querySelector('.weather-descr')
let temperatureTag = document.querySelector('.temperature')
let humidityTag = document.querySelector('.humidity')
const searchTag = document.querySelector('.search')
const resultsContainer = document.querySelector('.autocomplete')
const resultsList = resultsContainer.querySelector('.results-list')
const searchBtn = document.querySelector('#searchBtn')
const errorP = document.querySelector('.error')

searchTag.addEventListener('input', e => {
    weather.autocomplete(e.target.value)
})

searchBtn.addEventListener('click', e => {
    weather.fetchWeather(searchTag.value)
})

const weather = (() => {
    const fetchWeather = (query) => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${query}&aqi=no`)
        .then(res => res.json())
        .then(data => displayData(data))
        .catch(err => {
            errorP.style.display = 'block'
        })
    }

    const displayData = (data) => {
        resultsList.innerHTML = ''
        cityTag.textContent = data.location.name 
        weatherIcon.src = data.current.condition.icon
        weatherDescr.textContent = data.current.condition.text
        temperatureTag.textContent = data.current.temp_c + '°C'
        humidityTag.textContent = 'Humidity: ' + data.current.humidity + '%'
        errorP.style.display = 'none'
    }

    const autocomplete = (query) => {
        fetch(`https://api.weatherapi.com/v1/search.json?q=${query}&key=${APIKEY}`)
        .then(res => res.json())
        .then(data => updateResultsList(data))
    }

    const updateResultsList = (data) => {
        resultsList.innerHTML = ''
        let cityli
        for (const city of data) {
            cityli = document.createElement('p')
            cityli.textContent = city.name
            resultsList.append(cityli)
            cityli.addEventListener('click', e => {
                searchTag.value = e.target.textContent
                resultsList.innerHTML = ''
            })
        }
        console.log(resultsList)
    }
    return { fetchWeather, autocomplete }
})()

window.addEventListener('load', e => {
    errorP.style.display = 'none'
    weather.fetchWeather('Thessaloniki')
})



