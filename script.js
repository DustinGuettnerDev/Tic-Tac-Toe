let currentPlayer = "";
let amountOfSelections = 0;
let boardRef = document.getElementById("board");
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

let cells = [
    //first row
    [50, 50],
    [150, 50],
    [250, 50],
    //second row
    [50, 150],
    [150, 150],
    [250, 150],
    //third row
    [50, 250],
    [150, 250],
    [250, 250],
];

function init() {
    loadSvgTemplate();
}

function loadSvgTemplate() {
    document.getElementById("circle-player").innerHTML = getCircleTemplate();
    document.getElementById("cross-player").innerHTML = getCrossTemplate();
}

function selectPlayer(event) {
    if (currentPlayer !== "") {
        document.getElementById(currentPlayer).classList.remove("selected"); // remove the "selected" class from the previously selected button
    }
    currentPlayer = event.currentTarget.id; // event.currentTarget is the button that was clicked
    event.currentTarget.classList.add("selected"); // add the "selected" class to the clicked button
    for (let field of fields) {
        field.disabled = false;
        field.style.cursor = "pointer";
    }
}

async function selectField(event) {
    circlePlayerRef.style.pointerEvents = "none";
    crossPlayerRef.style.pointerEvents = "none";
    setSymbol(event);
    amountOfSelections++;
    updateBoard(event);
    if (await check()) {
        return;
    }
    switchPlayer();
}

function setSymbol(event) {
    if (currentPlayer !== "") {
        const field = event.currentTarget;
        if (field.innerHTML === "" && currentPlayer === "circle-player") {
            field.innerHTML = getCircleTemplate();
        } else if (field.innerHTML === "" && currentPlayer === "cross-player") {
            field.innerHTML = getCrossTemplate();
        }
        field.disabled = true;
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
    circlePlayerRef.style.pointerEvents = "auto";
    crossPlayerRef.style.pointerEvents = "auto";
}

function updateBoard(event) {
    let id = event.currentTarget.id;
    id = id.slice(-1); // get the last character of the id, which is the index of the field
    board[id] = currentPlayer; // update the board array with the current player's symbol
    console.log(board);
}

async function check() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            await generateDash(a, c);
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
    let stringArray = string.split("-");
    return firstLetterUpperCase(stringArray[0]) + "-" + firstLetterUpperCase(stringArray[1]);
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateDash(a, c) {
    const tableHeight = 300;
    const tableWidth = 300;

    let xy1 = cells[a];
    let xy2 = cells[c];

    boardRef.innerHTML += getTemplateDash(xy1, xy2, tableHeight, tableWidth);
    await delay(1000); // wait for 1000 milliseconds before proceeding
    boardRef.querySelector(".dash").remove();
}
