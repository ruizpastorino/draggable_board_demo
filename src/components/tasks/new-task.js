import React, { useEffect, useState } from "react";
import Modal from "../utilities/modal";

const NewTask = ({ close, addTask, edit }) => {
  const [data, setData] = useState(dataInit);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dataHandler = ({ target }) => {
    if (buttonDisabled) {
      setButtonDisabled(false);
    }
    setData({ ...data, [target.name]: target.value});
  };

  const handleNewTask = () => {
    if (data.title !== "") {
      setData(dataInit);
      addTask(data);
      close();
    }
  };

  useEffect(() => {
    if (edit) {
      setData(edit);
    }
  }, [edit]);

  return (
    <div>
      <Modal title="Nueva Tarea" close={close} confirm={handleNewTask} buttonDisabled={buttonDisabled}>
        <div>
          <div className="input-container">
            <label>Titulo</label>
            <input name="title" value={data.title} type="text" maxLength={100} placeholder="Titulo o nombre" onChange={dataHandler} />
          </div>
          <div className="input-container">
            <label>Detalle</label>
            <textarea
              name="detail"
              value={data.detail}
              maxLength={250}
              rows="3"
              onChange={dataHandler}
              placeholder="Describa la tarea (maximo 250 caracteres)"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

const dataInit = { title: "", detail: "" };

export default NewTask;
