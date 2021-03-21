function showInput() {
    document.getElementById('display').innerHTML = 
        document.getElementById("display").value;
}

function myFunction() {
    document.write("Your code is " + ID);
}

//Generates random unique code to Join/Create Interactive Session
var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};
