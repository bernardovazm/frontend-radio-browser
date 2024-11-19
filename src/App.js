import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import RadioPlayer from "./components/RadioPlayer";

function App() {
  const [stations, setStations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentStation, setCurrentStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Erro ao parsear os favoritos do localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    fetchStations();
  }, []);

  const updateFavorite = (updatedStation) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((fav) =>
        fav.stationuuid === updatedStation.stationuuid ? updatedStation : fav
      )
    );
  };

  const fetchStations = async (query = "") => {
    const url = `https://de1.api.radio-browser.info/json/stations/search?limit=10&name=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    setStations(data.slice(0, 10));
  };

  const addFavorite = (station) => {
    if (!favorites.find((fav) => fav.stationuuid === station.stationuuid)) {
      setFavorites([...favorites, station]);
    }
  };

  const removeFavorite = (stationuuid) => {
    setFavorites(favorites.filter((fav) => fav.stationuuid !== stationuuid));
  };

  const playStation = (station) => {
    setCurrentStation(station);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchStations(query);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar
        stations={stations}
        onSearch={handleSearch}
        playStation={playStation}
        addFavorite={addFavorite}
        favorites={favorites}
      />
      <RadioPlayer
        favorites={favorites}
        currentStation={currentStation}
        removeFavorite={removeFavorite}
        playStation={playStation}
        updateFavorite={updateFavorite}
      />
    </div>
  );
}

export default App;
