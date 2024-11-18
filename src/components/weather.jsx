import { Component } from "react";

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
            city: "Nairobi",
            weatherData: null,
            error: null,
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.getWeatherData = this.getWeatherData.bind(this)


    }
    handleOnChange(e) {
        this.setState({
            inputVal: e.target.value,

        });

    }
    async componentDidMount() {
        await this.getWeatherData()

    }
    async getWeatherData() {
        const apiKey = 'df6e716f5f174930b3191204240204';
        const city = this.state.inputVal || this.state.city;
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;


        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("city is not found")
            }
            const data = await response.json()
            console.log(data)
            this.setState({
                city: data.location.name,
                weatherData: {
                    description: data.current.condition.text,
                    icon: data.current.condition.icon,
                    humidity: data.current.humidity,
                    tempCelcius: data.current.temp_c,
                    windSpeed: data.current.wind_kph,
                    windDirection: data.current.wind_dir,
                    pressure: data.current.pressure_in

                },
                error: null,
                inputVal: ''

            })
        } catch (error) {
            console.error("Error fetching weather data:", error.message);
            this.setState({ weatherData: null }); // Reset on error

        }



    }


    render() {
        const { inputVal, city, weatherData } = this.state;
        return (

            <section>
                <div className="display">

                    <input type="text"
                        id="city"
                        placeholder="Enter a city"
                        onChange={this.handleOnChange}
                        autoComplete="off"
                        value={inputVal} />


                    <button type="button" onClick={this.getWeatherData}>enter</button>
                </div>

                <div className="weather">
                    <h2>{city}</h2>

                    <div className="im"> <img
                        src={weatherData ? `https:${weatherData.icon}` : ''}
                        alt="an icon" />
                    </div>
                    <p> {weatherData ? weatherData.description : 'N/A'}</p>
                    <p id="temp">{weatherData ? weatherData.tempCelcius : 'N/A'} °C</p>
                    <div className="para">
                        <p>Humidity:{weatherData ? weatherData.humidity : 'N/A'} %</p>
                        <p>Wind Speed:{weatherData ? weatherData.windSpeed : 'N/A'} kph</p>
                        <p>Wind Direction:{weatherData ? weatherData.windDirection : 'N/A'} </p>
                        <p>Pressure:{weatherData ? weatherData.pressure : 'N/A'}  hPa</p>
                    </div>
                </div>
            </section>
        )
    }
}

export default Weather