document.body.innerHTML+='<h1 id="header" class="text-center m-5">The Monty Hall Problem</h1>';
document.body.innerHTML+='<div id="description"><p class="m-4">You are on a game show.  The shows host, Monty Hall, presents you with three doors.  He explains that behind one of the doors is a brand new car. Behind each of the other two doors is a goat.<br>You may pick any of the three doors.  After you choose, Monty will inspect the two remaining doors, and then open one of them to reveal a goat.  He will then give you the choice to either stick with your original choice, or switch to the unopened door.</p><h3 class="text-center">The objective</h3><p class="m-4">While the objective of the game show contestant is to win a new car, the objective for you, as an inquisitive mind, is to use logic and reasoning to determine the best strategy for the contestant.  Are your odds best if you stay or switch, or does it make a difference?  <br><b>Determine the strategy ("stay", or "switch") that gives the contestant higher statistical odds of selecting the car on their second choice, or confirm that there is no statistical difference between the strategies.</b><br>The best way to excercise your mind is to work out the problem in your head or on paper using math, but heres a simulator for the impatient:</p><h2 id="subheader" class="text-center mt-5">Probability Simulator</h2></div>';
document.body.innerHTML+=`<div class="container-fluid" id="simulator"></div>`;
document.body.innerHTML+='<div class="container-fluid px-5"><h2 class="text-center mt-3">Stats</h2><h4 class="text-center">-<br>Stay: <span id="stay"></span><br>Switch: <span id="switch"></span><br>-</h4></div>';

let blue = 'btn-primary';
let yellow = 'btn-warning';
let turq = 'btn-info';
let red = 'btn-danger';
let green = 'btn-success';

let door1color = blue;
let door2color = blue;
let door3color = blue;

let door1text = 'Door 1';
let door2text = 'Door 2';
let door3text = 'Door 3';
let promptText = 'Pick a door!';

function simulatorRender(){
    document.querySelector('#simulator').innerHTML = (`
        <div id="prompt-box" class="text-center">${promptText}</div><div class="d-flex mx-auto justify-content-center"><button id="door-1" class="btn ${door1color} mx-3">${door1text}</button><button id="door-2" class="btn ${door2color}  mx-3">${door2text}</button><button id="door-3" class="btn ${door3color} mx-3">${door3text}</button></div>
    `)
    document.querySelector('#door-1').addEventListener("click", function () {
        if(!choice1){
            choice1 = doors[0];
            door1text = "First choice";
            door1color = turq;
            setTimeout(() => revealer(), 500) 
        } else {
            choice2 = doors[0];
            finalSelection();
        }
        play()
    });
    document.querySelector('#door-2').addEventListener('click', function(){
        if(!choice1){
            choice1 = doors[1];
            door2text = "First choice";
            door2color = turq;
            setTimeout(() => revealer(), 500)
        } else {
            choice2 = doors[1];
            finalSelection();
        }
        play()
    });
    document.querySelector('#door-3').addEventListener('click', function(){
        if(!choice1){
            choice1 = doors[2];
            door3text = "First choice";
            door3color = turq;
            setTimeout(() => revealer(), 500)
        } else {
            choice2 = doors[2];
            finalSelection();
        }
        play()
    });
}

simulatorRender();

let door = [];
let doors = ['door 1','door 2','door 3'];
let unopened = [];
let reveal;
let choice1;
let choice2;
let win = false;

let stays = 0;
let switches = 0;
let stayWins = 0;
let switchWins = 0;

let stay = document.querySelector('#stay');
let change = document.querySelector('#switch');

function random(){
    let random = Math.floor(Math.random()*3+1);
    
    switch (random) {
        case 1:
            door=['car','goat','goat']
            break;
        case 2:
            door=['goat','car','goat']
            break;
        case 3:
            door=['goat','goat','car']
            break;
        default:
            break;
    }
}
random();

function revealer(){
        switch (choice1) {
            case "door 1":
                unopened = [doors[1],doors[2],door[1],door[2]];
                break;
            case "door 2":
                unopened = [doors[0],doors[2],door[0],door[2]];
                break;
            case "door 3":
                unopened = [doors[0],doors[1],door[0],door[1]];
                break;
            default:
                break;
        }

        let chance = Math.floor(Math.random()+2);

        if(unopened[chance]==="goat"){
            reveal = unopened[chance-2]
        } else {
            switch (chance) {
                case 2:
                    reveal = unopened[1];
                    break;
                case 3:
                    reveal = unopened[0];
                    break;
            
                default:
                    break;
            }
        }

        switch (reveal) {
            case "door 1":
                door1text = "Goat!";
                door1color = yellow;
                (choice1=="door 2") ? (door2text="Stay",door3text="Switch") : (door3text="Stay",door2text="Switch");
                break;
            case "door 2":
                door2text = "Goat!";
                door2color = yellow;
                (choice1=="door 1") ? (door1text="Stay",door3text="Switch") : (door3text="Stay",door1text="Switch");
                break;
            case "door 3":
                door3text = "Goat!";
                door3color = yellow;
                (choice1=="door 1") ? (door1text="Stay",door2text="Switch") : (door2text="Stay",door1text="Switch");
                break;
            default:
                break;
        }
        simulatorRender();
}

function finalSelection(){
    switch (choice2) {
        case "door 1":
            (door[0]==="car") ? (promptText="<h4>YOU FOUND THE CAR!!! You won!</h4>", win = true, door1color = green, door1text = "Car") : (promptText="<h4>You got a goat. Try again!</h4>", door1color = red, door1text = "Goat");
                break;
        case "door 2":
            (door[1]==="car") ? (promptText="<h4>YOU FOUND THE CAR!!! You won!</h4>", win = true, door2color = green, door2text = "Car") : (promptText="<h4>You got a goat. Try again!</h4>", door2color = red, door2text = "Goat");
                break;
        case "door 3":
            (door[2]==="car") ? (promptText="<h4>YOU FOUND THE CAR!!! You won!</h4>", win = true, door3color = green, door3text = "Car") : (promptText="<h4>You got a goat. Try again!</h4>", door3color = red, door3text = "Goat");
                break;
        default:
                break;
    }
}

function reset(){
    door1text = "Door 1";
    door2text = "Door 2";
    door3text = "Door 3";
    door1color = blue;
    door2color = blue;
    door3color = blue;
    random();
    unopened = [];
    choice1 = "";
    choice2 = "";
    reveal = "";
    simulatorRender();
    play();
}

function stats(){
    if (choice1==choice2){
        stays+=1;
        win ? (stayWins+=1, win = false) : win = false;
        stay.innerHTML = Math.floor((stayWins/stays)*100)+'% of '+stays;
    } else {
        switches+=1;
        win ? (switchWins+=1, win = false) : win = false;
        change.innerHTML = Math.floor((switchWins/switches)*100)+'% of '+switches;
    }
    reset();
}

function play(){
    if(!choice1){
        promptText="<h4>Pick a door!</h4>"
    } else if (!choice2){
        promptText=`<h4>You picked ${choice1}. A goat has been revealed from the remaining options. <b>Stay</b>, or <b>switch?</b></h4>`
    } else if (choice1&&choice2){
        setTimeout(() => stats(), 1500)
    }
    simulatorRender();
};

play();