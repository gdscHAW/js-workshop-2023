const count = window.document.getElementById("count");

function increaseCount(delta) {
  const currentCount = parseInt(count.innerText);
  count.innerText = currentCount + delta;
}

const innerHeight = window.innerHeight;
const yCenter = innerHeight / 2;

addEventListener("mousemove", handleMouseMove);

function handleMouseMove(mouseMoveEvent) {
  const y = mouseMoveEvent.pageY;

  if (y < yCenter) {
    increaseCount(-1);
  } else {
    increaseCount(1);
  }
}
