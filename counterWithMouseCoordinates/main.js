const count = window.document.getElementById("count");

const innerHeight = window.innerHeight;
const yCenter = innerHeight / 2;

function increaseCount(clickEvent) {
  let delta = -1;

  if (clickEvent.clientY > yCenter) {
    delta = 1;
  }

  const currentCount = parseInt(count.innerText);
  count.innerText = currentCount + delta;
}

addEventListener("click", (e) => increaseCount(e));
