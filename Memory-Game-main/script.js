let emojes = [
  "🍊",
  "🍊",
  "⚽",
  "⚽",
  "🍒",
  "🍒",
  "🏀",
  "🏀",
  "🍌",
  "🍌",
  "🚘",
  "🚘",
  "🐶",
  "🐶",
  "🍉",
  "🍉",
];
var container = document.getElementById("contain");
var shuffleEmojes = emojes.sort(() => (Math.random() > 0.5 ? 1 : -1));

for (let i = 0; i < emojes.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojes[i];

  box.onclick = function () {
    box.classList.add("boxOpen");
    setTimeout(function () {
      if (document.querySelectorAll(".boxOpen").length > 1) {
        const openBoxes = document.querySelectorAll(".boxOpen");

        if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
          openBoxes[0].classList.add("boxMatch");
          openBoxes[1].classList.add("boxMatch");

          openBoxes[0].classList.remove("boxOpen");
          openBoxes[1].classList.remove("boxOpen");

          if (document.querySelectorAll(".boxMatch").length === emojes.length) {
    
            container.classList.add("flipped");
          }
        } else {
          openBoxes[0].classList.remove("boxOpen");
          openBoxes[1].classList.remove("boxOpen");
        }
      }
    }, 500);
  };

  document.querySelector(".game").appendChild(box);
}
