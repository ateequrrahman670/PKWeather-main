class Forecast {
    constructor() {
        this.key = '5ZlslygerTlBsIYWerdp8psCATBoHlPq';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);
        // object short and notation 
        return { cityDetails, weather };
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(weather) {
        const query = `${weather}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
};
// getCity('Swabi').then(data => { return getWeather(data.Key);
// }).then(data =>{
//     console.log(data);
// }).catch(error => console.log(error))
