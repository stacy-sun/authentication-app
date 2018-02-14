import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, role) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    role
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other Entity APIs ...

export const doCreateToDo = (id, title, content) =>
db.ref(`todo/${id}`).set({
  id,
  title,
  content,
});


// export const doCreateToDo = (id, title, content) => {
//   db.ref('todo/' + id).set({
//     title, 
//     content,
//   });
// }

// export const onceGetToDo = () =>
//   db.ref('todo').once('value');

// ${id}