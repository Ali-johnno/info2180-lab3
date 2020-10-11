"use strict";
document.addEventListener("DOMContentLoaded", function(){ 
    var divs = document.getElementById("board");
    for (var i=0; i<9; i++){
        divs.getElementsByTagName('div')[i].classList.add("square"); //applies the css square class to the html div children of div id = "board"
    }

    //empty array to check the status of the game.
    //This array will be used to check for winners
    var boardStats = [
        '', '','',
        '', '', '',
        '', '', ''
    ];

    const X_Class = 'X';
    const O_Class = 'O';
    const gridCells = document.querySelector('#board').children;
    const newGame = document.getElementsByClassName('btn');
    var isFull = 0; //checks to see if board is full to determine game draw
    var winner = '';

    var xTurn = X_Class;

    newGame[0].addEventListener('click', startGame, false);
    
    startGame();
    
    //The state of the tic-tac-toe game is set to its original state
    function startGame(){
        setHover();
        winner = '';
        boardStats = [
            '', '','',
            '', '', '',
            '', '', ''
        ];
        xTurn = X_Class;
        isFull = 0;
        for (var i=0; i<gridCells.length;i++){
            gridCells[i].innerHTML = '';
            gridCells[i].classList.remove(X_Class);
            gridCells[i].classList.remove(O_Class);
            gridCells[i].addEventListener('click', handleClick, {once:true});
        }
        document.getElementById("status").classList.remove('you-won');
        document.getElementById("status").innerHTML = "Move your mouse over a square and click to play an X or an O.";
    }
    
    /**
     * when a tic-tac-toe box is presses it sets the hover, places X  or O, switches turns and checks for winner
     * @param {*} e 
     */
    function handleClick(e){
        if (winner == ''){
            const gridCell = e.target;
            const currentClass = xTurn ? X_Class : O_Class;
            placeXoO (gridCell, currentClass);
            isFull ++;
            nextTurn();
            setHover();
            isWinner(currentClass);
        }
    }

    /**
     * The class X or O is placed respectively in the boxes
     * The array index of the box the user clicks and the class is stored into the same index of the board status array 
     */
    function placeXoO(gridCell,currentClass){
        var squareIndexes = Array.prototype.slice.call(gridCells); 
        var squareIndex = squareIndexes.indexOf(gridCell);
        if (currentClass == X_Class){
            gridCell.innerHTML = 'X';
            boardStats[squareIndex] = 'X';
        } else {
            gridCell.innerHTML = 'O';
            boardStats[squareIndex] = 'O';
        }
        gridCell.classList.add(currentClass);
    }

    /**
     * Swaps turns for classes X or O
     */
    function nextTurn (){
        xTurn = !xTurn;
    }

    /**
     * Sets a hover whenever the mouse is over a tic-tac-toe box
     */
    function setHover(){
        for (var i=0; i<gridCells.length;i++){
            gridCells[i].addEventListener("mouseover", hover);
            gridCells[i].addEventListener("mouseout", hoverFalse);
        }
    }

    /**
     * Adds hover class to the cell that the mouse is over
     */
    function hover(e){
        e.target.classList.add('hover');
    }

    /**
     * removes hover when the mouse is no longer over that cell
     */
    function hoverFalse(e){
        const targ = e.target;
        targ.classList.remove("hover");
        /*targ.classList.add("square");*/
    }

   /**
    * The possible winning combination indexes are checked to see if they have the same class
    * If they do the current player is determined the winner
    * @param {*} currentClass 
    */
    function isWinner(currentClass){
        if (boardStats[0] == 'X' && boardStats[1] == 'X' && boardStats[2] == 'X' || boardStats[0] == 'O'&& boardStats[1] == 'O' && boardStats[2] == 'O'){
            winner = currentClass;
        } else if (boardStats[3] == 'X' && boardStats[4] == 'X' && boardStats[5] == 'X' || boardStats[3] == 'O' && boardStats[4] == 'O' && boardStats[5] == 'O'){
            winner = currentClass;
        } else if (boardStats[6] == 'X' && boardStats[7] == 'X' && boardStats[8] == 'X' || boardStats[6] == 'O' && boardStats[7] == 'O' && boardStats[8] == 'O'){
            winner = currentClass;
        } else if (boardStats[0] == 'X' && boardStats[3] == 'X' && boardStats[6] == 'X' || boardStats[0] == 'O' && boardStats[3] == 'O' && boardStats[6] == 'O'){
            winner = currentClass;
        } else if (boardStats[1] == 'X' && boardStats[4] == 'X' && boardStats[7] == 'X' || boardStats[1] == 'O' && boardStats[4] == 'O' && boardStats[7] == 'O'){
            winner = currentClass;
        } else if (boardStats[2] == 'X' && boardStats[5] == 'X' && boardStats[8] == 'X' || boardStats[2] == 'O' && boardStats[5] == 'O' && boardStats[8] == 'O'){
            winner = currentClass;
        } else if (boardStats[0] == 'X' && boardStats[4] == 'X' && boardStats[8] == 'X' || boardStats[0] == 'O' && boardStats[4] == 'O' && boardStats[8] == 'O'){
            winner = currentClass;
        } else if (boardStats[2] == 'X' && boardStats[4] == 'X' && boardStats[6] == 'X' || boardStats[2] == 'O' && boardStats[4] == 'O' &&boardStats[6] == 'O'){
            winner = currentClass;
        } else if (winner = ''){
            return '';
        } else if (isFull == 9){
            winner = "draw";
        }
        setWinnerText(winner);
    }

    /**
     * The Congratulations message is set depending on the winner with "you-won" css class attached to it
     * if there is no winner draw is displayed
     * @param {*} winner 
     */
    function setWinnerText (winner){
        var statusText= document.getElementById("status");

        if (winner == X_Class){
            statusText.classList.add("you-won");
            statusText.innerHTML = "Congratulations! X is the Winner!";
        } else if (winner == O_Class){
            statusText.classList.add("you-won");
            statusText.innerHTML ="Congratulations! O is the Winner!";
        } else if (winner == "draw"){
            statusText.innerHTML = "DRAW";
        }
    }
});

