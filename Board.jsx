import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useBoard } from '../context/BoardContext';
import { useAuth } from '../context/AuthContext';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

export default function Board() {
    const { data, moveTask, deleteTask, resetBoard } = useBoard();
    const { logout, user } = useAuth();

    // Local UI State
    const [filterPriority, setFilterPriority] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortByDate, setSortByDate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const getFilteredTasks = (columnId) => {
        let tasks = data.columns[columnId].taskIds.map(id => data.tasks[id]);

        // Search
        if (searchQuery) {
            tasks = tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Filter
        if (filterPriority !== 'All') {
            tasks = tasks.filter(t => t.priority === filterPriority);
        }
        // Sort
        if (sortByDate) {
            tasks.sort((a, b) => {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
        }
        return tasks;
    };

    const onDragEnd = (result) => {
        if (sortByDate || searchQuery || filterPriority !== 'All') return;
        moveTask(result);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2"></path></svg>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 tracking-tight">TaskFlow</h1>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-gray-600">{user?.name}</span>
                    </div>
                    <button onClick={resetBoard} className="text-sm text-gray-500 hover:text-red-600 transition-colors font-medium">Reset Data</button>
                    <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Logout</button>
                </div>
            </header>

            {/* Controls */}
            <div className="px-8 py-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-3 items-center flex-1">
                    <div className="relative group">
                        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input
                            placeholder="Search tasks..."
                            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all w-64 shadow-sm"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <select
                        className="py-2 pl-3 pr-8 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all shadow-sm cursor-pointer"
                        value={filterPriority}
                        onChange={e => setFilterPriority(e.target.value)}
                    >
                        <option value="All">All Priorities</option>
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>

                    <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={sortByDate}
                            onChange={e => setSortByDate(e.target.checked)}
                        />
                        <span className="text-sm font-medium text-gray-700">Sort by Date</span>
                    </label>
                </div>

                <button
                    onClick={() => { setEditingTask(null); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    New Task
                </button>
            </div>

            {/* Board Canvas */}
            <div className="flex-1 overflow-x-auto px-8 pb-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex gap-8 h-full min-w-max">
                        {data.columnOrder.map(columnId => {
                            const column = data.columns[columnId];
                            const tasks = getFilteredTasks(columnId);

                            return (
                                <div key={column.id} className="w-80 flex flex-col h-full max-h-[calc(100vh-220px)]">
                                    <div className="flex justify-between items-center mb-4 px-1">
                                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                                            {column.title}
                                            <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{tasks.length}</span>
                                        </h3>
                                    </div>
                                    <div className={`bg-gray-100/50 border border-gray-200 rounded-xl p-2 flex-1 flex flex-col ${tasks.length === 0 ? 'border-dashed' : ''}`}>
                                        <Droppable droppableId={column.id} isDropDisabled={sortByDate || searchQuery || filterPriority !== 'All'}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={`flex-1 overflow-y-auto min-h-[150px] transition-colors rounded-lg p-1 ${snapshot.isDraggingOver ? 'bg-blue-50/50' : ''}`}
                                                >
                                                    {tasks.map((task, index) => (
                                                        <TaskCard
                                                            key={task.id}
                                                            task={task}
                                                            index={index}
                                                            onDelete={(id) => deleteTask(id, column.id)}
                                                            onEdit={handleEdit}
                                                        />
                                                    ))}
                                                    {provided.placeholder}
                                                    {tasks.length === 0 && !snapshot.isDraggingOver && (
                                                        <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                                                            No tasks
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </DragDropContext>
            </div>

            {/* Activity Log Panel */}
            <div className="bg-white border-t border-gray-200 px-8 py-3">
                <div className="flex items-center gap-2 mb-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider">Recent Activity</h4>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-1 scrollbar-hide">
                    {data.activityLog.slice(0, 5).map(log => (
                        <div key={log.id} className="text-xs text-gray-600 whitespace-nowrap flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            <span className="font-mono text-gray-400">{log.time.split(',')[1].trim().slice(0, 5)}</span>
                            <span>{log.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && <TaskForm close={() => setIsModalOpen(false)} taskToEdit={editingTask} />}
        </div>
    );
}