////////////////////////// Header code ////////////////////////////////

let grabLocalStorageSignIn = localStorage.getItem("SignIn") || "[]";

function checkLocalStorageSignin() {
  if (grabLocalStorageSignIn === "[]" || grabLocalStorageSignIn === null) {
    document.querySelector("#headerLogin").style.display = "flex";
    document.querySelector("#headerLogout").style.display = "none";
    document.querySelector("#headerProfile").style.display = "none";
  } else {
    document.querySelector("#headerLogin").style.display = "none";
    document.querySelector("#headerLogout").style.display = "flex";
    document.querySelector("#headerProfile").style.display = "block";

    data = JSON.parse(grabLocalStorageSignIn);

    user = `${data.title} ${data.firstname} ${data.lastname}`;
    address = `${data.address} ${data.city} ${data.state} ${data.country}`;
    document.querySelector("#DBuser").innerHTML = user;
    document.querySelector("#DBaddress").innerHTML = address;
    document.querySelector("#DBemail").innerHTML = `${data.email} `;
    document.querySelector("#DBphone").innerHTML = `${data.phone} `;
    document.querySelector("#DBpassword").innerHTML = `${data.password} `;
  }
}

checkLocalStorageSignin();

function logout() {
  localStorage.setItem("SignIn", "[]");
  document.querySelector("#headerLogin").style.display = "flex";
  document.querySelector("#headerLogout").style.display = "none";
  document.querySelector("#headerProfile").style.display = "none";
}

//////////////////////////// Form validation code ////////////////////////////////

let submit = false;
let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let phoneFormat = /^\d{10}$/;
let alphabetFormat = /^[A-Za-z]+$/;

function inputFocus(input) {
  input.previousElementSibling.style.display = "none";
  input.previousElementSibling.innerHTML = "";
}

function errorMessage(input, message) {
  input.previousElementSibling.style.display = "block";
  input.previousElementSibling.innerHTML = message;
}

