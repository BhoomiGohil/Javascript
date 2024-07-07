var imageArray,
  sliderImageLength,
  randomIndex,
  validation = false,
  submit = false,
  registration = [],
  registerObject = {};

var grabLocalStorageSignIn = localStorage.getItem("SignIn") || "[]";

//////////////////////////// Validation Code ////////////////////////////////

var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var phoneFormat = /^\d{10}$/;
var alphabetFormat = /^[A-Za-z]+$/;

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
    var getRegistrations = grabLocalStorageRegistration();
    if (JSON.stringify(getRegistrations) !== "[]") {
      for (var i = 0; i < getRegistrations.length; i++) {
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
    var getRegistrations = grabLocalStorageRegistration();
    if (
      JSON.stringify(getRegistrations) !== "[]" ||
      getRegistrations !== null
    ) {
      for (var i = 0; i < getRegistrations.length; i++) {
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
  var getRegistrations = grabLocalStorageRegistration();
  if (JSON.stringify(getRegistrations) !== "[]" || getRegistrations !== null) {
    for (var i = 0; i < getRegistrations.length; i++) {
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
  var to = document.form.to;
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
  var from = document.form.from;
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

////////////////////////// Common Header Onload Code ////////////////////////////////

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

////////////////////////// Load Image Object for Home and Login Code ////////////////////////////////

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

////////////////////////// Reservation Title Change Code ////////////////////////////////

function reservationTitle(text) {
  document.querySelector("#reservation-heading").innerHTML =
    text + " RESERVATION";
}

////////////////////////// Reservation Calculation Code ////////////////////////////////

function reservationCalculate() {
  var ways = document.form.ways;

  var journey = 1;
  if (ways === "two") {
    journey = 1.5;
  }

  var from = document.form.from;
  var to = document.form.to;

  var adult = document.form.adult;
  var child = document.form.child;

  var cabinClass = document.form.cabinClass;
  var economicPrice = 0;
  var reservationClassPrice;

  var kmPrice = 5;

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
    var submitFrom = inputValidation(from);
    var submitTo = inputValidation(to);

    if (submitFrom === submitTo) {
      economicPrice =
        measureKm(
          places[from.value].laltitude,
          places[from.value].longitude,
          places[to.value].laltitude,
          places[to.value].longitude
        ) * kmPrice;
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

  reservationClassPrice = economicPrice;
  if (cabinClass === "business") {
    reservationClassPrice = economicPrice * 2.5;
  }

  checkTotalAmount(
    Number(adult.value),
    Number(child.value),
    Number(journey),
    Number(reservationClassPrice.toFixed(0))
  );
}

function checkTotalAmount(adult, child, journey, reservationClassPrice) {
  document.querySelector("#amount").innerHTML =
    (adult + child) * (reservationClassPrice * journey);
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
  var getRegistrations = localStorage.getItem("Registration") || "[]";
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

function SignInSubmission() {
  let signInFormSubmission = document.getElementById("login");

  signInFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault();

    var username = e.target.querySelector(".username");
    var password = e.target.querySelector(".password");

    if (username.value !== "" && password.value !== "") {
      var submitUsername = inputValidation(username);
      var submitPassword = inputValidation(password);

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
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function generateId() {
  var length = 8,
    charset = "0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

function SignUpSubmission() {
  let signUpFormSubmission = document.getElementById("signup");

  signUpFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault();

    var getRegistrations = grabLocalStorageRegistration();
    var inputs = e.target.querySelectorAll("select, input ,textarea");

    for (var i = 0; i < inputs.length; i++) {
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
      for (var i = 0; i < inputs.length; i++) {
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
