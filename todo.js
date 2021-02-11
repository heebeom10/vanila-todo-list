const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList");

const TODOS_LS = "toDos";
let toDos = [];

// function toDosSort(arr) {
//   for (let i = 0; i < toDos.length; i++) {
//     arr[i].id = i;
//     console.log(arr[i].id);
//   }
//   return arr;
// }
// 생성 삭제 버그 고치기 위해 만든 정렬 함수

function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteTodos(event) {
  const btn = event.target;   //클릭한 버튼 찾기
  const li = btn.parentNode;  //버튼의 부모인 리스트 찾기  
  todoList.removeChild(li);   //웹상에서만 리스트 삭제해주기
  const cleanTodos = toDos.filter(function (todo) {
    return todo.id !== parseInt(li.id);    //지운 리스트의 id와 배열의 id가 다른 것만 저장하여 새로운 배열에 저장
  });
  toDos = cleanTodos;   //덮어쓰기
  saveTodos();
}

//state를 보고 가운데 줄 그을지 말지 결정하는 함수
function isTodoClear(span, state) {  
  if (state !== 1) {
    span.classList.remove("todo__clear");
  } else {
    span.classList.add("todo__clear");
  }
}


//clear == text-decoration(line-thorough) 가운데 줄 긋는 함수
function clearTodos(event) {
  const span = event.target;
  const li = span.parentNode;
  const tempID = parseInt(li.id);
  let state = toDos[tempID].isClear;
  state = 1 - state;         //0이면 진행중 1이면 완료
  isTodoClear(span, state);
  toDos[tempID].isClear = state;
  saveTodos();
}

function paintTodos(text, state) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newID = toDos.length;   //해결해야하는 문제. 
  let isClear = 0;    //state 변수 . 0이면 진행중 1이면 완료
  const toDoObj = {
    text: text,
    id: newID,
    isClear: isClear,
  };

  span.innerText = text;
  delBtn.innerText = "❌";

  li.appendChild(span);
  li.appendChild(delBtn);
  li.classList.add("todo__item");
  li.id = newID;
  todoList.appendChild(li);

  isTodoClear(span, state);
  toDos.push(toDoObj);
  saveTodos();

  span.addEventListener("click", clearTodos);  //todo 완료 이벤트
  delBtn.addEventListener("click", deleteTodos);  // todo 삭제 이벤트
}

function handleSubmit(event) {  
  event.preventDefault();
  const toDo = todoInput.value;
  paintTodos(toDo, 0);
  todoInput.value = "";
}

function loadTodos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    const parseTodos = JSON.parse(loadedToDos);
    parseTodos.forEach(function (todo) {
      paintTodos(todo.text, todo.isClear);
    });
  }
  todoForm.addEventListener("submit", handleSubmit); // 이걸 여기에 엏는게 맞나 ?!!?
}

function init() {
  loadTodos();
}
init();
