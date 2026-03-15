let currentPlayer = "";
let amountOfSelections = 0;
let circlePlayerRef = document.getElementById("circle-player");
let crossPlayerRef = document.getElementById("cross-player");
let fields = document.getElementsByClassName("cell");

let board = Array(9).fill(null);
let winConditions = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
];

function init() {
    loadSvgTemplate();
}

function loadSvgTemplate() {
    document.getElementById("circle-player").innerHTML = getCircleTemplate();
    document.getElementById("cross-player").innerHTML = getCrossTemplate();
}

//event.target is the actual element that was clicked (often a child), while event.currentTarget is the element where the event handler is attached (in your case, the button).
function selectPlayer(event) {
    if (currentPlayer != "") {
        document.getElementById(currentPlayer).classList.remove("selected"); // remove the "selected" class from the previously selected button
    }
    currentPlayer = event.currentTarget.id; // event.currentTarget is the button that was clicked
    event.currentTarget.classList.add("selected"); // add the "selected" class to the clicked button
    for (let field of fields) {
        field.disabled = false;
        field.style.cursor = "pointer";
    }
}

function selectField(event) {
    amountOfSelections++;
    setSymbol(event);
    updateBoard(event);
    if (check()) {
        return;
    }
    switchPlayer();
}

function setSymbol(event) {
    if (currentPlayer != "") {
        const field = event.currentTarget; // event.currentTarget is the button that was clicked, its like document.getElementById("field1") but more dynamic because we dont have to specify the id of the field
        if (field.innerHTML === "" && currentPlayer === "circle-player") {
            field.innerHTML = getCircleTemplate();
        } else if (field.innerHTML === "" && currentPlayer === "cross-player") {
            field.innerHTML = getCrossTemplate();
        }
    }
}

function switchPlayer() {
    circlePlayerRef.disabled = true;
    crossPlayerRef.disabled = true;
    switchPlayerString();
    switchVisualSelection(circlePlayerRef, crossPlayerRef);
}

function switchPlayerString() {
    if (currentPlayer === "circle-player") {
        currentPlayer = "cross-player";
    } else {
        currentPlayer = "circle-player";
    }
}

function switchVisualSelection(circlePlayerRef, crossPlayerRef) {
    if (amountOfSelections < 9) {
        circlePlayerRef.classList.toggle("selected");
        crossPlayerRef.classList.toggle("selected");
    } else {
        circlePlayerRef.classList.remove("selected");
        crossPlayerRef.classList.remove("selected");
    }
}

function resetGame() {
    currentPlayer = "";
    amountOfSelections = 0;
    for (let field of fields) {
        field.innerHTML = "";
        field.disabled = true;
        field.style.cursor = "default";
    }
    board = Array(9).fill(null);
    circlePlayerRef.classList.remove("selected");
    crossPlayerRef.classList.remove("selected");
    circlePlayerRef.disabled = false;
    crossPlayerRef.disabled = false;
}

function updateBoard(event) {
    let id = event.currentTarget.id;
    id = id.slice(-1); // get the last character of the id, which is the index of the field
    board[id] = currentPlayer; // update the board array with the current player's symbol
    console.log(board);
}

function check() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            openDialog(`${upperCasePlayer(currentPlayer)} wins !!`);
            resetGame();
            return true; // exit the function after a win is detected
        }
    }

    if (amountOfSelections === 9) {
        openDialog("It's a draw !!");
        resetGame();
        return true; // exit the function after a draw is detected
    }
}

function closeDialog() {
    document.getElementById("tic-tac-toe-dialog").close();
}

function openDialog(message) {
    document.getElementById("match-info").textContent = message;
    document.getElementById("tic-tac-toe-dialog").showModal();
}

function firstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function upperCasePlayer(string) {
    stringArray = string.split("-");
    return firstLetterUpperCase(stringArray[0]) + "-" + firstLetterUpperCase(stringArray[1]);
}
