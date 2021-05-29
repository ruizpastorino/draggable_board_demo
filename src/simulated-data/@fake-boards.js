let boardID = 0;
let taskID = 0;
export const fakeData = [
  {
    id: boardID++,
    color: "tomato",
    title: "Waiting to do",
    tasks: [
      {
        id: taskID++,
        title: "Crear usuarios",
        detail: "Definir esquema de usuarios",
      },
      {
        id: taskID++,
        title: "Agregar avatar de usario a las cards" ,
        detail: "Utilizar una foto de perfil pequeña circular",
      },
    ],
  },
  {
    id: boardID++,
    color: "orange",
    title: "Doing Now",
    tasks: [
      {
        id: taskID++,
        title: "Crear funcionamientos de cards",
        detail: "Desarrollar la logica para el traslado de las tarjetas",
      },
    ],
  },
  {
    id: boardID++,
    color: "#60ad32",
    title: "Done it",
    tasks: [],
  },
];
