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

//////////////////////////// Home Slider Code ////////////////////////////////

const sliderImageLength = imageArray.length - 1;
let randomIndex;

function homeOnload() {
  randomIndex = Math.floor(Math.random() * sliderImageLength);
  imagechange(randomIndex);
}

function imagechange(id) {
  document.querySelector(".slider-image").src = imageArray[id].image;
  document.querySelector(".slider-title").innerHTML = imageArray[id].title;
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

// Reservation

//////////////////////////// Reservation Title Change Code ////////////////////////////////

function reservationName(text) {
  document.querySelector("#reservation-heading").innerHTML =
    text + " RESERVATION";
}

//////////////////////////// Reservation Calculation Code ////////////////////////////////

function reservationCheck() {
  var leaving = document.form.leaving.value;
  var going = document.form.going.value;

  if (going === leaving) {
    document.querySelector(".form-message").innerHTML =
      "Leaving from and Going to value is same.";
  } else if (going !== leaving) {
    document.querySelector(".form-message").innerHTML = "";

    if (going === "MUMBAI") {
      economic = 500;
      business = 1000;
    } else if (going === "DELHI") {
      economic = 1000;
      business = 1500;
    } else if (going === "BANGLORE") {
      economic = 1500;
      business = 2000;
    }
    checkTotal(economic, business);
  }
}

function checkTotal(economic, business) {
  var journeyway = document.form.journeyway.value;

  if (journeyway === "ONEWAY") {
    journey = 1;
  } else {
    journey = 2;
  }

  var adult = document.form.adult.value;
  var child = document.form.child.value;

  var cabinclass = document.form.cabinclass.value;

  if (cabinclass === "ECONOMY") {
    document.querySelector("#amount").innerHTML =
      (Number(adult) + Number(child)) * economic * journey;
  } else {
    document.querySelector("#amount").innerHTML =
      (Number(adult) + Number(child)) * business * journey;
  }
}

// Login

//////////////////////////// Login Signup and Signin Code ////////////////////////////////

function signUp() {
  document.querySelector(".login").style.display = "none";
  document.querySelector(".main-registration").style.display = "flex";
}

function signIn() {
  document.querySelector(".login").style.display = "flex";
  document.querySelector(".main-registration").style.display = "none";
}

function textfocus(text) {
  document.getElementById(text).style.display = "none";
}

function textblur(name, id) {
  if (document.getElementById(id).value === "") {
    textblock(name);
  } else {
    text = document.getElementById(id).value;
    if (id === "fn" || id === "ln" || id === "ct" || id === "s" || id === "c") {
      if (text.match(/^[A-Za-z]+$/)) {
      } else {
        textblock(name);
        document.getElementById(name).innerHTML = "Enter Alphabet Only...";
      }
    } else if (id === "e") {
      if (text.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      } else {
        textblock(name);
        document.getElementById(name).innerHTML = "Enter Email Properly...";
      }
    } else if (id === "ph") {
      if (text.match(/^\d{10}$/)) {
      } else {
        textblock(name);
        document.getElementById(name).innerHTML = "Enter 10 Digit Only...";
      }
    }
  }
}

function textblock(name) {
  document.getElementById(name).style.display = "block";
}

//////////////////////////// Login LocalStorage Code ////////////////////////////////

const getRegistrations = localStorage.getItem("Registration");

if (getRegistrations) {
  localStorage.setItem("Registration", null);
}

console.log(getRegistrations);

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
