////////////////////////// Header code ////////////////////////////////

var grabLocalStorageSignIn = localStorage.getItem("SignIn") || "[]";

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

var submit = false;
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

////////////////////////// Load Images's object for Home and Login page code ////////////////////////////////

var imageArray, sliderImageLength, randomIndex;

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

var ways = document.form.ways;

var journey = 1;

var from = document.form.from;
var to = document.form.to;
var formOption;

var adult = document.form.adult;
var child = document.form.child;

var economicPrice = 1;
var premiumPrice = 1.2;
var businessPrice = 1.5;
var reservationClassPrice;

var kmPrice = 5;

function measureKm(
  originLaltitude,
  originLongitude,
  destinationLaltitude,
  destinationLongitude
) {
  var radius = 6378.137;
  var Laltitude =
    (destinationLaltitude * Math.PI) / 180 - (originLaltitude * Math.PI) / 180;
  var Longitude =
    (destinationLongitude * Math.PI) / 180 - (originLongitude * Math.PI) / 180;
  var a =
    Math.sin(Laltitude / 2) * Math.sin(Laltitude / 2) +
    Math.cos((originLaltitude * Math.PI) / 180) *
      Math.cos((destinationLaltitude * Math.PI) / 180) *
      Math.sin(Longitude / 2) *
      Math.sin(Longitude / 2);
  var center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = radius * center;
  return distance;
}

var airlineObjects = [
  {
    number: "AC 056",
    name: "Air Mumbai",
    operate: "Mumbai",
    wifi: true,
  },
  {
    number: "AC 436",
    name: "Air Delhi",
    operate: "Delhi",
    wifi: true,
  },
  {
    number: "AC 393",
    name: "Air Banglore",
    operate: "Banglore",
    wifi: false,
  },
  {
    number: "AC 522",
    name: "Air Mumbai",
    operate: "Mumbai",
    wifi: true,
  },
  {
    number: "AC 346",
    name: "Air Delhi",
    operate: "Delhi",
    wifi: false,
  },
  {
    number: "AC 098",
    name: "Air Banglore",
    operate: "Banglore",
    wifi: false,
  },
];

var airportObjects = [
  {
    airportCode: 584,
    airportName: "Delhi Airport",
    airportShortName: "Del",
    location: "Delhi",
    facilities: "Flights",
    cooridates: { laltitude: 28.7041, longitude: 77.1025 },
  },
  {
    airportCode: 214,
    airportName: "Mumbai Airport",
    airportShortName: "Mum",
    location: "Mumbai",
    facilities: "Flights",
    cooridates: { laltitude: 19.076, longitude: 72.8777 },
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

var flightObjects = [
  {
    flightId: 35536,
    flightNumber: 236,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[0].airportCode,
    destinationAirportCode: airportObjects[1].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[1],
    stopAirportCode: [],
    economy: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 65476,
    flightNumber: 362,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[0].airportCode,
    destinationAirportCode: airportObjects[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[0],
    stopAirportCode: [
      {
        code: airportObjects[1].airportCode,
        waitingTime: "2hr 35min",
        planeAssign: airlineObjects[2],
      },
    ],
    economy: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 73561,
    flightNumber: 273,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[1].airportCode,
    destinationAirportCode: airportObjects[0].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[2],
    stopAirportCode: [],
    economy: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 45235,
    flightNumber: 232,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[1].airportCode,
    destinationAirportCode: airportObjects[2].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[4],
    stopAirportCode: [],
    economy: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude,
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 63718,
    flightNumber: 452,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[2].airportCode,
    destinationAirportCode: airportObjects[0].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[2],
    stopAirportCode: [
      {
        code: airportObjects[1].airportCode,
        waitingTime: "2hr 35min",
        planeAssign: null,
      },
    ],
    economy: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[0].cooridates.laltitude,
        airportObjects[0].cooridates.longitude
      ) * businessPrice
    ),
  },
  {
    flightId: 25143,
    flightNumber: 634,
    departureDateTime: "11:00 AM",
    arrivalDateTime: "1:00 PM",
    originAirportCode: airportObjects[2].airportCode,
    destinationAirportCode: airportObjects[1].airportCode,
    availableSeats: Math.floor(Math.random() * 200),
    intialPlaneAssign: airlineObjects[5],
    stopAirportCode: [],
    economy: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * economicPrice
    ),
    premium: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * premiumPrice
    ),
    business: Math.floor(
      measureKm(
        airportObjects[2].cooridates.laltitude,
        airportObjects[2].cooridates.longitude,
        airportObjects[1].cooridates.laltitude,
        airportObjects[1].cooridates.longitude
      ) * businessPrice
    ),
  },
];

