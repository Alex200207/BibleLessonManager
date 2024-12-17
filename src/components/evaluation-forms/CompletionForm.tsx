import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { CompletionTask } from '../../Types/evaluation';

type Props = {
  onBack: () => void;
};

export default function CompletionForm({ onBack }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState<CompletionTask[]>([]);

  const addTask = () => {
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: '',
        description: '',
        completionCriteria: '',
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ title, description, tasks });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to types
        </button>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Create Completion Tasks</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Assignment Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
              <button
                type="button"
                onClick={addTask}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Task
              </button>
            </div>

            {tasks.map((task, index) => (
              <div key={task.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-md font-medium">Task {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Task Title</label>
                    <input
                      type="text"
                      value={task.title}
                      onChange={(e) => {
                        const newTasks = [...tasks];
                        newTasks[index].title = e.target.value;
                        setTasks(newTasks);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Task Description</label>
                    <textarea
                      value={task.description}
                      onChange={(e) => {
                        const newTasks = [...tasks];
                        newTasks[index].description = e.target.value;
                        setTasks(newTasks);
                      }}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Completion Criteria</label>
                    <textarea
                      value={task.completionCriteria}
                      onChange={(e) => {
                        const newTasks = [...tasks];
                        newTasks[index].completionCriteria = e.target.value;
                        setTasks(newTasks);
                      }}
                      placeholder="What needs to be done to consider this task complete?"
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
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
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}