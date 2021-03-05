let div = document.getElementById('one');

function getAllTodos () {
   fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => response.text())
  .then((allTodos) => div.append(allTodos));
}

function getIdTodos (id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then((response) => response.text())
  .then((idTodos) => div.append(idTodos));
}

function createTodo (title, userId) {
  fetch('https://jsonplaceholder.typicode.com/todos' ,{
    method: 'POST',
    body: JSON.stringify({
      title: title,
      userId: userId,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.text())
  .then((newTodo) => div.append(newTodo));
}

function updateTodo (id, {title, completed}) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title,
      completed,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.text())
  .then((updateTodo) => {
    div.append(updateTodo)
  });
}

function deleteTodo (id) {
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}` , {
    method: 'DELETE',
  })
  .then((response) => div.append(response.ok));
}

function filterTodoByUserId(userId) {
  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
  .then((response) => response.text())
  .then((userTodos) => div.append(userTodos));
}

function getcompleteTodos (done) { //true or false
  fetch(`https://jsonplaceholder.typicode.com/todos?completed=${done}`)
  .then((response) => response.text())
  .then((Todos) => div.append(Todos));
}

deleteTodo(1);
// getIdTodos(1);
// filterTodoByUserId(2);
// deleteTodo(5);
// updateTodo(15,'dddfd','ybxtuj yt vtyznm',2);
//  createTodo('красотка','ничего не делать',55);
// getIdTodos(2);
//getAllTodos();