const tasktext = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const removeBtn = document.querySelector(".closeBtn");
const checkboxes = document.querySelectorAll(".item");
const ul = document.querySelector(".todo-list");

addBtn.addEventListener("click", addtask2);
tasktext.addEventListener("keypress", handleKeyPress);

// 如果前面的值不存在(null), 則返回空陣列
let listData = JSON.parse(localStorage.getItem("listStorage")) || [];

//新增列表進資料庫
function addtask2() {
  const content = tasktext.value.trim();
  if (tasktext.value == "") {
    return;
  }
  listData.unshift({
    text: tasktext.value,
    status: false,
    id: listData.length,
  });
  render();
  tasktext.value = "";
}

//checkbox監聽事件
ul.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e);
  if (e.target.nodeName === "INPUT") {
    listData.forEach((item) => {
      if (e.target.dataset.num == item.id) {
        item.status = !item.status;
      }
    });
  }
  render();
});

function handleKeyPress(e) {
  if (e.key == "Enter") {
    addtask2();
  }
}

// 從資料庫抓資料放進list;
function render() {
  let str = "";
  listData.forEach((item, i) => {
    item.id = i;
    str += `<li class="todo-item">
                  <input type='checkbox' class="item" ${
                    item.status ? "checked" : ""
                  } data-num=${i} id="check" onchange="toggleStrikeThrough(this)">
                  <span >${item.text}</span>
                <button class="closeBtn" data-num="${i}">
                  <i id="trashcan" class="fa-solid fa-trash" data-num="${i}" ></i>
                </button>
              </li>
              `;
  });
  ul.innerHTML = str;
  localStorage.setItem("listStorage", JSON.stringify(listData));
}

//刪除button事件
ul.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON" || e.target.nodeName == "I") {
    console.log(e.target.dataset.num);
    listData = listData.filter((item, index) => index != e.target.dataset.num);
    render();
  }
});

function toggleStrikeThrough(checkbox) {
  var text = checkbox.nextElementSibling;
  if (checkbox.checked) {
    text.classList.add("strike-through");
  } else {
    text.classList.remove("strike-through");
  }
}

render();
