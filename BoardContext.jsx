import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // You can use a simple random ID generator if uuid isn't installed

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

const INITIAL_DATA = {
    tasks: {},
    columns: {
        'todo': { id: 'todo', title: 'To Do', taskIds: [] },
        'doing': { id: 'doing', title: 'Doing', taskIds: [] },
        'done': { id: 'done', title: 'Done', taskIds: [] },
    },
    columnOrder: ['todo', 'doing', 'done'],
    activityLog: []
};

export const BoardProvider = ({ children }) => {
    const [data, setData] = useState(INITIAL_DATA);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('task_board_data');
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse board data", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('task_board_data', JSON.stringify(data));
    }, [data]);

    const logActivity = (action) => {
        const newLog = {
            id: Date.now(),
            text: action,
            time: new Date().toLocaleString()
        };
        setData(prev => ({ ...prev, activityLog: [newLog, ...prev.activityLog].slice(0, 50) }));
    };

    const addTask = (task) => {
        const id = Date.now().toString();
        const newTask = { ...task, id, createdAt: new Date().toISOString() };

        setData(prev => ({
            ...prev,
            tasks: { ...prev.tasks, [id]: newTask },
            columns: {
                ...prev.columns,
                'todo': {
                    ...prev.columns['todo'],
                    taskIds: [...prev.columns['todo'].taskIds, id]
                }
            }
        }));
        logActivity(`Created task: "${task.title}"`);
    };

    const deleteTask = (taskId, columnId) => {
        const taskTitle = data.tasks[taskId]?.title;
        const newColumn = {
            ...data.columns[columnId],
            taskIds: data.columns[columnId].taskIds.filter(id => id !== taskId)
        };

        const newTasks = { ...data.tasks };
        delete newTasks[taskId];

        setData(prev => ({
            ...prev,
            columns: { ...prev.columns, [columnId]: newColumn },
            tasks: newTasks
        }));
        logActivity(`Deleted task: "${taskTitle}"`);
    };

    const updateTask = (taskId, updates) => {
        setData(prev => ({
            ...prev,
            tasks: { ...prev.tasks, [taskId]: { ...prev.tasks[taskId], ...updates } }
        }));
        logActivity(`Updated task: "${updates.title || 'Task'}"`);
    };

    const moveTask = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, taskIds: newTaskIds };
            setData(prev => ({
                ...prev,
                columns: { ...prev.columns, [newColumn.id]: newColumn }
            }));
        } else {
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = { ...start, taskIds: startTaskIds };

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = { ...finish, taskIds: finishTaskIds };

            setData(prev => ({
                ...prev,
                columns: { ...prev.columns, [newStart.id]: newStart, [newFinish.id]: newFinish }
            }));
            logActivity(`Moved task to ${finish.title}`);
        }
    };

    const resetBoard = () => {
        if (window.confirm("Are you sure you want to delete all data?")) {
            setData(INITIAL_DATA);
            logActivity("Board reset");
        }
    };

    return (
        <BoardContext.Provider value={{ data, addTask, deleteTask, updateTask, moveTask, resetBoard }}>
            {children}
        </BoardContext.Provider>
    );
};