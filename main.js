let blue = 'btn-primary';
let yellow = 'btn-warning';
let turq = 'btn-info';
let red = 'btn-danger';
let green = 'btn-success';

let unpicked = [];
let reveal;
let remaining;
let choice1;
let choice2;
let promptText;
let stay = "";
let change = "";
let total = "";
let win = false;
let stays = 0;
let switches = 0;
let stayWins = 0;
let switchWins = 0;

class Door {
    constructor(name, value, text, color){
        this.name = name;
        this.value = value;
        this.text = text;
        this.color = color;
    }
}

let door1 = new Door("door 1", "", "Door 1", blue)
let door2 = new Door("door 2", "", "Door 2", blue)
let door3 = new Door("door 3", "", "Door 3", blue)

document.body.innerHTML+=`<h1 id="header" class="text-center text-dark mt-5">The Monty Hall Problem</h1><h6 class="text-center text-secondary mb-5">Original copy and simulator by Zachary Bright, <a href="https://github.com/zbbright">GitHub</a> || <a href="https://zbbright.github.io/portfolio">Portfolio</a></h6>`;
document.body.innerHTML+=`<div id="description"><p class="m-4">You are on a game show.  The shows host, Monty Hall, presents you with three doors.  He explains that behind one of the doors is a brand new car. Behind each of the other two doors is a goat.<br>You may pick any of the three doors.  After you choose, Monty will inspect the two remaining doors, and then open one of them to reveal a goat.  He will then give you the choice to either stick with your original choice, or switch to the unopened door.</p><h3 class="text-dark text-center mt-5">The Objective</h3><p class="m-4">While the objective of the game show contestant is to win a new car, the objective for you, as an inquisitive mind, is to use logic and reasoning to determine the best strategy for the contestant.  Are your odds best if you stay or switch, or does it make a difference?  <br><b>Determine the strategy ("stay", or "switch") that gives the contestant higher statistical odds of selecting the car on their second choice, or confirm that there is no statistical difference between the strategies.</b><br>The best way to excercise your mind is to work out the problem in your head or on paper using math, but here's a simulator for the impatient. Bear in mind: more trials = more meaningful stats.</p><h2 id="subheader" class="text-center text-dark mt-5">Probability Simulator</h2></div>`;
document.body.innerHTML+=`<div class="container-fluid" id="simulator"></div><div id="stats" class="container px-5"><h2 class="text-center text-dark my-3">Stats</h2><h5 class="text-center border rounded shadow p-3 mb-5"><div id="stat-box"><b>Stay:</b> ${stay}<br><b>Switch:</b> ${change}<br><b>Total:</b> ${total}</div><br><button id="auto" class="btn btn-sm btn-dark text-warning m-2"><b>AUTO-PLAY</b></button><button id="auto-1000" class="btn btn-sm btn-dark text-danger m-2"><b>FAST STATS</b></button></h5></div><h6 class="mt-5 p-1 bg-dark text-light text-center">Check out my other projects on <a href="https://github.com/zbbright">GitHub,</a> or take a look at my <a href="https://zbbright.github.io/portfolio">portfolio</a>!</h6>`;

function hideCar(){
    let random = Math.floor(Math.random()*3+1);
    door1.value = "Goat";
    door2.value = "Goat";
    door3.value = "Goat";
    switch (random) {
        case 1:
            door1.value = "Car";
            break;
        case 2:
            door2.value = "Car";
            break;
        case 3:
            door3.value = "Car";
            break;
        default:
            break;
    }
}

function revealGoat(){
        switch (choice1) {
            case door1:
                unpicked = [door2,door3];
                break;
            case door2:
                unpicked = [door1,door3];
                break;
            case door3:
                unpicked = [door1,door2];
                break;
            default:
                break;
        }
        let chance = Math.round(Math.random());
        if(unpicked[chance].value==="Goat"){
            reveal = unpicked[chance];
            (!chance)?(remaining=unpicked[1]):(remaining=unpicked[0])
        } else {
            switch (chance) {
                case 0:
                    reveal = unpicked[1];
                    remaining = unpicked[0];
                    break;
                case 1:
                    reveal = unpicked[0];
                    remaining = unpicked[1];
                    break;
                default:
                    break;
            }
        }
        reveal.text = "Goat!";
        reveal.color = yellow;
        choice1.text="Stay";
        remaining.text="Switch";
        simulatorRender();
}

