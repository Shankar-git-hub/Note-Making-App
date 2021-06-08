console.log("This is app.js");

let addBtn = document.getElementById("addBtn");

const getLocalStorage = () => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    noteObj = [];
  } else {
    noteObj = JSON.parse(notes);
  }
};

addBtn.addEventListener("click", (e) => {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  getLocalStorage();
  let valueObj = {
    title: addTitle.value,
    text: addTxt.value,
  };
  noteObj.push(valueObj);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// Function to add notes

const showNotes = function () {
  getLocalStorage();
  let htmlEl = "";
  noteObj.forEach((element, index) => {
    htmlEl += `   <div class="noteCard my-3 mx-3 card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title"> ${element.title}</h5>
      <p class="card-text">${element.text}</p>
      <Button id="${index}" onClick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</Button>
    </div>
  </div> `;
  });
  let notesEl = document.getElementById("notes");
  if (noteObj.length != 0) {
    notesEl.innerHTML = htmlEl;
  } else {
    notesEl.innerHTML = `<b>Nothing to Show , Use "add note" option to add notes.<b/>`;
  }
};
showNotes();

// Function to delete a note at a time
function deleteNote(index) {
  getLocalStorage();
  noteObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(noteObj));
  showNotes();
}
let search = document.getElementById("search");
search.addEventListener("input", () => {
  searchVal = search.value.toLowerCase();
  let noteCard = document.getElementsByClassName("noteCard");
  Array.from(noteCard).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(searchVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// Further fucntionality to be added in future : -
// Add title
// Mark a note as important
// Separate notes by user
// sync and host to web server
