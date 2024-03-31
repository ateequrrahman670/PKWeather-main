const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();
const updateUI = (data) => {
    console.log(data)
    // the other whay for this is destructure and it's below 
   
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // destructure properties
    const {cityDetails ,weather}= data;

    details.innerHTML = `
       <h5 class="my-3">${cityDetails.EnglishName}</h5>
       <div class="my-3">${weather.WeatherText}</div>
       <div class="display-4 my-4">
         <span>${weather.Temperature.Metric.Value}</span>
         <span>&deg;C</span>
        </div>
`;

    // update the  day & night icon images
    const iconSrc =`img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);

    // 1 short whay ternary operator to show day and night img
    let timeScr = weather.IsDayTime ? 'img/day.svg' :'img/night.svg';

    // 2 if else whay to show day and night img
    // if(weather.IsDayTime){
    //     timeScr = 'img/day.svg';
    // }else{
    //     timeScr = 'img/night.svg';
    // }
    
    time.setAttribute('src',timeScr);
    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    }
};




cityForm.addEventListener('submit', e => {
    //prevent default acttion
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(error => console.log(error));

        // ste localstorage
        localStorage.setItem('city', city);
});

if (localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data=>updateUI(data))
    .catch(err=>console.log(err))
}