/* eslint-disable react/prop-types */
// import React from 'react'

const TopButons = ({ setQuery }) => {
    const cities = [
        {
            id: 1,
            name: "Lagos",
        },
        {
            id: 2,
            name: "Ghana",
        },
        {
            id: 3,
            name: "Tokyo",
        },
        {
            id: 4,
            name: "Paris",
        },
        {
            id: 5,
            name: "Toronto",
        },
    ];
    return (
        <div className="flex gap-2 items-center justify-around sm:my-6">
            {cities.map((city) => (
                <button
                    key={city.id}
                    className="sm:text-lg font-medium hover:bg-gray-700/20 sm:px-3 sm:py-2 rounded-md transition ease-in"
                    onClick={() => setQuery({ q: city.name })}
                >
                    {city.name}
                </button>
            ))}
        </div>
    );
};

export default TopButons;
