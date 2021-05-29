import React, { useState } from "react";

const Task = ({ task, remove, edit, onDragStart, onDragEnter, dragging }) => {
  const [display, setDisplay] = useState(true);

  const { title, detail, id } = task;

  return (
    <div
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      draggable
      className={`card ${dragging && dragging.id === id ? "opacity-low" : ""}`}
    >
      <div className="card-title">
        <div className="row">
          <h5 className={`flex-1 ${!display ? "cut-text" : ""}`}>{title}</h5>
          {detail !== "" && (
            <i
              className={`fas fa-caret-${display ? "up" : "down"} card-icon`}
              onClick={() => setDisplay(!display)}
            />
          )}
          <i className="fas fa-edit card-icon" onClick={edit} />
          <i className="fas fa-times card-icon" onClick={remove} />
        </div>
      </div>
      {detail !== "" && display && (
        <div className="card-body">
          <p>{detail}</p>
        </div>
      )}
    </div>
  );
};

export default Task;