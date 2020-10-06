document.addEventListener("DOMContentLoaded", function(){
    var divs = document.getElementById("board");
    for (var i=0; i<9; i++){
        divs.getElementsByTagName('div')[i].classList.add("square");
    }
});