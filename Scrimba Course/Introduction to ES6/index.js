// ------------------------ Template Literals ----------------------

// let word1 = "Bhoomi";
// let word2 = "Gohil";

// const fullName = `${word1} ${word2}`;

// console.log(fullName);

// console.log(`Hello

// World`);

// ------------------------ Destructuring objects ------------------------

// const player = {
//   name: "Lebron James",
//   club: "LA Lakers",
//   address: {
//     city: "Los Angeles",
//   },
// };

// const {
//   name,
//   club,
//   address: { city },
// } = player;

// console.log(
//   player.name +
//     " plays for " +
//     player.club +
//     " he lives in " +
//     player.address.city // Old Version
// );
// console.log(`${name} plays for ${club} he lives in ${city}`); // ES6

// const student = {
//   name: "Kyle",
//   age: 24,
//   projects: { diceGame: "Two player dice game using Javascript" },
// };

// const {
//   name,
//   age,
//   projects: { diceGame },
// } = student;

// console.log(
//   `My name is ${name} and I am ${age} years old and working on ${diceGame}`
// );

// ------------------------ Destructuring Arrays ------------------------

// const [firstName, course, location] = ["Dylan", "Coding God", "Israel"];

// console.log(firstName, course, location);

// ------------------------ Object Literal ------------------------

// function addressMaker(city, state) {
//   //   const newAddress = { city: city, state: state }; // Old Version
//   const newAddress = { city, state }; // ES6
//   console.log(newAddress);
// }

// addressMaker("Austin", "Texas");

// function addressMaker(address) {
//   let newAddress = {
//     city: address.city,
//     state: address.state,
//     country: "United States",
//   };

//   console.log(newAddress);

//   const { city, state } = address;

//   newAddress = {
//     city,
//     state,
//     country: "United States",
//   };

//   console.log(newAddress.city, newAddress.state, newAddress.country);
//   console.log(newAddress);
// }

// addressMaker({ city: "Austin", state: "Texas" });

// ------------------------ For of Loop ------------------------

// let incomes = [62000, 67000, 75000];
// let total = 0;

// for (const income of incomes) {
//   console.log(income);
//   total += income;
// }

// console.log(total);

// let fullName = "Bhoomi Gohil";

// for (const char of fullName) {
//   console.log(char);
// }

// const students = [
//   {
//     name: "John",
//     city: "New York",
//   },
//   {
//     name: "Peter",
//     city: "Paris",
//   },
//   {
//     name: "Kate",
//     city: "Sidney",
//   },
// ];

// for (const student of students) {
//   console.log(`${student.name} lives in ${student.city}`);
// }

// ------------------------ Spread Operator ------------------------

// let contacts = ["Mary", "Joel", "Danny"];

// let personalFriends = ["David", ...contacts, "Lily"];

// contacts.push("John");

// console.log(personalFriends);

// let person = {
//   name: "Adam",
//   age: 25,
//   city: "Manchester",
// };

// let employee = {
//   ...person,
//   salary: 50000,
//   position: "Software Developer",
// };

// const shoppingList = ["eggs", "milk", "butter"];
// const shoppingBasket = [...shoppingList, "bread", "pasta"];

// console.log(shoppingBasket);

// ------------------------ Rest Operator ------------------------

// function add(...nums) {
//   // ...nums -> Called rest operator because it is in function arguments
//   console.log(nums);
// }

// add(5, 5, 6, 3, 5);

// ------------------------ Arrow Functions ------------------------

// //function declaration
// function breakfastMenu() {
//   return "I'm going to scrambled eggs for breakfast.";
// }

// //anonymous function
// const lunchMenu = function () {
//   return "I'm going to eat pizza for lunch.";
// };

// //arrow function
// const dinnerMenu = (food) => `I'm going to eat a ${food} for dinner.`;

// console.log(dinnerMenu("chicken salad"));

// ------------------------ Defaults Params ------------------------

// const leadSinger = (artist = "Someone") => {
//   console.log(`${artist} is the lead singer of Cold Play`);
// };

// leadSinger("Chris Martin"); // Chris Martin is the lead singer of Cold Play
// leadSinger(); // Someone is the lead singer of Cold Play

// function foodShopping(food = "Something") {
//   console.log(`I'm going to buy ${food} from the grocery shop`);
// }

// foodShopping("eggs");

// ------------------------ Includes ------------------------

// let numArray = [1, 2, 3, 4, 5];
// console.log(numArray.includes(5));

// const listIngredients = ["flour", "sugar", "eggs", "butter"];

// if (listIngredients.includes("chocolate")) {
//   console.log("We are going to make a chocolate cake");
// } else {
//   console.log(
//     "We can't make a chocolate cake because we are missing the ingredient chocolate"
//   );
// }

// ------------------------ Let & Const ------------------------

// if (false) {
//   var example = 5;
// }

// console.log(example);

// var example;

