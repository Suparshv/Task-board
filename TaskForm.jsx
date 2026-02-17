import React, { useState, useEffect } from 'react';
import { useBoard } from '../context/BoardContext';

export default function TaskForm({ close, taskToEdit }) {
    const { addTask, updateTask } = useBoard();
    const [formData, setFormData] = useState({
        title: '', description: '', priority: 'Medium', dueDate: '', tags: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setFormData(taskToEdit);
        }
    }, [taskToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        if (taskToEdit) {
            updateTask(taskToEdit.id, formData);
        } else {
            addTask(formData);
        }
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all scale-100 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">{taskToEdit ? 'Edit Task' : 'New Task'}</h2>
                    <button onClick={close} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none text-sm"
                            placeholder="e.g., Redesign Homepage"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none text-sm resize-none"
                            placeholder="Add details about this task..."
                            rows="3"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none text-sm bg-white"
                                value={formData.priority}
                                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <input
                                type="date"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none text-sm"
                                value={formData.dueDate}
                                onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={close}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors"
                        >
                            {taskToEdit ? 'Save Changes' : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}