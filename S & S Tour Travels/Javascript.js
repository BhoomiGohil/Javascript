// Slider

//////////////////////////// Slider Images ////////////////////////////////

const imageArray = [
  {
    image: "../Images/Place1.gif",
    title: "London",
  },
  {
    image: "../Images/Place2.gif",
    title: "Venice",
  },
  {
    image: "../Images/Place3.gif",
    title: "New Zealand",
  },
  {
    image: "../Images/Place4.gif",
    title: "Goa",
  },
  {
    image: "../Images/Place5.gif",
    title: "Jammu and Kashmir",
  },
  {
    image: "../Images/Place6.gif",
    title: "Australia",
  },
];

// Home page

//////////////////////////// Home Slider Code ////////////////////////////////

const sliderImageLength = imageArray.length - 1;
let randomIndex;

function homeOnload() {
  randomIndex = Math.floor(Math.random() * sliderImageLength);
  imagechange(randomIndex);
}

function imagechange(randomIndex) {
  document.querySelector(".slider-image").src = imageArray[randomIndex].image;
  document.querySelector(".slider-title").innerHTML =
    imageArray[randomIndex].title;
}

function slider(text) {
  if (text === "left") {
    randomIndex = randomIndex - 1;
    if (randomIndex < 0) {
      randomIndex = sliderImageLength;
    }
    imagechange(randomIndex);
  }

  if (text === "right") {
    randomIndex = randomIndex + 1;
    if (randomIndex > sliderImageLength) {
      randomIndex = 0;
    }
    imagechange(randomIndex);
  }
}

// Reservation page

//////////////////////////// Reservation Title Change Code ////////////////////////////////

function reservationName(text) {
  document.querySelector("#reservation-heading").innerHTML =
    text + " RESERVATION";
}

//////////////////////////// Reservation Calculation Code ////////////////////////////////

function reservationCheck() {
  var from = document.form.from.value;
  var to = document.form.to.value;

  var ways = document.form.ways.value;

  var adult = document.form.adult.value;
  var child = document.form.child.value;

  var cabinClass = document.form.cabinClass.value;
  var economicPrice = 0;
  var reservationClassPrice;

  var kmPrice = 5;

  var journey = 1;
  if (ways === "two") {
    journey = 1.5;
  }

  const places = {
    delhi: {
      laltitude: 28.7041,
      longitude: 77.1025,
    },
    mumbai: {
      laltitude: 19.076,
      longitude: 72.8777,
    },
    banglore: {
      laltitude: 12.9716,
      longitude: 77.5946,
    },
  };

  function measure(lat1, lon1, lat2, lon2) {
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    var dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // km
  }

  if (from === to) {
    document.querySelector(".form-message").innerHTML =
      "Please select different destinations.";
  } else {
    document.querySelector(".form-message").innerHTML = "";
    economicPrice =
      measure(
        places[from].laltitude,
        places[from].longitude,
        places[to].laltitude,
        places[to].longitude
      ) * kmPrice;
  }

  reservationClassPrice = economicPrice;
  if (cabinClass === "business") {
    reservationClassPrice = economicPrice * 2.5;
  }

  checkTotal(adult, child, journey, reservationClassPrice.toFixed(0));
}

function checkTotal(adult, child, journey, reservationClassPrice) {
  document.querySelector("#amount").innerHTML =
    (Number(adult) + Number(child)) * reservationClassPrice * journey;
}

// Login page

//////////////////////////// Login Signup and Signin Code ////////////////////////////////

function signUp() {
  document.querySelector(".login").style.display = "none";
  document.querySelector(".main-registration").style.display = "flex";
}

function signIn() {
  document.querySelector(".login").style.display = "flex";
  document.querySelector(".main-registration").style.display = "none";
}

function textFocus(input) {
  document.getElementById(input.name).style.display = "none";
}

function textMessage(input) {
  document.getElementById(input.name).style.display = "block";
}

function textValidation(input) {
  if (input.value === "") {
    textMessage(input);
  } else {
    text = input.value;
    if (
      input.name === "firstname" ||
      input.name === "lastname" ||
      input.name === "city" ||
      input.name === "state" ||
      input.name === "country"
    ) {
      if (text.match(/^[A-Za-z]+$/)) {
      } else {
        textMessage(input);
        document.getElementById(input.name).innerHTML = "Enter alphabet only";
      }
    } else if (input.name === "email") {
      if (text.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      } else {
        textMessage(input);
        document.getElementById(input.name).innerHTML = "Enter email format";
      }
    } else if (input.name === "phone") {
      if (text.match(/^\d{10}$/)) {
      } else {
        textMessage(input);
        document.getElementById(input.name).innerHTML = "Enter 10 digit only";
      }
    }
  }
}

let signUpForm = document.getElementById("signup");

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var inputs = e.target.getElementsByTagName("input");
  var textareas = e.target.getElementsByTagName("textarea");

  for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index];
    textValidation(element);
  }

  for (let index = 0; index < textareas.length; index++) {
    const element = textareas[index];
    textValidation(element);
  }
});

let signInForm = document.getElementById("login");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var inputs = e.target.getElementsByTagName("input");
  var textareas = e.target.getElementsByTagName("textarea");

  for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index];
    textValidation(element);
  }

  for (let index = 0; index < textareas.length; index++) {
    const element = textareas[index];
    textValidation(element);
  }
});

// function registration(form) {
// localStorage.setItem("Registration", [
//   {
//     title: "",
//     firstName: "",
//     lastName: "",
//     city: "",
//     state: "",
//     country: "",
//     email: "",
//     phone: "",
//     address: "",
//   },
// ]);
// }

//////////////////////////// Login LocalStorage Code ////////////////////////////////

const getRegistrations = localStorage.getItem("Registration");

if (getRegistrations) {
  localStorage.setItem("Registration", null);
}

//////////////////////////// Login Slider Code ////////////////////////////////

function loginOnload() {
  var loginSliderIndex = 0;

  loadImage();

  setInterval(loadImage, 3000);

  function loadImage() {
    if (loginSliderIndex === sliderImageLength) {
      loginSliderIndex = 0;
    }
    document.querySelector(".login-img-slider").src =
      imageArray[loginSliderIndex].image;
    document.querySelector(".login-img-slider-name").innerHTML =
      imageArray[loginSliderIndex].title;
    loginSliderIndex++;
  }
}
