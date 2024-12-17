import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { OpenQuestion } from "../Types/evaluation";

export default function QuestionnaireForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<OpenQuestion[]>([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: crypto.randomUUID(),
        question: "",
        expectedLength: "medium",
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, description, questions });
  };

  return (
    <div className="min-h-screen bg-gray-50  sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white p-8 rounded-lg shadow"
        >
          <div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Leccion
                </label>
                <select
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="1">Leccion 1</option>
                  <option value="2">Leccion 2</option>
                  <option value="3">Leccion 3</option>
                  <option value="4">Leccion 4</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Questions</h3>
              <button
                type="button"
                onClick={addQuestion}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Question
              </button>
            </div>

            {questions.map((question, index) => (
              <div
                key={question.id}
                className="border rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium">Question {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() =>
                      setQuestions(
                        questions.filter((q) => q.id !== question.id)
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].question = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    placeholder="Enter your question"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Answer Length
                    </label>
                    <select
                      value={question.expectedLength}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[index].expectedLength = e.target.value as
                          | "short"
                          | "medium"
                          | "long";
                        setQuestions(newQuestions);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="short">Short (1-2 sentences)</option>
                      <option value="medium">Medium (paragraph)</option>
                      <option value="long">Long (multiple paragraphs)</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Evaluation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
