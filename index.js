//up button
let scroll_button = document.getElementById("scrolling");
window.addEventListener("scroll", function () {
  var scrollHeight = document.documentElement.scrollTop;

  if (scrollHeight > 100) {
    scroll_button.classList.add("scroll-up-show");
  } else {
    scroll_button.classList.remove("scroll-up-show");
  }
});
scroll_button.onclick = () => {
  scroll({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
setInterval(function () {
  scroll_button.classList.remove("scroll-anmi");
  scroll_button.offsetWidth;
  scroll_button.classList.add("scroll-anmi");
}, 5000);




// login
var loginIcon = document.getElementById("login-icon-nav");
var loginDropDown = document.getElementById("dropDownLogin");
console.log(loginDropDown);
console.log(loginIcon);

function showLogin() {
  if (loginDropDown.style.visibility == "hidden") {
    loginDropDown.style.visibility = "visible";
    loginDropDown.style.opacity = "1";
  } else {
    loginDropDown.style.visibility = "hidden";
    loginDropDown.style.opacity = "0";
  }
}
document.addEventListener("click", function (event) {
  if (!loginIcon.contains(event.target)) {
    loginDropDown.style.visibility = "hidden";
    loginDropDown.style.transition = "0.4s";
  }
});
document.addEventListener("click", function (event) {
  if (loginDropDown.contains(event.target)) {
    loginDropDown.style.visibility = "visible";
  }
});

//mouse move

var mouse1 = document.getElementById("mouse-1");
var mouse2 = document.getElementById("mouse-2");

document.addEventListener("mousemove", function (e) {
  mouse1.style.cssText = mouse2.style.cssText =
    "left: " + e.clientX + "px; top: " + e.clientY + "px;";
});

//aos animation
AOS.init();

//owl carusel
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 15,

    dots: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
      },
      610: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
});

// api section
var box = document.getElementById("box");
var load = document.getElementById("load-more");
var row = document.getElementById("api-row");

var startIndex = 0; // Start index of the items to be displayed

function ajRequest() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var returnedValues = JSON.parse(this.responseText);
      var res = returnedValues;

      var endIndex = startIndex + 8; // Calculate the end index of the items
      console.log(startIndex);
      for (let i = startIndex; i < endIndex; i++) {
        row.innerHTML += `
                  <div class="outer col-lg-3 col-md-4 col-sm-6">
                    <div class="api-div-inner">
                      <img src="${res[i].img}" alt="">
                      <div class="api-first-overlay">
                        <h1>${res[i].name}</h1>
                      </div>
                      <div class="api-second-overlay"></div>
                      <div class="api-third-overlay">
                        <p>${res[i].description}</p>
                      </div>
                    </div>
                  </div>`;
        console.log(startIndex);
      }
      startIndex = endIndex;

      if (startIndex >= res.length) {
        load.style.display = "none";
      }
    }
  };

  xhttp.open("GET", "https://blog-json-server-omega.vercel.app/games", true);
  xhttp.send();
}

ajRequest(); // Call the function to load the first 6 items

load.addEventListener("click", ajRequest); // Call the function on button click

//--------------------------------------------------- leftside navbar -----------------------------------------------//

// declaring the left side navbar
var firstHeader = document.getElementById("first-head-nav");
var navLeftMove = document.getElementById("NavLeft");
var layerGray = document.getElementById("layerNav");
function navUp() {
  firstHeader.style.top = "-80px";
  navLeftMove.style.left = "0";
  layerGray.style.left = "0";
}

function normalState() {
  firstHeader.style.top = "0";
  navLeftMove.style.left = "-70%";
  layerGray.style.left = "-100%";
}

// toggle class with animation
$(document).ready(function () {
  $(".homeli").click(function () {
    $("#homeFun").toggleClass("drops");
  });

  $(".aboutli").click(function () {
    $("#aboutFun").toggleClass("drops");
  });

  $(".blogli").click(function () {
    $("#blogFun").toggleClass("drops");
  });

  $(".blogStylesli").click(function () {
    $("#blogStylesFun").toggleClass("drops");
  });

  $(".gamesli").click(function () {
    $("#gamesFun").toggleClass("drops");
  });

  $(".gameListli").click(function () {
    $("#gameListFun").toggleClass("drops");
  });

  $(".pagesli").click(function () {
    $("#pagesFun").toggleClass("drops");
  });

  $(".contactli").click(function () {
    $("#contactFun").toggleClass("drops");
  });
});

//--------------------------------- count down ---------------------------------------------//

var displayElement = document.getElementById("countdown-hide");
var endDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
function countdown(endDate) {
  var countdownInterval = setInterval(function () {
    var now = new Date().getTime();
    var distance = endDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      displayElement.style.display = "none";
    }

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer-day").innerHTML = days;
    document.getElementById("timer-hours").innerHTML = hours;
    document.getElementById("timer-minutes").innerHTML = minutes;
    document.getElementById("timer-seconds").innerHTML = seconds;
  }, 1000);
}
countdown(endDate);

//------------------------------------------------------- product----------------------------------------------//
$(function () {
  $(".xzoom, .xzoom-gallery").xzoom({
    zoomWidth: 300,
    zoomHeight: 400,
    tint: "#333",
    Xoffset: 10,
    Yoffset: 0,
    position: "inside",
    fadeTrans: true,
  });
});

// getting username from local storage
var useNameLogin = document.getElementById("userNameValue");

var x = localStorage.getItem("user");

useNameLogin.innerHTML = x;

// --------------shopping function

var subTotal = document.getElementById("subTotal");
var shipping = document.getElementById("shipping");
var totalCost = document.getElementById("totalCost");
var minusButton = document.getElementById("minusButton");
var plusButton = document.getElementById("plusButton");
var shoppingSpan = document.getElementById("shopping-span");
var cost = 350;
var ship = 50;
var total = cost + ship;

plusButton.addEventListener("click", function () {
  shoppingSpan.textContent++;
  subTotal.innerHTML = shoppingSpan.textContent * cost;
  shipping.innerHTML = ship;
  totalCost.innerHTML = +subTotal.innerHTML + +ship;
});

minusButton.addEventListener("click", function () {
  if (shoppingSpan.textContent == 0) {
    return;
  } else {
    shoppingSpan.textContent--;
    subTotal.innerHTML -= 350;
    totalCost.innerHTML -= 350;


  }
  if (shoppingSpan.textContent == 0) {
    shipping.innerHTML = 0;
    totalCost.innerHTML=0;
  }
});
