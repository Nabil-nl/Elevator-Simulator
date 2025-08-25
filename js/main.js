// Dom ================= //
const startButton = document.querySelector(".open-lift-btn");
const liftContainer = document.querySelector(".lift-container");
const leftDoor = document.querySelector(".left-door");
const rightDoor = document.querySelector(".right-door");
let butt = Array.from(document.querySelectorAll(".floor button"));
let nom_T = document.querySelector(".screen span:last-child"); // calls
let reset = document.querySelector(".btn-2");
let stepss = document.querySelector(".stepss");

let i = 0;       
let f = [];     

// afficher (buttons)
document.addEventListener("DOMContentLoaded", function () {
  butt.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      nom_T.textContent += " R" + index;

      switch (index) {
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
      }
      console.log("Queue:", f);
    });
  });
});

// effacer
reset.onclick = function () {
  nom_T.textContent = "";
  f.length = 0;
  i = 0;
  updateSteps(i);
  startButton.disabled = false;
  openLiftDoors(); 
};

// =============== Doors =============== //
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

// =============== Lift Move =============== //
function moveLift() {
  if (!f.length) return;

  const animation = [
    { transform: `translateY(${i}%)` },
    { transform: `translateY(${f[0]}%)` }
  ];

  const options = {
    duration: 2000,
    easing: "ease-in-out",
    fill: "forwards"
  };

  liftContainer.animate(animation, options);
  i = f[0]; // update current position
  updateSteps(i);
}

// helper: wait
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// main queue processor
async function processQueue() {
  while (f.length > 0) {
    ferme_dors();
    await wait(2000);

    moveLift();
    await wait(2000);

    openLiftDoors();
    await wait(3000);

    f.shift(); // remove processed floor
  }

  startButton.disabled = false; // enable button again
}

// start
startButton.onclick = function () {
  if (f.length > 0) {
    processQueue();
    startButton.disabled = true;
  }
};

// =============== Update Steps =============== //
function updateSteps(offset) {
  const floorMap = {
    "0": 0,
    "-110": 1,
    "-230": 2,
    "-340": 3,
    "-455": 4
  };
  stepss.textContent = floorMap[offset.toString()] ?? "?";
}
