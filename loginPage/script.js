const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const errorNewUsername = document.querySelector(
  ".sign-up-container #errorNewUsername"
);
const errorNewEmail = document.querySelector(
  ".sign-up-container #errorNewEmail"
);
const errorNewPassword = document.querySelector(
  ".sign-up-container #errorNewPassword"
);
const errorPassword = document.querySelector(
  ".sign-in-container #errorPassword"
);
const errorEmail = document.querySelector(".sign-in-container #errorEmail");
const newUsername = document.querySelector(
  ".sign-up-container #newAccUsername"
);
const newEmail = document.querySelector(".sign-up-container #newAccEmail");
const newPassword = document.querySelector(
  ".sign-up-container #newAccPassword"
);
const email = document.querySelector(".sign-in-container #email");
const password = document.querySelector(".sign-in-container #password");
const rememberMe = document.getElementById("rememberMe");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

newUsername.addEventListener("input", function (e) {
  const currentVal = e.target.value;
  let pattern = /^[a-zA-Z](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}$/;
  const valid = pattern.test(currentVal);
  if (valid) {
    errorNewUsername.style.display = "none";
  } else {
    errorNewUsername.style.display = "block";
  }
});

newEmail.addEventListener("input", function (e) {
  const currentVal = e.target.value;
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;

  const valid = pattern.test(currentVal);
  if (valid) {
    errorNewEmail.style.display = "none";
  } else {
    errorNewEmail.style.display = "block";
  }
});

newPassword.addEventListener("input", function (e) {
  const currentVal = newPassword.value;
  let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const valid = pattern.test(currentVal);
  if (valid) {
    errorNewPassword.style.display = "none";
  } else {
    errorNewPassword.style.display = "block";
  }
});

email.addEventListener("input", function () {
  let currentVal = email.value;
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/;
  const valid = pattern.test(currentVal);
  if (valid) {
    errorEmail.style.display = "none";
  } else {
    errorEmail.style.display = "block";
  }
});

function signupForm(e) {
  let nameVal = newUsername.value;
  let emailVal = newEmail.value;
  let passwordVal = newPassword.value;
  let formData = JSON.parse(localStorage.getItem("formData")) || [];

  let exist =
    formData.length &&
    JSON.parse(localStorage.getItem("formData")).some((data) => {
      // console.log(data);
      return (
        data.nameVal.toLowerCase() == nameVal.toLowerCase() &&
        data.emailVal.toLowerCase() == emailVal.toLowerCase()
      );
    });
  if (!exist & rememberMe.checked) {
    formData.push({ nameVal, emailVal, passwordVal });
    localStorage.setItem("formData", JSON.stringify(formData));
    document.getElementById("signupForm").reset();
    document.querySelector(".sign-up-container #newAccUsername").focus();
    alert("You are successfully sign in");
    container.classList.remove("right-panel-active");
  } else {
    alert("Opssss Duplication found");
  }
  e.preventDefault();
}
var exported;

function signinForm(e) {
  e.preventDefault();

  const emailVal = email.value.toLowerCase();
  const passwordVal = password.value;

  const formData = JSON.parse(localStorage.getItem("formData")) || [];
  const matchingData = formData.find((data) => {
    return (
      data.emailVal.toLowerCase() === emailVal &&
      data.passwordVal === passwordVal
    );
  });

  if (matchingData) {
    let username = matchingData.nameVal;
    localStorage.setItem("user", username);
    console.log(username);
    document.location.replace("../index.html");
  } else {
    alert("Incorrect Login Credentials");
  }
}
