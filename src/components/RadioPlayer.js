import React, { useState } from "react";

function RadioPlayer({
  currentStation,
  favorites,
  removeFavorite,
  playStation,
  updateFavorite, // Função para atualizar dados da rádio
}) {
  const [editingStationId, setEditingStationId] = useState(null); // Controla qual rádio está sendo editada
  const [editData, setEditData] = useState(null);

  // Função para inicializar a edição
  const startEditing = (station) => {
    setEditData({ ...station });
    setEditingStationId(station.stationuuid);
  };

  // Função para salvar as alterações
  const saveEdit = () => {
    updateFavorite(editData);
    setEditingStationId(null);
    setEditData(null);
  };

  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Radio Browser</h1>

      {/* Informações da Rádio Selecionada */}
      <div className="bg-gray-800 p-6 rounded">
        {currentStation ? (
          <>
            <h2 className="text-xl font-semibold mb-2">
              {currentStation.name}
            </h2>
            <p className="mb-4">
              {currentStation.country}, {currentStation.tags}
            </p>
            <audio
              controls
              className="w-full"
              src={currentStation.url_resolved}
              onError={() => alert("This radio stream is unavailable.")}
            >
              Your browser does not support the audio element.
            </audio>
          </>
        ) : (
          <p className="text-center">Select a radio station to play</p>
        )}
      </div>

      {/* Lista de Favoritos */}
      <div className="bg-gray-800 p-6 rounded mt-4">
        <h2 className="text-xl font-semibold mb-2">Favorite Radios</h2>
        <ul>
          {favorites.map((favorite) => (
            <React.Fragment key={favorite.stationuuid}>
              <li className="flex justify-between items-center p-2 bg-gray-700 rounded mb-2">
                <span>{favorite.name}</span>
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 px-3 py-1 rounded"
                    onClick={() => removeFavorite(favorite.stationuuid)}
                  >
                    ✖
                  </button>
                  <button
                    className="bg-blue-500 px-3 py-1 rounded"
                    onClick={() => playStation(favorite)}
                  >
                    ▶
                  </button>
                  <button
                    className="bg-yellow-500 px-3 py-1 rounded"
                    onClick={() => startEditing(favorite)}
                  >
                    ✏
                  </button>
                </div>
              </li>

              {/* Formulário de Edição */}
              {editingStationId === favorite.stationuuid && editData && (
                <li className="bg-gray-700 p-4 mt-2 rounded">
                  <h3 className="text-lg font-bold mb-2">Edit Radio</h3>
                  <div className="mb-2">
                    <label className="block text-sm">Name:</label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full p-2 rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm">Country:</label>
                    <input
                      type="text"
                      value={editData.country}
                      onChange={(e) =>
                        setEditData({ ...editData, country: e.target.value })
                      }
                      className="w-full p-2 rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm">Tags:</label>
                    <input
                      type="text"
                      value={editData.tags}
                      onChange={(e) =>
                        setEditData({ ...editData, tags: e.target.value })
                      }
                      className="w-full p-2 rounded"
                    />
                  </div>
                  <button
                    className="bg-green-500 px-3 py-1 rounded mr-2"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 px-3 py-1 rounded"
                    onClick={() => {
                      setEditingStationId(null);
                      setEditData(null);
                    }}
                  >
                    Cancel
                  </button>
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RadioPlayer;
