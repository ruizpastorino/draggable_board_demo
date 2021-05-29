import React, { useState, useEffect } from "react";
import Modal from "../utilities/modal";

const NewBoard = ({ close, addBoard, edit }) => {
  const [data, setData] = useState(dataInit);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const dataHandler = ({ target }) => {
    if (buttonDisabled) {
      setButtonDisabled(false);
    }
    setData({ ...data, [target.name]: target.value });
  };

  const colorRef = React.createRef();

  const handleNewBoard = () => {
    if (data.title !== "") {
      addBoard(data);
      setData(dataInit);
      close();
    }
  };

  useEffect(() => {
    if (edit) {
      setData(edit);
      const cIdx = colors.findIndex((e) => e.color === edit.color);
      colorRef.current.selectedIndex = cIdx;
    }
  }, [edit]);

  return (
    <Modal title="Nuevo Tablero" close={close} confirm={handleNewBoard} buttonDisabled={buttonDisabled}>
      <div className="input-container">
        <label>Titulo de Tablero</label>
        <input name="title" value={data.title} type="text" placeholder="Ej. Tareas pendientes" onChange={dataHandler} />
      </div>
      <div className="input-container">
        <label>Color distintivo</label>
        <select ref={colorRef} name="color" value={data.color} onChange={dataHandler}>
          {colors.map((element) => (
            <option key={element.title} style={{ backgroundColor: element.color, textTransform: "capitalize" }} value={element.color}>
              {element.title}
            </option>
          ))}
        </select>
      </div>
    </Modal>
  );
};

const colors = [
  { title: "Cold", color: "#387c73" },
  { title: "warm", color: "orange" },
  { title: "confort", color: "#60ad32" },
  { title: "Hot", color: "tomato" },
  { title: "Neutro", color: "#606060" },
];

const dataInit = {
  title: "",
  color: "#387c73",
  tasks: [],
};

export default NewBoard;
