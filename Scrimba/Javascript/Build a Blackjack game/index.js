// let age = 22;

// if (age < 21) {
//   console.log("You can not enter the club!");
// } else {
//   console.log("Welcome");
// }

// //////////////////////////////////////////////////////////

// age = 100;

// if (age < 100) {
//   console.log("Not eligible");
// } else if (age === 100) {
//   console.log("Here is your birthday card from the king!");
// } else {
//   console.log("Not eligible, you have already gotten one");
// }

// ///////////////////////////////////////////////////////////

// console.log(4 === 3); // false
// console.log(5 > 2); // true
// console.log(12 > 12); // false
// console.log(3 < 0); // false
// console.log(3 >= 3); //  true
// console.log(11 <= 11); // true
// console.log(3 <= 2); // false

// //////////////////////////////////////////////////////////

// let featuredPosts = [
//   "Check out my netflix clone",
//   "Here's the code for my project",
//   "I've just relaunched my portfolio",
// ];

// let experience = [
//   "CEO at Scrimba",
//   "Frontend developer at Xeneta",
//   "People counter for Norstat",
// ];

// console.log(featuredPosts[0]);
// console.log(featuredPosts[1]);
// console.log(featuredPosts[2]);

// console.log(experience[1]);
// console.log(experience[2]);
// console.log(experience[0]);

// console.log(experience.length);
// console.log(featuredPosts.length);

// let information = ["Bhoomi", 28, true];

// let cards1 = [7, 4];
// cards1.push(6);

// let message1 = [
//   "Hey, how's it going?",
//   "I'm great, thank you! How about you?",
//   "All good. Been working on my pordfolio lately.",
// ];

// console.log(message1);
// message1.push("Same here!");
// console.log(message1);

// message1.pop();
// console.log(message1);

// ///////////////////////////////////////////////////////////

// for (let count = 1; count < 11; count++) {
//   console.log(count);
// }

// for (let i = 0; i < 6; i++) {
//   console.log(i);
// }

// for (let count = 10; count <= 100; count += 10) {
//   console.log(count);
// }

// for (i = 0; i < message1.length; i++) {
//   console.log(message1[i]);
// }

// let sentence = ["Hello", "my", "name", "is", "Bhoomi"];
// let greetingEl = document.getElementById("greeting-el");

// for (i = 0; i < sentence.length; i++) {
//   greetingEl.textContent += sentence[i] + " ";
// }

// //////////////////////////////////////////////////////////

// let player1Time = 102;
// let player2Time = 107;

// function getFastestRaceTime() {
//   if (player1Time < player2Time) {
//     return player1Time;
//   } else if (player2Time < player1Time) {
//     return player2Time;
//   } else {
//     return player1Time;
//   }
// }

// let fastestRace = getFastestRaceTime();

// function getTotalRaceTime() {
//   return player1Time + player2Time;
// }

// let totalTime = getTotalRaceTime();

// console.log(totalTime);

// /////////////////////////////////////////////////////////

// function rollDice() {
//   let randomNumber = Math.floor(Math.random() * 6) + 1;
//   return randomNumber;
// }

// console.log(rollDice());

// //////////////////////////////////////////////////////////

// let hasCompletedCourse = true;
// let givesCertificate = true;

// if (hasCompletedCourse === true && givesCertificate === true) {
//   generateCertificate();
// }

// function generateCertificate() {
//   console.log("Generating certificate....");
// }

// let hasSolvedChallenge = false;
// let hasHintsLeft = false;

// if (hasSolvedChallenge === false && hasHintsLeft === false) {
//   showSolution();
// }

// function showSolution() {
//   console.log("Showing the solution....");
// }

// hasCompletedCourse = true;
// givesCertificate = true;

// if (hasCompletedCourse === true || givesCertificate === true) {
//   generateCertificate();
// }

// function generateCertificate() {
//   console.log("Generating certificate....");
// }

// let likesDocumentaries = true;
// let likesStartups = false;

// if (likesDocumentaries === true || likesStartups === true) {
//   recommendMovie();
// }

// function recommendMovie() {
//   console.log("Hey, check out this new film we think you will like!");
// }

// //////////////////////////////////////////////////////////

// let course = {
//   title : "Learn CSS Grid for free",
//   lessons: 16,
//   creator: "Bhoomi Gohil",
//   length : 63,
//   level : 2,
//   isFree : true,
//   tags: ["html", "css"]
// }

// console.log(course.tags);
// console.log(course["tags"])

// //////////////////////////////////////////////////////////

let cards = [],
  sum = 0,
  hasBlackJack = false,
  isAlive = false,
  message = "";

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardEl = document.getElementById("card-el");

let player = {
  name: "Bhoomi",
  chips : 145
}

let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips;

function getRandomCard() {
  let random = Math.floor(Math.random() * 13) + 1;

  if (random === 1) {
    return 11;
  } else if (random > 10) {
    return 10;
  } else {
    return random;
  }
}

function startGame() {
  isAlive = true;
  let firstCard = getRandomCard(),
    secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = cards[0] + cards[1];
  renderGame();
}

function renderGame() {
  if (sum <= 20) {
    message = "Do you want to draw a new card?";
    isAlive = true;
    hasBlackJack = false;
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }
  sumEl.textContent = "Sum: " + sum;

  cardEl.textContent = "Cards: ";
  for (i = 0; i < cards.length; i++) {
    cardEl.textContent += cards[i] + " ";
  }

  messageEl.textContent = message;
}

function newCard() {
  if (isAlive === true && hasBlackJack === false) {
    let card = getRandomCard();
    sum += card;
    cards.push(card);
    renderGame();
  }
}

////////////////////////////////////////////////////////////