// if (false) {
//   example = 5;
// }

// console.log(example);

// if (false) {
//   let example = 5;
// }

// console.log(example);

// const example = 5;
// example = 10;

// const example = [];
// example.push(5);

// const example = {};
// example.firstName = "Bhoomi";

// console.log(example);

// ------------------------ padStart & padEnd ------------------------

// let example = "Bhoomi";

// console.log(example.padStart(10, "i"));
// console.log(example.padEnd(10, "i"));

// ------------------------ Classes ------------------------

// class Animal {
//   constructor(type, legs) {
//     this.type = type;
//     this.legs = legs;
//   }

//   makeNoise(sound = "Loud Noise") {
//     console.log(sound);
//   }

//   static return10() {
//     //Static function can be access directly by Animal class dont have make instance of class
//     return 10;
//   }

//   get metaData() {
//     return `${this.type}, ${this.legs}`;
//   }
// }

// class Cat extends Animal {
//   makeNoise(sound = "Meow") {
//     console.log(sound);
//   }
// }

// let cat = new Animal("Cat", 4);

// console.log(cat.type);
// console.log(cat.legs);

// cat.legs = 2;

// console.log(cat.type);
// console.log(cat.legs);

// cat.makeNoise();

// console.log(Animal.return10()); // Static function can be access directly by Animal class dont have make instance of class

// console.log(cat.metaData);

// let cat = new Cat("Cat", 4);

// console.log(cat);

// cat.makeNoise();
// console.log(cat.metaData);

// class Player {
//   constructor(name, country) {
//     this.name = name;
//     this.country = country;
//   }

//   introduce() {
//     console.log(`${this.name} was born in ${this.country}`);
//   }
// }

// class TennisPlayer extends Player {
//   constructor(name, country, age) {
//     super(name, country);
//     this.age = age;
//   }

//   playTennis() {
//     console.log(
//       `${this.name} is ${this.age} years old and knows how to play Tennis"`
//     );
//   }
// }

// const messi = new Player("Messi", "Argentina");

// console.log(messi.name, messi.country);
// messi.introduce();

// const roger = new TennisPlayer("Roger Feferer", "Spain", 38);

// console.log(roger.name, roger.country, roger.age);
// roger.playTennis();
// roger.introduce();

// ------------------------ Trailing Commas ------------------------

// function add(param1) {
//   const example = {
//     name: "Dylan",
//   };
//   console.log(example);
// }

// add(2);

// ------------------------ Promises ------------------------

// const buyFlightTicket = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const error = false;
//       if (error) {
//         reject("Sorry your payment was not successful");
//       } else {
//         resolve("Thank you, your payment was successful");
//       }
//     }, 3000);
//   });
// };

// buyFlightTicket()
//   .then((success) => console.log(success))
//   .catch((error) => console.log(error));

// const userData = new Promise((resolve, reject) => {
//   error = false;
//   if (error) {
//     reject("500 Level Error");
//   } else {
//     resolve({
//       firstName: "Bhoomi",
//       age: 28,
//       email: "bhoomikgohil@hotmail.com",
//     });
//   }
// });

// userData
//   .then((success) => console.log(success))
//   .catch((error) => console.log(error));

// console.log(userData);

// ------------------------ Fetch ------------------------

// fetch("https://jsonplaceholder.typicode.com/comments/1")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// fetch("https://jsonplaceholder.typicode.com/comments/1")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// fetch("https://jsonplaceholder.typicode.com/comments", {
//   method: POST,
//   body: JSON.stringify({
//     name: "Comment 105",
//     email: "gmail.com",
//     body: "hbsdgvh hj hsvhj",
//   }),
// });

// ------------------------ Async & Await ------------------------

// const photos = [];

// async function photoUpload() {
//   let uploadStatus = new Promise((resolve) => {
//     setTimeout(() => {
//       photos.push("Profile Pic");
//       resolve("Photo Uploaded");
//     }, 3000);
//   });

//   let result = await uploadStatus;

//   console.log(result);
//   console.log(photos.length);
//   console.log(photos);
// }

// photoUpload();

// const apiUrl = "https://api.chucknorris.io/jokes/random";

// async function getJoke() {
//   const response = await fetch(apiUrl);
//   const data = await response.json();

//   console.log(data.value);
// }
// getJoke();

// ------------------------ Sets in ES6 ------------------------

// const exampleSet = new Set([1, 2, 3, 3, 2, 4, 1, 5]);

// console.log(exampleSet);

// exampleSet.add(5); // Add new value in set
// exampleSet.add(17).add(18); // Add new values in set using chain method

// console.log(exampleSet);

// exampleSet.delete(1); // Delete 1 from the set

// console.log(exampleSet);

// exampleSet.has(4); // Check if 4 is in the set

// console.log(exampleSet);

// exampleSet.clear(); // Clear whole set

// console.log(exampleSet);

// console.log(exampleSet.size); // Check the size of set
