import React from "react";

const Modal = ({ close, confirm, title, children, buttonDisabled }) => {
  const formRef = React.createRef();

  const dismiss = () => {
    let target = formRef.current;
    target.className = target.className.replace("show-up", "show-down");
    setTimeout(() => {
      close();
    }, 200);
  };

  return (
    <div className="modal-outside">
      <div ref={formRef} className="modal-window show-up">
        <div className="row">
          <h3 className="flex-1">{title}</h3>
          <i className="fas fa-times" onClick={dismiss} />
        </div>
        {children}
        <button
          className={buttonDisabled ? "" : "active-button"}
          disabled={buttonDisabled}
          onClick={confirm}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default Modal;
