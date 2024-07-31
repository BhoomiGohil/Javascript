let myCourses = [
  "Learn CSS Animations",
  "UI Design Fundamentals",
  "Intro to Clean Code",
];

function courseArr(array) {
  for (i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

courseArr(myCourses);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

localStorage.setItem("refresh", true);

console.log(localStorage.getItem("refresh"));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let data = [
  {
    player: "Jane",
    score: 52,
  },
  {
    player: "Mark",
    score: 41,
  },
];

const janeBtn = document.getElementById("jane-btn");
janeBtn.addEventListener("click", () => {
  console.log(data[0].score);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function generateSentences(desc, arr) {
  let baseString = `The ${arr.length} ${desc} are `;
  let lastIndex = arr.length - 1;

  for (i = 0; i < arr.length; i++) {
    if (i === lastIndex) {
      baseString += arr[i];
    } else {
      baseString += arr[i] + ", ";
    }
  }

  console.log(baseString);
}

generateSentences("Largest countries", ["China", "India", "USA"]);
generateSentences("Best Fruits", ["Apples", "Bananas"]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let container = document.getElementById("container");

const imgs = ["images/hip1.jpg", "images/hip2.jpg", "images/hip3.jpg"];

function renderImages(images) {
  let imgsDOM = "";
  for (i = 0; i < images.length; i++) {
    imgsDOM += `<img alt="Employee in the company" class="team-img" src="${images[i]}">`;
  }
  container.innerHTML = imgsDOM;
}

renderImages(imgs);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const totalPrice = "420.69235632455";
const btn = document.getElementById("purchase-btn");
btn.textContent = `Buy €${Number(totalPrice).toFixed(2)}`;