////////////////////////// Reservation Title Change Code ////////////////////////////////

function reservationTitle(text) {
  document.querySelector("#reservation-heading").innerHTML =
    text + " RESERVATION";
}

////////////////////////// Reservation Calculation Code ////////////////////////////////

function ChangeStartDate() {
  var startDate = document.querySelector(".start-date").value;
  document.querySelector(".end-date").min = startDate;
}

function flights(from, to) {
  var lists = document.querySelector(".reservation-lists");
  var list = document.querySelectorAll(".reservation-list");

  for (var i = 1; i < list.length; i++) {
    lists.removeChild(list[i]);
  }

  for (var i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Assign

    if (airportObject.location === from) {
      var fromCode = airportObject.airportCode;
    }
    if (airportObject.location === to) {
      var toCode = airportObject.airportCode;
    }
  }

  for (var i = 0; i < flightObjects.length; i++) {
    var flightObject = flightObjects[i]; // Assign
    var flightOrigin = flightObject.originAirportCode; // Assign
    var flightDestination = flightObject.destinationAirportCode; // Assign
    var flightDepartureTime = flightObject.departureDateTime; // Assign
    var flightArrivalTime = flightObject.arrivalDateTime; // Assign
    var flightStopCode = flightObject.stopAirportCode; // Assign
    var flightPlaneAssign = flightObject.intialPlaneAssign; // Assign

    if (flightOrigin === fromCode && flightDestination === toCode) {
      ////////////// List //////////////

      var list = document.createElement("div");
      list.classList.add("reservation-list");

      ////////////// List Detail //////////////

      var listDetail = document.createElement("div");
      listDetail.classList.add("reservation-route-detail");

      list.appendChild(listDetail);

      var timing = document.createElement("div");
      timing.classList.add("reservation-route-timing");

      listDetail.appendChild(timing);

      var startingTime = document.createElement("div");
      startingTime.classList.add("reservation-route-start-time");
      startingTime.innerHTML = flightDepartureTime;

      var routeHours = document.createElement("div");
      routeHours.classList.add("reservation-route-hours");
      routeHours.innerHTML = flightStopCode.length + " Stop";

      var endingTime = document.createElement("div");
      endingTime.classList.add("reservation-route-end-time");
      endingTime.innerHTML = flightArrivalTime;

      timing.appendChild(startingTime);
      timing.appendChild(routeHours);
      timing.appendChild(endingTime);

      ////////////// Route Locations //////////////

      var locations = document.createElement("div");
      locations.classList.add("reservation-route-locations");

      listDetail.appendChild(locations);

      var location = document.createElement("div");
      location.classList.add("reservation-route-location");

      locations.appendChild(location);

      var locationFromP = document.createElement("p");
      // locationFromP.classList.add("");
      locationFromP.innerHTML = from;

      var locationToP = document.createElement("p");
      // locationToP.classList.add("");
      locationToP.innerHTML = to;

      location.appendChild(locationFromP);
      location.appendChild(locationToP);

      ////////////// Route Stops //////////////

      var stops = document.createElement("div");
      stops.classList.add("reservation-route-stops");

      locations.appendChild(stops);

      if (flightOrigin !== null && flightOrigin) {
        var dotLeft = document.createElement("div");
        dotLeft.classList.add("reservation-route-dots");
        stops.appendChild(dotLeft);

        for (var j = 0; j < airlineObjects.length; j++) {
          var airlineObject = airlineObjects[j]; // Assign

          var wifi = document.createElement("img");
          wifi.classList.add("reservation-route-wifi");

          if (airlineObject.number === flightPlaneAssign.number) {
            if (airlineObject.wifi) {
              wifi.src = "../Images/wifi.png";
              stops.appendChild(wifi);
            } else {
              wifi.src = "../Images/no-signal.png";
              stops.appendChild(wifi);
            }
          }
        }
      }

      var routes = document.createElement("div");
      routes.classList.add("reservation-route-text");

      for (var l = 0; l < flightStopCode.length; l++) {
        var code = flightStopCode[l].code;
        var plane = flightStopCode[l].planeAssign;

        for (m = 0; m < airportObjects.length; m++) {
          var airportObject = airportObjects[m];

          if (airportObject.airportCode === code) {
            var routeText = document.createElement("p");
            routeText.classList.add("reservation-route-text");
            routeText.innerHTML = airportObject.airportShortName;
            stops.appendChild(routeText);

            if (plane !== null) {
              for (n = 0; n < airlineObjects.length; n++) {
                var airlineObject = airlineObjects[n];

                var wifi = document.createElement("img");
                wifi.classList.add("reservation-route-wifi");

                if (airlineObject.number === plane.number) {
                  if (airlineObject.wifi) {
                    wifi.src = "../Images/wifi.png";
                    stops.appendChild(wifi);
                  } else {
                    wifi.src = "../Images/no-signal.png";
                    stops.appendChild(wifi);
                  }
                }
              }
            }
          }
        }
      }

      // stops.appendChild(routes);

      if (flightDestination !== null && flightDestination) {
        dotRight = document.createElement("div");
        dotRight.classList.add("reservation-route-dots");
        stops.appendChild(dotRight);
      }

      var stopsLine = document.createElement("div");
      stopsLine.classList.add("reservation-route-line");

      stops.appendChild(stopsLine);

      ////////////// Waiting Time //////////////s

      var waitingTime = document.createElement("div");
      waitingTime.classList.add("reservation-route-waiting-time");

      locations.appendChild(waitingTime);

      for (o = 0; o < flightStopCode.length; o++) {
        var code = flightStopCode[o].code;
        var time = flightStopCode[o].waitingTime;

        for (p = 0; p < airportObjects.length; p++) {
          var airportObject = airportObjects[p];
          if (airportObject.airportCode === code) {
            var waitingTimeText = document.createElement("p");
            waitingTimeText.innerHTML = "+ " + time;
            waitingTime.appendChild(waitingTimeText);
          }
        }
      }

      ////////////// Price Details //////////////

      var priceDetailEconomy = document.createElement("div");
      priceDetailEconomy.classList.add("reservation-price-detail");

      list.appendChild(priceDetailEconomy);

      var priceEconomyPrice = document.createElement("p");
      priceEconomyPrice.innerHTML = "$" + flightObject.economy;

      var priceEconomyText = document.createElement("p");
      priceEconomyText.innerHTML = "";

      priceDetailEconomy.appendChild(priceEconomyPrice);
      priceDetailEconomy.appendChild(priceEconomyText);

      var priceDetailPremium = document.createElement("div");
      priceDetailPremium.classList.add("reservation-price-detail");

      list.appendChild(priceDetailPremium);

      var pricePremiumPrice = document.createElement("p");
      pricePremiumPrice.innerHTML = "$" + flightObject.premium;

      var pricePremiumText = document.createElement("p");
      pricePremiumText.innerHTML = "Mixed cabin";

      priceDetailPremium.appendChild(pricePremiumPrice);
      priceDetailPremium.appendChild(pricePremiumText);

      var priceDetailBusiness = document.createElement("div");
      priceDetailBusiness.classList.add("reservation-price-detail");

      list.appendChild(priceDetailBusiness);

      var priceBusinessPrice = document.createElement("p");
      priceBusinessPrice.innerHTML = "$" + flightObject.business;

      var priceBusinessText = document.createElement("p");
      priceBusinessText.innerHTML = "Includes lie-flat seats";

      priceDetailBusiness.appendChild(priceBusinessPrice);
      priceDetailBusiness.appendChild(priceBusinessText);

      lists.appendChild(list);
    }
  }
}

