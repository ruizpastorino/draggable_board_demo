import React from "react";

const PopUp = ({ message, close, time }) => {
  const windowRef = React.createRef();

  React.useEffect(() => {
    setTimeout(() => {
      let target = windowRef.current;
      target.className = target.className.replace("show-up", "show-down");
    }, time);
    setTimeout(() => {
      close();
    }, time + 200);
  }, [close]);

  return (
    <div className="modal-outside">
      <div ref={windowRef} style={style} className="modal-window center-all show-up">
        <i
          style={{ fontSize: "40px", marginBottom: "10px", color: "orange" }}
          className="fas fa-check"
        />
        <h3>{message}</h3>
      </div>
    </div>
  );
};

export default PopUp;

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "150px",
  minWidth: "400px",
  maxWidth: "600px",
};
