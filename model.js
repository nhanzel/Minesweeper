function Model () {
    this.grid = [];
    this.winCounter = 25;
    //Square Constructor
    this.Square = function (c) {
    this.mine = false;
    this.number = 0;
    this.clicked = false;
    this.flagged = false;
    this.index = c;
    this.id = 0;
    }

//A future parameter will be the size of the grid, but for this example we are doing
//a 5 by 5 grid and only three mines
this.startGame = function (mines) {
    this.grid = [];
    var counter = 0;
    //make the original grid
    for (var i=0; i < 25; i++) {
        var gameSquare = new this.Square (counter);
        this.grid[counter] = gameSquare;
        this.grid[counter].id = counter;
        counter++;
    }

    //places the mines
    for (var i=0; i < mines; i++) {
        var mineGrid = Math.floor(Math.random() * 25);
        if (this.grid[mineGrid].mine === false) {
            this.grid[mineGrid].mine = true;
        } else {
            //ensures no duplicates
            i--;
        }
    }
   //checks for adjacent mines
    counter = 0;
    var numMines = 0;
   for (var i=0; i < 25; i++) {
    var neighbors = {
        lt: true,
        t: true,
        rt: true,
        l: true,
        r: true,
        lb: true,
        b: true,
        rb: true
    }
    //checks for edge cases
    if (counter < 5) {
        neighbors.lt = false;
        neighbors.t = false;
        neighbors.rt = false;
    }
    if (counter > 19) {
        neighbors.lb = false;
        neighbors.b = false;
        neighbors.rb = false;
    }
    if (counter % 5 === 0) {
        neighbors.lt = false;
        neighbors.l = false;
        neighbors.lb = false;
    }
    if (counter % 5 === 4) {
        neighbors.rt = false;
        neighbors.r = false;
        neighbors.rb = false;
    }

    //update the number if applicable
    numMines = 0;
    if (neighbors.lt) {
        if (this.grid[counter - 6].mine === true) {numMines++;}
    }
    if (neighbors.t) {
        if (this.grid[counter - 5].mine === true) {numMines++;}
    }
    if (neighbors.rt) {
        if (this.grid[counter - 4].mine === true) {numMines++;}
    }
    if (neighbors.l) {
        if (this.grid[counter - 1].mine === true) {numMines++;}
    }
    if (neighbors.r) {
        if (this.grid[counter + 1].mine === true) {numMines++;}
    }
    if (neighbors.lb) {
        if (this.grid[counter + 4].mine === true) {numMines++;}
    }
    if (neighbors.b) {
        if (this.grid[counter + 5].mine === true) {numMines++;}
    }
    if (neighbors.rb) {
        if (this.grid[counter + 6].mine === true) {numMines++;}
    }
    this.grid[counter].number = numMines;
    counter++;
    }
    for (var i=0; i<25; i++) {
        if (this.grid[i].mine === true) {this.grid[i].number = -1;}
    }
    return this.grid;
}

//update information for clicked mines
this.clicked = function(c) {
    this.grid[c].clicked = true;
    if (this.grid[c].mine === true) {return -1;}
    else return this.grid[c].number;
}

this.flagged = function(c) {

    //return 0 if not flagged and not clicked
    //return 1 if not flagged and clicked
    //return 2 if flagged

    if (this.grid[c].flagged == false && this.grid[c].clicked == false) {
        this.grid[c].flagged = true;
        return 0;
    } else if (this.grid[c].flagged == false && this.grid[c].clicked == true){
        return 1;
    } else if (this.grid[c].flagged == true) {
        this.grid[c].flagged = false;
        return 2;
    }

}

this.getMine = function(c) {
    return this.grid[c].mine;
}
//
//information to see if the player has won the game
//
this.changeWinCounter = function() {
    this.winCounter--;
    if (this.winCounter < 0) {
        this.winCounter = 0;
    }
}

this.getWinCounter = function() {
    return this.winCounter;
}

this.getClicked = function(c) {
    return this.grid[c].clicked;
}
}
