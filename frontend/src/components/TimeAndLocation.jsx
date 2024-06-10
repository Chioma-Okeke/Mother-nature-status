/* eslint-disable react/prop-types */
// import React from "react";

const TimeAndLocation = ({
    weather: { formattedLocalTime, name, country },
}) => {
    return (
        <div>
            <div className="flex justify-center items-center my-6">
                <p className="text-xl font-extralight">{formattedLocalTime}</p>
            </div>
            <div className="flex justify-center items-center">
                <p className="font-medium text-3xl">
                    {name}, {country}
                </p>
            </div>
        </div>
    );
};

export default TimeAndLocation;
