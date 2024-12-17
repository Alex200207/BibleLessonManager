import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

interface CriterionType {
  id: string;
  description: string;
  maxPoints: number;
}

export default function PsalmEvaluation() {
  const [title, setTitle] = useState("");
  const [psalmNumber, setPsalmNumber] = useState("");
  const [criteria, setCriteria] = useState<CriterionType[]>([]);

  const addCriterion = () => {
    const newCriterion = {
      id: Date.now().toString(),
      description: "",
      maxPoints: 10,
    };
    setCriteria([...criteria, newCriterion]);
  };

  const updateCriterion = (id: string, updates: Partial<CriterionType>) => {
    setCriteria(criteria.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    const evaluation = {
      title,
      psalmNumber,
      criteria,
      createdAt: new Date().toISOString(),
    };
    console.log("Saving psalm evaluation:", evaluation);
    // Here you would typically save to your backend
    alert("Evaluación de salmo guardada exitosamente");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccione la leccion
          </label>
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="1">Lección 1</option>
            <option value="2">Lección 2</option>
            <option value="3">Lección 3</option>
            <option value="4">Lección 4</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccione un grupo
          </label>
          <select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="1">grupo 1</option>
            <option value="2">grupo 2</option>
            <option value="3">Lgrupo 3</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Número del Salmo
          </label>
          <input
            type="text"
            value={psalmNumber}
            onChange={(e) => setPsalmNumber(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Ej: Salmo 23"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Criterios de Evaluación
            </h3>
            <button
              onClick={addCriterion}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar Criterio
            </button>
          </div>

          <div className="space-y-4">
            {criteria.map((criterion, index) => (
              <div key={criterion.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Criterio {index + 1}
                  </span>
                  <button
                    onClick={() => removeCriterion(criterion.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <input
                      type="text"
                      value={criterion.description}
                      onChange={(e) =>
                        updateCriterion(criterion.id, {
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded-md"
                      placeholder="Ej: Memorización del texto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Puntos Máximos
                    </label>
                    <input
                      type="number"
                      value={criterion.maxPoints}
                      onChange={(e) =>
                        updateCriterion(criterion.id, {
                          maxPoints: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border rounded-md"
                      min="1"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {(title || psalmNumber || criteria.length > 0) && (
          <button
            onClick={handleSave}
            className=" text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 bg-black"
          >
            Guardar Evaluación
          </button>
        )}
      </div>
    </div>
  );
}
