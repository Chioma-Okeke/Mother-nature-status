/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Inputs = ({ setQuery, setUnits }) => {
    const [cityName, setCityName] = React.useState("");

    function handleChange(event) {
        setCityName(event.target.value);
    }

    function handleLocationClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setQuery({ lat: latitude, lon: longitude });
            });
        }
    }

    return (
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row w-3/4 items-center justify-center sm:space-x-4">
                <input
                    type="text"
                    value={cityName}
                    placeholder="Search by city..."
                    onChange={(event) => handleChange(event)}
                    className="text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
                />
                <BiSearch
                    size={30}
                    className="ml-1 sm:ml-0 cursor-pointer transition ease-out sm:hover:scale-125"
                    onClick={() => {
                        setQuery({ q: cityName });
                        setCityName("");
                    }}
                />
                <BiCurrentLocation
                    size={30}
                    className="ml-1 sm:ml-0 cursor-pointer transition ease-out sm:hover:scale-125"
                    onClick={handleLocationClick}
                />
            </div>
            <div className="flex flex-row w-1/4 items-center justify-center">
                <button
                    className="text-lg sm:text-2xl font-medium transition ease-out hover:scale-125"
                    onClick={() => setUnits("metric")}
                >
                    °C
                </button>
                <p className="text-lg sm:text-2xl font-medium mx-1">|</p>
                <button
                    className="text-lg sm:text-2xl font-medium transition ease-out hover:scale-125"
                    onClick={() => setUnits("imperial")}
                >
                    °F
                </button>
            </div>
        </div>
    );
};

export default Inputs;
