import React, { useState } from "react";

function Sidebar({ stations, onSearch, playStation, addFavorite, favorites }) {
  const [menuOpen, setMenuOpen] = useState(true);
  return (
    <>
      {menuOpen ? (
        <div
          className={`${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } fixed sm:relative sm:w-1/4 w-full h-full bg-gray-800 p-4 transition-transform duration-300 z-50`}
        >
          <button
            className="bg-blue-500 mb-4 px-3 py-1 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <input
            type="text"
            placeholder="Search here"
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
            onChange={(e) => onSearch(e.target.value)}
          />
          <h2 className="text-xl font-semibold mb-2">Stations</h2>
          <ul className="mb-6">
            {stations.map((station) => (
              <li
                key={station.stationuuid}
                className="flex justify-between items-center p-2 bg-gray-700 rounded mb-2"
              >
                <span>{station.name}</span>
                <div className="flex gap-2">
                  {favorites.some(
                    (fav) => fav.stationuuid === station.stationuuid
                  ) ? (
                    <button className="bg-green-500 px-3 py-1 rounded">
                      ✔
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 px-3 py-1 rounded"
                      onClick={() => addFavorite(station)}
                    >
                      ★
                    </button>
                  )}
                  <button
                    className="bg-blue-500 px-3 py-1 rounded"
                    onClick={() => playStation(station)}
                  >
                    ▶
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="fixed">
          <button
            className="bg-blue-500 m-4 px-3 py-1 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
