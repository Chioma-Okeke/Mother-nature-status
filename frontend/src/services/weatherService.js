import { DateTime } from "luxon";

/* eslint-disable no-unused-vars */

function getWeatherData(infoType, searchParams) {
    const url = new URL(
        `https://boiling-sands-10757-8c12f162a533.herokuapp.com/api/${infoType}`
    );
    url.search = new URLSearchParams({ ...searchParams });

    return fetch(url).then((res) => res.json());
}

function iconUrlFromCode(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

function formatToLocalTime(
    secs,
    offset,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) {
    return DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(
        format
    );
}

function formatForecastWeather(secs, offset, data) {
    //hourly
    const hourly = data
        .map((f) => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "hh:mm a"),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt,
        }))
        .splice(0, 5);

    //daily
    const daily = data
        .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
        .map((f) => ({
            temp: f.main.temp,
            title: formatToLocalTime(f.dt, offset, "ccc"),
            icon: iconUrlFromCode(f.weather[0].icon),
            date: f.dt_txt,
        }));

    return { hourly, daily };
}

function formatCurrent(data) {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        wind: { speed },
        weather,
        timezone,
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        temp,
        formattedLocalTime,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
        sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
        speed,
        details,
        icon: iconUrlFromCode(icon),
        dt,
        timezone,
        lat,
        lon,
    };
}

async function getFormattedWeatherData(searchParams) {
    const formattedCurrentWeather = await getWeatherData(
        "weather",
        searchParams
    ).then(formatCurrent);

    const { dt, timezone, lat, lon } = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData("forecast", {
        lat,
        lon,
        units: searchParams.units,
    }).then((d) => formatForecastWeather(dt, timezone, d.list));

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
}

export default getFormattedWeatherData;
