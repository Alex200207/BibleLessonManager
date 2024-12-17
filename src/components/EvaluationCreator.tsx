import  { useState } from 'react';
import { Book,  FileQuestion } from 'lucide-react';
import QuestionnaireForm from './QuestionnaireForm';
import PsalmEvaluation from './PsalmEvaluation';

type EvaluationType = 'questionnaire' | 'psalm';

export default function EvaluationCreator() {
  const [evaluationType, setEvaluationType] = useState<EvaluationType | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Crear Evaluación</h1>
        
        {!evaluationType ? (
          <div className="grid md:grid-cols-2 gap-6 dark:bg-gray-900 dark:text-white">
            <button
              onClick={() => setEvaluationType('questionnaire')}
              className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 "
            >
              <FileQuestion className="w-12 h-12 text-blue-600 mb-4 " />
              <h2 className="text-xl font-semibold text-gray-800">Cuestionario</h2>
              <p className="text-gray-600 text-center mt-2">
                Crear preguntas con opciones múltiples o respuestas abiertas
              </p>
            </button>

            <button
              onClick={() => setEvaluationType('psalm')}
              className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <Book className="w-12 h-12 text-green-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800">Evaluación de Salmos</h2>
              <p className="text-gray-600 text-center mt-2">
                Evaluar el aprendizaje y recitación de salmos
              </p>
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setEvaluationType(null)}
              className="mb-6 text-gray-600 hover:text-gray-800 flex items-center gap-2"
            >
              ← Volver a tipos de evaluación
            </button>
            
            {evaluationType === 'questionnaire' ? (
              <QuestionnaireForm  />
            ) : (
              <PsalmEvaluation />
            )}
          </div>
        )}
      </div>
    </div>
  );
}