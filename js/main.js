// Dom================= //
const startButton = document.querySelector(".open-lift-btn");
const liftContainer = document.querySelector(".lift-container");
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");
let butt = Array.from(document.querySelectorAll(".floor button"));
let nom_T = document.querySelector(".screen span");
let reset = document.querySelector(".btn-2");
let stepss = document.querySelector(".stepss");
let i = 0;
let f = [];

//afficher
document.addEventListener("DOMContentLoaded", function () {
    butt.forEach((e, i) => {
        e.addEventListener("click", function () {
            nom_T.textContent += " R" + i;

            switch (i) {
                case 0:
                    f.push(0);
                    break;
                case 1:
                    f.push(-110);
                    break;
                case 2:
                    f.push(-230);
                    break;
                case 3:
                    f.push(-340);
                    break;
                case 4:
                    f.push(-455);
                    break;
                default:
                    break;
            }
            console.log(f);
        });
    });
});

//effacer
reset.onclick = function () {
    nom_T.textContent = "";
    f[0] = 0;
    aw();
    i = 0;
    startButton.disabled = false;
    f.length = 0;
    updateSteps(i); // Update steps display
}

function openLiftDoors() {
    leftDoor.classList.add("left-door-open");
    rightDoor.classList.add("right-door-open");
    leftDoor.classList.remove("left-door-close");
    rightDoor.classList.remove("right-door-close");
}

function ferme_dors() {
    leftDoor.classList.add("left-door-close");
    rightDoor.classList.add("right-door-close");
    leftDoor.classList.remove("left-door-open");
    rightDoor.classList.remove("right-door-open");
}

let doorsClosed = true; // close

function openLi() {
    //animation
    const animation = [
        { transform: `translateY(${i}%)` }, // Initial 
        { transform: `translateY(${f[0]}%)` } // Final 
    ];

    const options = {
        duration: 2000, // ms
        easing: 'ease-in-out', // Easing function
        fill: 'forwards' // lfinal position
    };

    // Apply animation to left door
    liftContainer.animate(animation, options);
    i = f[0]; // Update the current position
    updateSteps(i); // Update steps display

    doorsClosed = false;
}

// Event listener
leftDoor.addEventListener("animationend", function () {
    doorsClosed = true;
});

rightDoor.addEventListener("animationend", function () {
    doorsClosed = true;
});

openLiftDoors()

startButton.onclick = function () {
    aw();
    startButton.disabled = true;
}

function aw() {
    ferme_dors();
    setTimeout(() => {
        openLi();
        console.log(f[0]);

        setTimeout(() => {
            openLiftDoors();
            setTimeout(() => {
                i = f[0];
                f.shift();
                if (f.length > 0) {
                    aw();
                }
            }, 4000);
        }, 4000);
    }, 3000);
}

// Update steps display
function updateSteps(offset) {
    const floorNumber = Math.round(-offset / 110); // Convert offset to floor number
    stepss.textContent = floorNumber;
}

