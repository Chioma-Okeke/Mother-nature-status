/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FaReact } from "react-icons/fa";
import Inputs from "./components/Inputs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopButons from "./components/TopButons";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import logo from "./assets/transparent logo desing.png";
import rainVideo from "./assets/rain.mp4";
import sunnyVideo from "./assets/sunny.mp4";
import cloudyVideo from "./assets/cloudy.mp4";
import sunnyImaage from "./assets/sunnyimage.jpg";
import rainyImage from "./assets/rainyImage.jpg";
import cloudyImage from "./assets/cloudyImage.jpg";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
    const [query, setQuery] = useState({ q: "tokyo" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);
    const [videoSrc, setVideoSrc] = useState(rainVideo);

    async function getWeather() {
        try {
            const message = query.q ? query.q : "current location";
            toast.info(
                `Fetching weather data for ${capitalizeFirstLetter(message)}`
            );
            const data = await getFormattedWeatherData({ ...query, units });
            console.log("Weather data:", data);
            toast.success(
                `Fetched weather data for ${data.name}, ${data.country}`
            );
            setWeather(data);
            setVideoSrc(data.details);
            console.log(videoSrc, "video")
        } catch (error) {
            toast.error(
                `Cannot get details for that country. Enter country again`
            );
            console.error("Error fetching weather data: ", error);
        }
    }

    useEffect(() => {
        getWeather();
    }, [query, units]);

    return (
        <div>
            <video
                autoPlay
                loop
                muted
                className="z-auto fixed left-0 top-0 w-full h-full object-cover cursor-default hidden sm:block"
                key={videoSrc}
            >
                <source
                    src={`${
                        videoSrc === "Clear"
                            ? sunnyVideo
                            : videoSrc === "Rain"
                            ? rainVideo
                            : videoSrc === "Clouds"
                            ? cloudyVideo
                            : sunnyVideo
                    }`}
                />
            </video>
            <img
                src={`${
                    videoSrc === "Clear"
                        ? sunnyImaage
                        : videoSrc === "Rain"
                        ? rainyImage
                        : videoSrc === "Clouds"
                        ? cloudyImage
                        : sunnyImaage
                }`}
                key={videoSrc}
                className="z-auto fixed left-0 top-0 w-full h-full object-cover cursor-default block sm:hidden"
            />
            <div
                className='z-20 relative mx-auto max-w-screen-lg py-5 px-5 sm:px-20 md:px-32 opacity-80 bg-slate-600'
            >
                <TopButons setQuery={setQuery} />
                <Inputs setQuery={setQuery} setUnits={setUnits} />
                {weather && (
                    <>
                        <TimeAndLocation weather={weather} />
                        <TempAndDetails weather={weather} units={units} />
                        <Forecast
                            title="3 hour step forecast"
                            data={weather.hourly}
                        />
                        <Forecast title="daily forecast" data={weather.daily} />
                    </>
                )}

                <ToastContainer
                    autoClose={2500}
                    hideProgressBar={true}
                    theme="colored"
                />
            </div>
        </div>
    );
};

export default App;
