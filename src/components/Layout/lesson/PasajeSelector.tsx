// src/components/PasajeSelector.tsx

import React, { useState } from "react";

interface PasajeSelectorProps {
  onSelect: (pasaje: string) => void; // Callback para pasar el pasaje seleccionado
  onClose: () => void; // Callback para cerrar el modal
}

const PasajeSelector: React.FC<PasajeSelectorProps> = ({ onSelect, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    if (query) {
      const response = await fetch(`https://bible.helloao.org/api/{translation}/books.json/${query}`);
      const data = await response.json();
      setResults(data.verses.map((verse: { text: string }) => verse.text)); // Ajusta según la estructura de la respuesta
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-md">
        <h2 className="text-lg font-semibold text-gray-800">Seleccionar Pasaje</h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar pasaje"
          className="border border-gray-300 rounded-md p-2 w-full mt-2"
        />
        <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white p-2 rounded">
          Buscar
        </button>
        <ul className="mt-4">
          {results.map((result, index) => (
            <li key={index} onClick={() => onSelect(result)} className="cursor-pointer hover:bg-gray-100 p-2">
              {result}
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 text-red-500">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default PasajeSelector;
