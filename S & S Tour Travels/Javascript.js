//////////////////////////// Slider Images ////////////////////////////////
var imageArray,
  sliderImageLength,
  randomIndex,
  validation = false,
  registration = [],
  registerObject = {};

function grabArrayObjectData() {
  imageArray = [
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

  sliderImageLength = imageArray.length - 1;
  randomIndex = Math.floor(Math.random() * sliderImageLength);
}

// Home page

//////////////////////////// Home Slider Code ////////////////////////////////

function homeImageChange(randomIndex) {
  document.querySelector(".slider-image").src = imageArray[randomIndex].image;
  document.querySelector(".slider-title").innerHTML =
    imageArray[randomIndex].title;
}

function homeSliderButton(text) {
  if (text === "left") {
    randomIndex = randomIndex - 1;
    if (randomIndex < 0) {
      randomIndex = sliderImageLength;
    }
    homeImageChange(randomIndex);
  } else if (text === "right") {
    randomIndex = randomIndex + 1;
    if (randomIndex > sliderImageLength) {
      randomIndex = 0;
    }
    homeImageChange(randomIndex);
  }
}

function homeOnload() {
  grabArrayObjectData();
  homeImageChange(randomIndex);
}

// Reservation page

//////////////////////////// Reservation Title Change Code ////////////////////////////////

function reservationTitle(text) {
  document.querySelector("#reservation-heading").innerHTML =
    text + " RESERVATION";
}

//////////////////////////// Reservation Calculation Code ////////////////////////////////

function reservationCalculate() {
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

  function measureKm(lat1, lon1, lat2, lon2) {
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
    document.querySelector(".form-error-message").innerHTML =
      "Please select different destinations.";
  } else {
    document.querySelector(".form-error-message").innerHTML = "";
    economicPrice =
      measureKm(
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

  checkTotalAmount(adult, child, journey, reservationClassPrice.toFixed(0));
}

function checkTotalAmount(adult, child, journey, reservationClassPrice) {
  document.querySelector("#amount").innerHTML =
    (Number(adult) + Number(child)) * reservationClassPrice * journey;
}

// Login page

//////////////////////////// Login Signup and Signin Code ////////////////////////////////

function signUpButton() {
  document.querySelector(".login").style.display = "none";
  document.querySelector(".registration").style.display = "flex";
}

function signInButton() {
  document.querySelector(".login").style.display = "grid";
  document.querySelector(".registration").style.display = "none";
}

//////////////////////////// Login Signup and Signin validation Code ////////////////////////////////

function inputFocus(input) {
  document.getElementById(input.name).style.display = "none";
}

function errorMessage(input) {
  document.getElementById(input.name).style.display = "block";
}

function inputValidation(input) {
  if (input.value === "" || input.value === "PLEASE SELECT") {
    errorMessage(input);
  } else {
    if (input.name === "email") {
      if (!input.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        errorMessage(input);
        document.getElementById(input.name).innerHTML = "Enter email format";
      } else {
        var value = input.value;
        // registerObject = { ...registerObject, email: value };
        Object.assign(registerObject, { email: value });
      }
    } else if (input.name === "phone") {
      if (!input.value.match(/^\d{10}$/)) {
        errorMessage(input);
        document.getElementById(input.name).innerHTML = "Enter 10 digit only";
      } else {
        var value = input.value;
        // registerObject = { ...registerObject, phone: value };
        Object.assign(registerObject, { phone: value });
      }
    } else if (input.name === "title") {
      if (input.value === "PLEASE SELECT") {
        errorMessage(input);
        document.getElementById(input.name).innerHTML = "Please select title";
      } else {
        var value = input.value;
        // registerObject = { ...registerObject, firstname: value };
        Object.assign(registerObject, { title: value });
      }
    } else if (input.name === "address") {
      var value = input.value;
      // registerObject = { ...registerObject, country: value };
      Object.assign(registerObject, { address: value });
    } else {
      if (!input.value.match(/^[A-Za-z]+$/)) {
        errorMessage(input);
        document.getElementById(input.name).innerHTML = "Enter alphabet only";
      } else {
        if (input.name === "firstname") {
          var value = input.value;
          // registerObject = { ...registerObject, firstname: value };
          Object.assign(registerObject, { firstname: value });
        } else if (input.name === "lastname") {
          var value = input.value;
          // registerObject = { ...registerObject, lastname: value };
          Object.assign(registerObject, { lastname: value });
        } else if (input.name === "city") {
          var value = input.value;
          // registerObject = { ...registerObject, city: value };
          Object.assign(registerObject, { city: value });
        } else if (input.name === "state") {
          var value = input.value;
          // registerObject = { ...registerObject, state: value };
          Object.assign(registerObject, { state: value });
        } else if (input.name === "country") {
          var value = input.value;
          // registerObject = { ...registerObject, country: value };
          Object.assign(registerObject, { country: value });
        }
      }
    }
  }
}

//////////////////////////// Login Slider Code ////////////////////////////////

function loginLoadImage() {
  if (randomIndex === sliderImageLength) {
    randomIndex = 0;
  }
  document.querySelector(".login-img-slider").src =
    imageArray[randomIndex].image;
  document.querySelector(".login-img-slider-name").innerHTML =
    imageArray[randomIndex].title;
  randomIndex++;
}

function SignInSubmission() {
  let signInFormSubmission = document.getElementById("login");

  signInFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault();
    var inputs = e.target.getElementsByTagName("input");

    for (let index = 0; index < inputs.length; index++)
      inputValidation(inputs[index]);
  });
}

function SignUpSubmission() {
  let signUpFormSubmission = document.getElementById("signup");

  signUpFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault();

    var getRegistrations = localStorage.getItem("Registration") || "[]";
    getRegistrations = JSON.parse(getRegistrations);

    var inputs = e.target.querySelectorAll("select, input ,textarea");

    for (i = 0; i < inputs.length; i++) {
      if (inputs[i] !== "") {
        getRegistrations.push(registerObject);
        localStorage.setItem("Registration", JSON.stringify(getRegistrations));
        inputs[i].value = "";
      }
    }
  });
}

function loginOnload() {
  grabArrayObjectData();

  loginLoadImage();
  setInterval(loginLoadImage, 3000);

  SignInSubmission();
  SignUpSubmission();
}
