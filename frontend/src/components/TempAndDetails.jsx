/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

function TempAndDetails({
    weather: {
        details,
        icon,
        temp,
        temp_min,
        temp_max,
        feels_like,
        sunrise,
        sunset,
        humidity,
        speed,
    },
    units,
}) {
    const verticalDetails = [
        {
            id: 1,
            Icon: FaThermometerEmpty,
            title: "Real Feel",
            value: `${feels_like.toFixed()}°`,
        },
        {
            id: 2,
            Icon: BiSolidDropletHalf,
            title: "Humidity",
            value: `${humidity.toFixed()}%`,
        },
        {
            id: 3,
            Icon: FiWind,
            title: "Wind",
            value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
        },
    ];
    const horizontalDetails = [
        {
            id: 1,
            Icon: GiSunrise,
            title: "Sunrise",
            value: `${sunrise}`,
        },
        {
            id: 2,
            Icon: GiSunset,
            title: "Sunset",
            value: `${sunset}`,
        },
        {
            id: 3,
            Icon: MdKeyboardArrowUp,
            title: "High",
            value: `${temp_max.toFixed()}°`,
        },
        {
            id: 4,
            Icon: MdKeyboardArrowDown,
            title: "Low",
            value: `${temp_min.toFixed()}°`,
        },
    ];

    return (
        <div>
            <div className="flex justify-center items-center py-6 text-xl text-cyan-300">
                <p>{details}</p>
            </div>
            <div className="flex flex-row items-center justify-between py-3">
                <img src={icon} alt="Weather icon" className="w-16 sm:w-20" />
                <p className="text-5xl">{`${temp.toFixed()}°`}</p>
                <div className="flex flex-col space-y-3 items-start">
                    {verticalDetails.map(({ id, Icon, title, value }) => {
                        return (
                            <div
                                key={id}
                                className="flex font-light text-sm items-center justify-center"
                            >
                                <Icon size={18} className="mr-1" />
                                {`${title}: `}
                                <span className="font-medium ml-1">
                                    {value}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="grid grid-cols-4 sm:flex flex-row items-center justify-center text-sm py-3 sm:space-x-10">
                {horizontalDetails.map(({ id, Icon, title, value }) => {
                    return (
                        <div key={id} className="flex items-center ">
                            <Icon size={30} />
                            <p className="font-light ml-1">
                                {`${title}: `}
                                <span className="font-medium ml-1">
                                    {value}
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TempAndDetails;
