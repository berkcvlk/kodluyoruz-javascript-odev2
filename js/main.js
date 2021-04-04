/**
 * TODOLIST Main JS
 */

/** Span Delete Function */
function deleteListItem() {
    this.parentNode.remove();
}

/** Toggle List Checked */
function toggleItemChecked() {
    this.classList.toggle("checked");
}

/** Create New Close Span */
function createNewCloseSpan() {
    let closeSpan = document.createElement("span");
    
    /** Add Function & CSS Class */
    closeSpan.classList.add("close");
    closeSpan.innerHTML = "X";
    closeSpan.onclick = deleteListItem;

    return closeSpan;
}

/** Update Local Storage */
function updateLocalStorage(element) {

    /** Get Items From Local Storage */
    let local = localStorage.getItem("todolist") || "[]";
    let newArr = JSON.parse(local);
    let elementText = element.innerText.slice(0, element.innerText.length - 2);

    /** If todoitem is not in the localstorage, add it */
    if (!newArr.includes(elementText)) {
        newArr.push(elementText);
        localStorage.setItem("todolist", JSON.stringify(newArr));
    }
}

/** Add new element to list */
document.querySelector("#addListItem").addEventListener("click", (e) => {

    /** Create a new list item */
    let el = document.createElement("li");
    el.onclick = toggleItemChecked;

    /** Check & Trim the task */
    let elContent = document.querySelector("#task").value.trim();
    if (!elContent) {
        $(".error").toast("show");
        return;
    }

    /** Append Close Span */
    let closeSpan = createNewCloseSpan();

    /** Add All to list item */
    el.append(elContent);
    el.append(closeSpan);

    /** Append new item to the list */
    let list = document.querySelector("#list");
    list.append(el);

    /** After Addition - Clean Input Field */
    document.querySelector("#task").value = "";
    $(".success").toast("show");

    updateLocalStorage(el);
});

let list = Array.from(document.querySelectorAll("li"));
let local = JSON.parse(localStorage.getItem("todolist")) || [];

list.forEach(function(el) {

    /** Add toggle functionalty to the list item */
    el.onclick = toggleItemChecked;
    
    /** Create new close span for list item */
    let closeSpan = createNewCloseSpan();
    el.append(closeSpan);

    /** Update the local storage with list that get from DOM */
    updateLocalStorage(el);
});

