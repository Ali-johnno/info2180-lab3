document.addEventListener("DOMContentLoaded", function(){
    var divs = document.getElementById("board");
    for (var i=0; i<9; i++){
        divs.getElementsByTagName('div')[i].classList.add("square");
    }

    boardStats = [
        '', '','',
        '', '', '',
        '', '', ''
    ];

    const X_Class = 'X';
    const O_Class = 'O';
    const gridCells = document.querySelector('#board').children;
    var index = 0;

    xTurn = X_Class;

    for (var i=0; i<gridCells.length;i++){
        gridCells[i].addEventListener('click', handleClick, {once:true});
    }

    function handleClick(e){
        const gridCell = e.target;
        const currentClass = xTurn ? X_Class : O_Class;
        placeXoO (gridCell, currentClass);
        index ++;
        nextTurn();
        setHover();
    }

    function placeXoO(gridCell,currentClass){
        if (currentClass == X_Class){
            gridCell.innerHTML = 'X';
            boardStats[index] = 'X';
        } else {
            gridCell.innerHTML = 'O';
            boardStats[index] = 'O';
        }
        gridCell.classList.add(currentClass);
    }

    function nextTurn (){
        xTurn = !xTurn;
    }

    function setHover(){
        for (var i=0; i<gridCells.length;i++){
            gridCells[i].addEventListener("mouseover", hover);
            gridCells[i].addEventListener("mouseout", hoverFalse);
        }
    }

    function hover(e){
        e.target.classList.add('hover');
    }

    function hoverFalse(e){
        const targ = e.target;
        targ.classList.remove("hover");
        targ.classList.add("square");
    }
});