function selectDoor(target, timer1, timer2){
    if(target){
        if(!choice1){
            choice1 = target;
            target.text = "First choice";
            target.color = turq;
            setTimeout(() => revealGoat(), timer1);
        } else if((!choice2)&&reveal&&(target!==reveal)){
            choice2 = target;
            (choice2.value==="Car") ? (promptText="YOU FOUND THE CAR!!! You won!", win = true, choice2.color = green) : (promptText="You got a goat. Try again!", choice2.color = red);
            door1.text=String(door1.value);
            door2.text=String(door2.value);
            door3.text=String(door3.value);
            (choice1==choice2)?(stays+=1,(win?(stayWins+=1, win = false):win=false),stay=Math.round((stayWins/stays)*100)+'% of '+stays):(switches+=1,(win ? (switchWins+=1, win = false) : win = false),change = Math.round((switchWins/switches)*100)+'% of '+switches);
            total = `${Math.round(((stayWins+switchWins)/(stays+switches))*100)}% of ${stays+switches}<br><b>Stay/Switch:</b> ${Math.round((stays/(stays+switches))*100)}/${Math.round((switches/(switches+stays))*100)}`;
            document.querySelector('#stat-box').innerHTML = (`<b>Stay:</b> ${stay}<br><b>Switch:</b> ${change}<br><b>Total:</b> ${total}`);
            setTimeout(() => reset(), timer2)
        }
    }
    if(!choice1){
        promptText="Pick a door!"
    } else if (!choice2){
        promptText=`You picked ${choice1.name}. A goat has been revealed from the remaining options. <b>Stay</b>, or <b>switch?</b>`
    }
    simulatorRender();
}

function reset(){
    door1.text = "Door 1";
    door2.text = "Door 2";
    door3.text = "Door 3";
    door1.color = blue;
    door2.color = blue;
    door3.color = blue;
    hideCar();
    unpicked = [];
    choice1 = "";
    choice2 = "";
    reveal = "";
    remaining = "";
    simulatorRender();
    selectDoor()
}

let options = [];
let autoCounter = 0;
let autoLimit = 0;
let timing = [];
let simDisplayOff = false;

function randomSelection(timer1,timer2,timer3){
    (!choice1)?(options=[door1,door2,door3]):(options=[choice1,remaining]);
    let random = options[Math.floor(Math.random()*options.length)];
    selectDoor(random,timer1,timer2);
    autoCounter++;
    setTimeout(() => auto(timing[0],timing[1],timing[2]), timer3);
}

function auto(timer1,timer2,timer3){
    if(autoCounter<(autoLimit*2)){
        randomSelection(timer1,timer2,timer3);
    } else {
        simDisplayOff = false;
        simulatorRender()
    }
}

document.querySelector('#auto').addEventListener('click', function(){
    autoCounter = 0;
    autoLimit = Number(prompt("How many times should I play? (Enter a number)"));
    timing = [200,400,800];
    auto(timing[0],timing[1],timing[2]);
});
document.querySelector('#auto-1000').addEventListener('click', function(){
    alert("Page will run 1000 simulations.  This will take up to 20 seconds.")
    simDisplayOff = true;
    autoCounter = 0;
    autoLimit = 1000;
    timing = [0,0,0];
    auto(timing[0],timing[1],timing[2]);
});

function simulatorRender(){
    if (simDisplayOff===true){return};
    document.querySelector('#simulator').innerHTML = (`<div class="container d-flex mx-auto my-3 justify-content-around"><button id="door-1" class="flex-fill btn ${door1.color} mx-2 py-4 shadow border-white">${door1.text}</button><button id="door-2" class="flex-fill btn ${door2.color}  mx-2 shadow border-white">${door2.text}</button><button id="door-3" class="flex-fill btn ${door3.color} mx-2 shadow border-white">${door3.text}</button></div><div id="prompt-box" class="container d-flex flex-column justify-content-center"><h6 class="bg-secondary text-white text-center shadow my-3 p-3 border border-warning rounded">${promptText}</h6></div>`);
    document.querySelector('#door-1').addEventListener('click', () => selectDoor(door1, 500, 1500));
    document.querySelector('#door-2').addEventListener('click', () => selectDoor(door2, 500, 1500));
    document.querySelector('#door-3').addEventListener('click', () => selectDoor(door3, 500, 1500));
}

hideCar();
selectDoor();
simulatorRender();