function inputValidationTitle(input) {
  if (input.value === "PLEASE SELECT") {
    errorMessage(input, "Please select title");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

function inputValidationAlphabet(input) {
  if (!input.value.match(alphabetFormat)) {
    errorMessage(input, "Enter alphabet only");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

function inputValidationEmail(input) {
  if (!input.value.match(emailFormat)) {
    errorMessage(input, "Enter email format");
    submit = false;
  } else {
    let getRegistrations = grabLocalStorageRegistration();
    if (JSON.stringify(getRegistrations) !== "[]") {
      for (let i = 0; i < getRegistrations.length; i++) {
        if (input.value === getRegistrations[i].email) {
          errorMessage(input, "Email is already registered");
          submit = false;
          break;
        } else {
          submit = true;
        }
      }
    } else {
      submit = true;
    }
  }
  return submit;
}

function inputValidationPhone(input) {
  if (!input.value.match(phoneFormat)) {
    errorMessage(input, "Enter 10 digit only");
    submit = false;
  } else {
    submit = true;
  }
  return submit;
}

function inputValidationAddress(input) {
  submit = true;
  return submit;
}

function inputValidationUsername(input) {
  if (!input.value.match(emailFormat)) {
    errorMessage(input, "Enter email format");
    signIn = "[]";
    submit = false;
  } else {
    let getRegistrations = grabLocalStorageRegistration();
    if (
      JSON.stringify(getRegistrations) !== "[]" ||
      getRegistrations !== null
    ) {
      for (let i = 0; i < getRegistrations.length; i++) {
        if (input.value !== getRegistrations[i].email) {
          errorMessage(input, "Enter is not registered");
          signIn = "[]";
          submit = false;
        } else {
          signIn = getRegistrations[i];
          submit = true;
        }
      }
    } else {
      errorMessage(input, "Enter is not registered");
      signIn = "[]";
      submit = false;
    }
  }
  return [submit, signIn];
}

function inputValidationPassword(input) {
  let getRegistrations = grabLocalStorageRegistration();
  if (JSON.stringify(getRegistrations) !== "[]" || getRegistrations !== null) {
    for (let i = 0; i < getRegistrations.length; i++) {
      if (input.value !== getRegistrations[i].password) {
        errorMessage(input, "Password is not matching");
        submit = false;
      } else {
        submit = true;
      }
    }
  } else {
    errorMessage(input, "Password is not matching");
    submit = false;
  }
  return submit;
}

function inputValidationFrom(input) {
  let to = document.form.to;
  if (input.value === to.value) {
    errorMessage(input, "Please select different destinations.");
    errorMessage(to, "Please select different destinations.");
    submit = false;
  } else {
    if (to.value === "Please Select" || to.value === "PLEASE SELECT") {
    } else {
      inputFocus(to);
    }
    submit = true;
  }
  return submit;
}

function inputValidationTo(input) {
  let from = document.form.from;
  if (input.value === from.value) {
    errorMessage(input, "Please select different destinations.");
    errorMessage(from, "Please select different destinations.");
    submit = false;
  } else {
    if (from.value === "Please Select" || from.value === "PLEASE SELECT") {
    } else {
      inputFocus(from);
    }
    submit = true;
  }
  return submit;
}

function inputValidation(input) {
  if (
    input.value === "" ||
    input.value === "PLEASE SELECT" ||
    input.value === "Please Select"
  ) {
    errorMessage(
      input,
      `Enter ${input.name.charAt(0).toUpperCase() + input.name.substring(1)}`
    );
    submit = false;
  } else if (input.value) {
    if (input.name === "title") {
      submit = inputValidationTitle(input);
    } else if (input.name === "email") {
      submit = inputValidationEmail(input);
    } else if (input.name === "phone") {
      submit = inputValidationPhone(input);
    } else if (input.name === "address") {
      submit = inputValidationAddress(input);
    } else if (input.name === "username") {
      submit = inputValidationUsername(input);
    } else if (input.name === "password") {
      submit = inputValidationPassword(input);
    } else if (input.name === "from") {
      submit = inputValidationFrom(input);
    } else if (input.name === "to") {
      submit = inputValidationTo(input);
    } else {
      submit = inputValidationAlphabet(input);
    }
  }

  return submit;
}

////////////////////////// Load Images's object for Home and Login page code ////////////////////////////////

let imageArray, sliderImageLength, randomIndex;

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

////////////////////////// Home Slider Code ////////////////////////////////

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

////////////////////////// Flight Data Code ////////////////////////////////

let ways = document.form.ways;

let journey = 1;

let from = document.form.from;
let to = document.form.to;
let formOption;

let adult = document.form.adult;
let child = document.form.child;

let economicPrice = 0;
let premiumPrice = 1.5;
let businessPrice = 2.5;
let reservationClassPrice;

let kmPrice = 5;

function measureKm(
  originLaltitude,
  originLongitude,
  destinationLaltitude,
  destinationLongitude
) {
  let radius = 6378.137;
  let Laltitude =
    (destinationLaltitude * Math.PI) / 180 - (originLaltitude * Math.PI) / 180;
  let Longitude =
    (destinationLongitude * Math.PI) / 180 - (originLongitude * Math.PI) / 180;
  let a =
    Math.sin(Laltitude / 2) * Math.sin(Laltitude / 2) +
    Math.cos((originLaltitude * Math.PI) / 180) *
      Math.cos((destinationLaltitude * Math.PI) / 180) *
      Math.sin(Longitude / 2) *
      Math.sin(Longitude / 2);
  let center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = radius * center;
  return distance;
}

let airlineArray = [
  {
    number: "AC 056",
    name: "Air Mumbai",
    operate: "Mumbai",
    seats: 200,
    wifi: true,
  },
  {
    number: "AC 436",
    name: "Air Delhi",
    operate: "Delhi",
    seats: 130,
    wifi: false,
  },
  {
    number: "AC 393",
    name: "Air Banglore",
    operate: "Banglore",
    seats: 120,
    wifi: true,
  },
];

let airportObject = [
  {
    airportCode: 214,
    airportName: "Mumbai Airport",
    airportShortName: "Mum",
    location: "Mumbai",
    facilities: "Flights",
    cooridates: { laltitude: 19.076, longitude: 72.8777 },
  },
  {
    airportCode: 584,
    airportName: "Delhi Airport",
    airportShortName: "Del",
    location: "Delhi",
    facilities: "Flights",
    cooridates: { laltitude: 28.7041, longitude: 77.1025 },
  },
  {
    airportCode: 762,
    airportName: "Banglore Airport",
    airportShortName: "Ban",
    location: "Banglore",
    facilities: "Flights",
    cooridates: { laltitude: 12.9716, longitude: 77.5946 },
  },
];

let flightObject = [
  {
    flightId: 35536,
    flightNumber: 236,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObject[0].airportCode,
    destinationAirportCode: airportObject[1].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    stopAirportCode: [],
    economy:
      measureKm(
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude,
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude
      ) * economicPrice,
    premium:
      measureKm(
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude,
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude
      ) * premiumPrice,
    business:
      measureKm(
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude,
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude
      ) * businessPrice,
  },
  {
    flightId: 65476,
    flightNumber: 362,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObject[0].airportCode,
    destinationAirportCode: airportObject[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    stopAirportCode: [airportObject[1].airportCode],
    economy:
      measureKm(
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude,
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude
      ) * economicPrice,
    premium:
      measureKm(
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude,
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude
      ) * premiumPrice,
    business:
      measureKm(
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude,
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude
      ) * businessPrice,
  },
  {
    flightId: 73561,
    flightNumber: 273,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObject[1].airportCode,
    destinationAirportCode: airportObject[0].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    stopAirportCode: [],
    economy:
      measureKm(
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude,
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude
      ) * economicPrice,
    premium:
      measureKm(
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude,
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude
      ) * premiumPrice,
    business:
      measureKm(
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude,
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude
      ) * businessPrice,
  },
  {
    flightId: 45235,
    flightNumber: 232,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObject[1].airportCode,
    destinationAirportCode: airportObject[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    stopAirportCode: [],
    economy:
      measureKm(
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude,
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude
      ) * economicPrice,
    premium:
      measureKm(
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude,
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude
      ) * premiumPrice,
    business:
      measureKm(
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude,
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude
      ) * businessPrice,
  },
  {
    flightId: 63718,
    flightNumber: 452,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObject[2].airportCode,
    destinationAirportCode: airportObject[0].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    stopAirportCode: [airportObject[1].airportCode],
    economy:
      measureKm(
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude,
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude
      ) * economicPrice,
    premium:
      measureKm(
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude,
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude
      ) * premiumPrice,
    business:
      measureKm(
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude,
        airportObject[0].cooridates.laltitude,
        airportObject[0].cooridates.longitude
      ) * businessPrice,
  },
  {
    flightId: 25143,
    flightNumber: 634,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObject[2].airportCode,
    destinationAirportCode: airportObject[1].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    stopAirportCode: [],
    economy:
      measureKm(
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude,
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude
      ) * economicPrice,
    premium:
      measureKm(
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude,
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude
      ) * premiumPrice,
    business:
      measureKm(
        airportObject[2].cooridates.laltitude,
        airportObject[2].cooridates.longitude,
        airportObject[1].cooridates.laltitude,
        airportObject[1].cooridates.longitude
      ) * businessPrice,
  },
];

////////////////////////// Reservation Title Change Code ////////////////////////////////

function reservationTitle(text) {
  document.querySelector("#reservation-heading").innerHTML =
    text + " RESERVATION";
}

////////////////////////// Reservation Calculation Code ////////////////////////////////

function ChangeStartDate() {
  let startDate = document.querySelector(".start-date").value;
  document.querySelector(".end-date").min = startDate;
}

function reservationFlights() {
  function flights(from, to) {
    let fromCode, toCode;

    for (i = 0; i < airportObject.length; i++) {
      if (airportObject[i].location === from)
        fromCode = airportObject[i].airportCode;
    }

    for (i = 0; i < airportObject.length; i++) {
      if (airportObject[i].location === to)
        toCode = airportObject[i].airportCode;
    }

    for (i = 0; i < flightObject.length; i++) {
      if (
        flightObject[i].originAirportCode === fromCode &&
        flightObject[i].destinationAirportCode === toCode
      ) {
        console.log(fromCode, toCode);
      }
    }
  }

  if (
    (from.value === "Please Select" || from.value === "PLEASE SELECT") &&
    (to.value === "Please Select" || to.value === "PLEASE SELECT")
  ) {
    inputValidation(from);
    inputValidation(to);
  } else if (
    (from.value !== "Please Select" || from.value !== "PLEASE SELECT") &&
    (to.value !== "Please Select" || to.value !== "PLEASE SELECT")
  ) {
    let submitFrom = inputValidation(from);
    let submitTo = inputValidation(to);

    if (submitFrom && submitTo) {
      flights(from.value, to.value);
    }
  } else if (
    (from.value === "Please Select" || from.value === "PLEASE SELECT") &&
    (to.value !== "" || to.value !== "")
  ) {
    inputValidation(from);
    inputValidation(to);
  } else if (
    (from.value !== "" || from.value !== "") &&
    (to.value === "Please Select" || to.value === "PLEASE SELECT")
  ) {
    inputValidation(from);
    inputValidation(to);
  }
}

function reservationOnLoad() {
  if (ways === "two") {
    journey = 1.5;
  }

  for (i = 0; i < airportObject.length; i++) {
    formOption = document.createElement("option");
    formOption.value = airportObject[i].location;
    formOption.innerHTML = airportObject[i].location;
    from.appendChild(formOption);
  }

  for (i = 0; i < airportObject.length; i++) {
    formOption = document.createElement("option");
    formOption.value = airportObject[i].location;
    formOption.innerHTML = airportObject[i].location;
    to.appendChild(formOption);
  }

  for (i = 1; i <= 100; i++) {
    formOption = document.createElement("option");
    formOption.value = i;
    formOption.innerHTML = i;
    adult.appendChild(formOption);
  }

  for (i = 0; i <= 100; i++) {
    formOption = document.createElement("option");
    formOption.value = i;
    formOption.innerHTML = i;
    child.appendChild(formOption);
  }

  let todayDate = new Date();

  Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
  };

  var sevenDays = new Date().addDays(7);
  var yearDays = new Date().addDays(365);

  function dateConvert(date) {
    return date.toISOString().split("T")[0];
  }

  var startDate = document.querySelector(".start-date");
  startDate.min = dateConvert(todayDate);
  startDate.max = dateConvert(yearDays);
  startDate.value = dateConvert(todayDate);

  var returnDate = document.querySelector(".end-date");
  returnDate.min = dateConvert(todayDate);
  returnDate.max = dateConvert(yearDays);
  returnDate.value = dateConvert(sevenDays);
}

// Login page

////////////////////////// Login Signup and Signin Code ////////////////////////////////

function signUpButton() {
  document.querySelector(".login").style.display = "none";
  document.querySelector(".registration").style.display = "flex";
}

function signInButton() {
  document.querySelector(".login").style.display = "grid";
  document.querySelector(".registration").style.display = "none";
}

////////////////////////// Login Grab Registration LocalStorage Code ////////////////////////////////

function grabLocalStorageRegistration() {
  let getRegistrations = localStorage.getItem("Registration") || "[]";
  getRegistrations = JSON.parse(getRegistrations);

  return getRegistrations;
}

////////////////////////// Login Slider Code ////////////////////////////////

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

////////////////////////// Login SignIn Code ////////////////////////////////

let validation = false,
  registration = [],
  registerObject = {};

function SignInSubmission() {
  let signInFormSubmission = document.getElementById("login");

  signInFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = e.target.querySelector(".username");
    let password = e.target.querySelector(".password");

    if (username.value !== "" && password.value !== "") {
      let submitUsername = inputValidation(username);
      let submitPassword = inputValidation(password);

      if (submitUsername[0] === submitPassword) {
        localStorage.setItem("SignIn", JSON.stringify(submitUsername[1]));
        document.location.href =
          "/S%20%26%20S%20Tour%20Travels/html/Profile.html";
        checkLocalStorageSignin();
      }
    } else if (username.value === "" && password.value === "") {
      inputValidation(username);
      inputValidation(password);
    } else if (username.value === "" && password.value !== "") {
      inputValidation(username);
    } else if (username.value !== "" && password.value === "") {
      inputValidation(password);
    }
  });
}

////////////////////////// Login SignUp Code ////////////////////////////////

function generatePassword() {
  let length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function generateId() {
  let length = 8,
    charset = "0123456789",
    retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function SignUpSubmission() {
  let validation = false;
  let signUpFormSubmission = document.getElementById("signup");

  signUpFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault();

    let getRegistrations = grabLocalStorageRegistration();
    let inputs = e.target.querySelectorAll("select, input ,textarea");

    for (let i = 0; i < inputs.length; i++) {
      let submitForm = inputValidation(inputs[i]);
      if (submitForm) {
        validation = true;
        Object.assign(registerObject, { [inputs[i].name]: inputs[i].value });
      } else {
        validation = false;
        break;
      }
    }

    if (validation) {
      Object.assign(registerObject, {
        id: generateId(),
        password: generatePassword(),
      });
      getRegistrations.push(registerObject);
      localStorage.setItem("Registration", JSON.stringify(getRegistrations));
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
      }
    }
  });
}

////////////////////////// Login Onload Function Code ////////////////////////////////

function loginOnload() {
  grabArrayObjectData();

  loginLoadImage();
  setInterval(loginLoadImage, 3000);

  SignInSubmission();
  SignUpSubmission();
}
