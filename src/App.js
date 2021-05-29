import React ,{ useState } from "react";
import "./App.css";
import Board from "./components/boards/board";
import NewBoard from "./components/boards/new-board";
import { fakeData } from "./simulated-data/@fake-boards";
import "./icons/css/all.css";
import PopUp from "./components/utilities/pop-up";

const App = () => {
  const [editBoard, setEditBoard] = useState(false);
  const [boards, setBoards] = useState([...fakeData]);
  const [newBoard, setNewBoard] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState(false);
  const [params, setParams] = useState(false);

  const updateBoards = (message) => {
    setBoards([...boards]);
    if (message) {
      setPopUpMsg(message);
    }
  };

  const addNewBoard = (data) => {
    if (editBoard) {
      let index = boards.findIndex((e) => e.id === editBoard.id);
      boards[index] = data;
    } else {
      const lastBoard = boards[boards.length - 1];
      data.id = lastBoard !== undefined ? lastBoard.id + 1 : 0;
      boards.push(data);
    }
    updateBoards(editBoard ? "Se Modifico Tablero" : "Creado un nuevo tablero");
  };


  const edit = (board) => {
    setEditBoard(board);
    setNewBoard(true);
  };

  return (
    <div className="App">
      {newBoard && (
        <NewBoard
          close={() => {
            setEditBoard(false);
            setNewBoard(false);
          }}
          edit={editBoard}
          addBoard={addNewBoard}
        />
      )}
      <div className="container">
        <div className="row">
          <h2 className="flex-1">Tableros Activos</h2>
          <i style={{ color: "orange", fontSize: "30px" }} className="fas fa-plus-circle" onClick={() => setNewBoard(true)} />
        </div>
        <div className="boards-container">
          {boards.length ? (
            boards.map((board, idx) => (
              <Board
                key={idx}
                {...{
                  boards,
                  board,
                  params,
                  setParams,
                  updateBoards,
                  edit,
                  remove: () => {
                    boards.splice(idx, 1);
                    updateBoards("Tablero Eliminado");
                  },
                }}
              />
            ))
          ) : (
            <div style={{ backgroundColor: "#505050" }} className="empty">
              <i style={{ fontSize: "100px", marginBottom: "50px" }} className="fas fa-chalkboard" />
              <h2>Crear Tablero para comenzar</h2>
            </div>
          )}
        </div>
      </div>
      {popUpMsg && <PopUp message={popUpMsg} close={() => setPopUpMsg(false)} time={750} />}
    </div>
  );
};

export default App;
