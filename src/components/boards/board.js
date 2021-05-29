import React, { useRef, useState } from "react";
import Task from "../tasks/task";
import NewTask from "../tasks/new-task";

const Board = ({ boards, board, updateBoards, remove, edit: editBoard, params, setParams }) => {
  const { dragging, dragGroup } = params;
  let { title, color, tasks } = board;

  const [newTask, setNewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const dragNode = useRef(null);

  const addTask = (data) => {
    if (editTask) {
      let index = tasks.findIndex((e) => e.id === editTask.id);
      tasks[index] = data;
    } else {
      data.id = String(Math.random()).split(".")[1];
      board.tasks = [...tasks, data];
    }
    updateBoards(editTask ? "Modificada Tarea" : "Creada una nueva Tarea");
  };

  const handleDragStart = (e, payload) => {
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setParams({ dragging: payload, dragGroup: board.id });
  };

  const handleDragEnd = () => {
    dragNode.current = null;
    setParams({});
  };

  const handleDragEnter = (group, task) => {
    if (dragging !== undefined) {
      const dgIdx = boards.findIndex((e) => e.id === dragGroup);
      const dIdx = boards[dgIdx].tasks.findIndex((e) => e.id === dragging.id);
      const gIdx = boards.findIndex((e) => e.id === group.id);
      const tIdx = group.tasks.findIndex((e) => e.id === task.id);

      const existInBoard = boards[gIdx].tasks.findIndex((e) => e.id === dragging.id);

      if (existInBoard !== -1) {
        boards[gIdx].tasks[tIdx] = dragging;
        boards[gIdx].tasks[dIdx] = task;
      } else if (existInBoard === -1 || !boards[gIdx].tasks.length) {
        boards[dgIdx].tasks.splice(dIdx, 1);
        boards[gIdx].tasks.splice(tIdx, 0, dragging);

        setParams({ dragging: dragging, dragGroup: group.id });
      }

      updateBoards();
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setNewTask(true);
  };

  return (
    <div draggable className="board-container" onDragEnter={dragging && !board.tasks.length ? () => handleDragEnter(board, dragging) : null}>
      <div style={{ backgroundColor: color }} className="board-title">
        <div style={{ alignItems: "center" }} className="row">
          <h2 className="flex-1">
            {title} ({board.tasks.length})
          </h2>
          <i className="fas fa-plus-circle" onClick={() => setNewTask(true)} />
          <i className="fas fa-edit" onClick={() => editBoard(board)} />
          <i className="fas fa-times" onClick={remove} />
        </div>
      </div>
      <div className="board-tasks-area">
        {tasks.length ? (
          tasks.map((task, idx) => (
            <Task
              dragging={dragging}
              key={idx}
              task={task}
              remove={() => {
                tasks.splice(idx, 1);
                updateBoards("Tarea Eliminada");
              }}
              edit={() => handleEdit(task)}
              onDragStart={(e) => handleDragStart(e, task)}
              onDragEnter={() => handleDragEnter(board, task)}
            />
          ))
        ) : (
          <div className="empty">
            <i className="fas fa-file" />
            <h2>Sin tareas</h2>
          </div>
        )}
      </div>
      {newTask && (
        <NewTask
          close={() => {
            setEditTask(false);
            setNewTask(false);
          }}
          addTask={addTask}
          edit={editTask}
        />
      )}
    </div>
  );
};

export default Board;
