//runs with onload
function start(mines) {
    //fixes default value issue
    if (mines === undefined) {
        mines = 3;
    }
    var gameInstance = new Model();
    var grid = document.getElementById("grid");
    grid.innerHTML = generateGrid(5, 5, mines, gameInstance);
    var cells = document.getElementsByTagName("td");
    for (var i=0; i<cells.length; i++) {
        cells[i].onclick = function() {
            var num = this.id;
            update(num, gameInstance);
        }
        cells[i].oncontextmenu = function() {
            var num = this.id;
            doubleUpdate(num, gameInstance);

            //stops the menu from popping up
            return false;
        }
    }

    //displays user info from local storage
    displayUserInfo("filler", false);
}

//
//generates initial grid
//
function generateGrid(r, c, m, gI) {
    //rows, colums, number of mines, game instance
    var data = gI.startGame(m);
    var counter = 0;
    //main string to return
    html = "";
    html += "<table>";
    //main nested loop for the grid
    for (i=0; i<r; i++) {
        html += "<tr>";
        for (j=0; j<c; j++) {
                html += "<td class=\"startColor\" id=\"" + counter + "\"> <p></p> </td>";
            counter++;
        }
        html += "</tr>";
    }
    html += "</table>";
    return html;
}

//
//runs everytime a cell is clicked
//
function update(cell, gI) {
    var square = document.getElementById(cell);
    var alreadyClicked = gI.getClicked(cell);
    var info = gI.clicked(cell);

    //updates cell coordinates
    var column = (cell % 5 + 1);
    var row = Math.floor(cell / 5 + 1);
    var coord = document.getElementById("coordinates");
    coord.innerHTML = "<p>Row: " + row + ", Column: " + column + "</p>";

    //updates grid
    if (info === -1) {
        var body = document.getElementById("grid");
        body.innerHTML = "<h1>GAME OVER</h1>";
    } else if (info === 0) {
        square.innerHTML = "<td class=\"clickedColor\" id=\"" + cell + "\"> <p class=\"transition\">0</p> </td>";
        if (!alreadyClicked) {gI.changeWinCounter();}
    } else {
        square.innerHTML = "<td class=\"clickedColor\" id=\"" + cell + "\"> <p class=\"transition\">" + info + "</p> </td>";
        if (!alreadyClicked) {gI.changeWinCounter();}
    }

    //checks if the user has won
    var wc = gI.getWinCounter();
    if (wc == 0) {
        var body = document.getElementById("grid");
        body.innerHTML = "<h1>YOU WON</h1>";
    }
}

//
//runs everytime a cell is doubleclicked
//
function doubleUpdate(cell, gI) {
    var square = document.getElementById(cell);
    var info = gI.flagged(cell);

    //checks if the flagged square is a mine
    if (info == 0) {
        square.innerHTML = "<td class=\"clickedColor\" id=\"" + cell + "\"> <p class=\"transition\">F</p> </td>";
    } else if (info == 1) {
        //do nothing haha
    } else if (info == 2) {
        square.innerHTML = "<td class=\"clickedColor\" id=\"" + cell + "\"> <p class=\"transition\"></p> </td>";
    }

    var mineFlagged = gI.getMine(cell);
    if (mineFlagged) {
        gI.changeWinCounter();
    }
}

// ---
// OPTION FUNCTIONS
// ---

//used to change the user's name if they change it
function displayTB() {
    var a = document.getElementById("textbox");
    alert ("Hello, " + a.value);
    displayUserInfo(a.value, true);
}

//can change the number of mines in the game (easy, med, hard)
function displayD() {
    //constants that decide the number of mines (defaults to three)
    const EASY = 3;
    const MEDIUM = 5;
    const HARD = 7;

    var a = document.getElementById("difficulty");
    var text = a.options[a.selectedIndex].text;
    alert ("You have selected " + text + ".");
    if (a.options[a.selectedIndex].value === "easy") {
        start(EASY);
    } else if (a.options[a.selectedIndex].value === "medium") {
        start(MEDIUM);
    } else if (a.options[a.selectedIndex].value === "hard") {
        start(HARD);
    }
}

//displays the users name (change is a bool to see if the user's name as changed)
function displayUserInfo(name, change) {
    var u = localStorage.getItem("cs2550timestamp");
    var dis = document.getElementById("userInfo");
    if (u != null) {
        if (change === false) { name = u.substr(0,u.indexOf(' ')); }
        var time = u.substr(u.indexOf(' ')+1);
        dis.innerHTML = "<p> Welcome " + name + "! You logged in at: " + time + "</p>";
    }
    else if (u === null) {
        dis.innerHTML = "<p>No user information found</p>";
    }
}

//clears local storage (name and time)
function clearStorage() {
    localStorage.clear();
    displayUserInfo("filler", false);
}