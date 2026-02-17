import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, Calendar } from 'lucide-react';

const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-green-100 text-green-800',
};

export default function TaskCard({ task, index, onDelete, onEdit }) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-3 rounded shadow-sm mb-2 hover:shadow-md transition-shadow group border border-gray-200"
                    onClick={() => onEdit(task)}
                >
                    <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-800">{task.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>
                            {task.priority}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>

                    <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center text-xs text-gray-500">
                            <Calendar size={12} className="mr-1" />
                            {task.dueDate || 'No Date'}
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            )}
        </Draggable>
    );
}