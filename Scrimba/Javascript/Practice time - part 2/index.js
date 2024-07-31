let person = {
  name: "Bhoomi",
  age: 28,
  country: "Canada",
};

function logData() {
  console.log(
    person.name +
      " is " +
      person.age +
      " years old and lives in " +
      person.country
  );
}

logData();

//////////////////////////////////////////////////////////////////////////

let age = 15;

if (age < 6) {
  console.log("Free");
} else if (age <= 17) {
  console.log("Child Discount");
} else if (age <= 26) {
  console.log("Student Discount");
} else if (age <= 66) {
  console.log("Full Price");
} else {
  console.log("Senior Citizen Discount");
}

///////////////////////////////////////////////////////////////////////////

let largeCountries = ["China", "India", "USA", "Indonesia", "Pakistan"];

for (i = 0; i < largeCountries.length; i++) {
  console.log("- " + largeCountries[i]);
}

/////////////////////////////////////////////////////////////////////////

largeCountries = ["Tuvalu", "India", "USA", "Indonesia", "Monaco"];

largeCountries.shift();
largeCountries.unshift("China");

largeCountries.pop();
largeCountries.push("Pakistan");

console.log(largeCountries);

////////////////////////////////////////////////////////////////////////

let dayOfMonth = 31;
let weekday = "Friday";

if (dayOfMonth === 13 && weekday === "Friday") {
  console.log("😱");
}

///////////////////////////////////////////////////////////////////////

let hands = ["rocks", "paper", "scissor"];

function getHand() {
  let randomIndex = Math.floor(Math.random() * 3);
  return hands[randomIndex];
}

console.log(getHand());

////////////////////////////////////////////////////////////////////////

let fighters = [
  "🐉",
  "🐥",
  "🐊",
  "💩",
  "🦍",
  "🐢",
  "🐩",
  "🦭",
  "🦀",
  "🐝",
  "🤖",
  "🐘",
  "🐸",
  "🕷",
  "🐆",
  "🦕",
  "🦁",
];

let stageEl = document.getElementById("stage");
let fightButton = document.getElementById("fightButton");

fightButton.addEventListener("click", function () {
  let fighter1Index = Math.floor(Math.random() * fighters.length);
  let fighter2Index = Math.floor(Math.random() * fighters.length);

  stageEl.textContent =
    fighters[fighter1Index] + " vs " + fighters[fighter2Index];
});

///////////////////////////////////////////////////////////////////////

let fruit = ["🍎", "🍊", "🍎", "🍎", "🍊"];
let appleShelf = document.getElementById("apple-shelf");
let orangeShelf = document.getElementById("orange-shelf");

function sortFruit(){
    for (i = 0; i < fruit.length; i++) {
        if (fruit[i] === "🍎") {
          appleShelf.textContent += " 🍎 ";
        } else {
          orangeShelf.textContent += " 🍊 ";
        }
      }
}

sortFruit();
