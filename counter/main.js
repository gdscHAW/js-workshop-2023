const increaseButton = window.document.getElementById("increase-button");
const count = window.document.getElementById("count");

function increaseCount() {
  const currentCount = parseInt(count.innerText);
  count.innerText = currentCount + 1;
}

increaseButton.addEventListener("click", increaseCount);