function reservationFlights() {
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

  for (i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Assign

    formOption = document.createElement("option");
    formOption.value = airportObject.location;
    formOption.innerHTML = airportObject.location;
    from.appendChild(formOption);
  }

  for (i = 0; i < airportObjects.length; i++) {
    var airportObject = airportObjects[i]; // Assign

    formOption = document.createElement("option");
    formOption.value = airportObject.location;
    formOption.innerHTML = airportObject.location;
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

  Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + days);
    return this;
  };

  var sevenDays = new Date().addDays(7);
  var fourteenDays = new Date().addDays(14);
  var yearDays = new Date().addDays(365);

  function dateConvert(date) {
    return date.toISOString().split("T")[0];
  }

  var startDate = document.querySelector(".start-date");
  startDate.value = dateConvert(sevenDays);
  startDate.min = dateConvert(sevenDays);
  startDate.max = dateConvert(yearDays);

  var returnDate = document.querySelector(".end-date");
  returnDate.value = dateConvert(fourteenDays);
  returnDate.min = dateConvert(sevenDays);
  returnDate.max = dateConvert(yearDays);
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

var validation = false,
  registration = [],
  registerObject = {};

function SignInSubmission() {
  var signInFormSubmission = document.getElementById("login");

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
  var validation = false;
  var signUpFormSubmission = document.getElementById("signup");

  signUpFormSubmission.addEventListener("submit", (e) => {
    e.preventDefault();

    var getRegistrations = grabLocalStorageRegistration();
    var inputs = e.target.querySelectorAll("select, input ,textarea");

    for (var i = 0; i < inputs.length; i++) {
      var submitForm = inputValidation(inputs[i]);
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
