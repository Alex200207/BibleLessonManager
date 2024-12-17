import  { useState } from 'react';
import { PlusCircle, BookOpen, CheckSquare, ListChecks } from 'lucide-react';
import { EvaluationType } from '../Types/evaluation';
import MultipleChoiceForm from './evaluation-forms/MultipleChoiceForm';
import OpenEndedForm from './evaluation-forms/OpenEndedForm';
import CompletionForm from './evaluation-forms/CompletionForm';

const evaluationTypes = [
  {
    type: 'multiple-choice' as EvaluationType,
    title: 'Multiple Choice Quiz',
    description: 'Create a quiz with multiple choice questions',
    icon: ListChecks,
  },
  {
    type: 'open-ended' as EvaluationType,
    title: 'Open Questions',
    description: 'Create questions that require written answers',
    icon: BookOpen,
  },
  {
    type: 'completion' as EvaluationType,
    title: 'Completion Tasks',
    description: 'Create tasks that students need to complete',
    icon: CheckSquare,
  },
];

export default function EvaluationCreator() {
  const [selectedType, setSelectedType] = useState<EvaluationType | null>(null);

  const renderForm = () => {
    switch (selectedType) {
      case 'multiple-choice':
        return <MultipleChoiceForm onBack={() => setSelectedType(null)} />;
      case 'open-ended':
        return <OpenEndedForm onBack={() => setSelectedType(null)} />;
      case 'completion':
        return <CompletionForm onBack={() => setSelectedType(null)} />;
      default:
        return null;
    }
  };

  if (selectedType) {
    return renderForm();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Crear una evaluacion </h1>
          <p className="text-lg text-gray-600">Select the type of evaluation you want to create</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {evaluationTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => setSelectedType(type.type)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-left border border-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center justify-between mb-4">
                <type.icon className="h-8 w-8 text-blue-500" />
                <PlusCircle className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-gray-600 text-sm">{type.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}