// payload
//
// { isRandomize: "true",
// 	globalPoint: "",
// 	critique: "",
// 	randomizeMin: "",
// 	randomizeMax: "",
// 	isRandomized: true
// }

// step detection
// There's no id provided inside the page, the only way i could
// think of is through completed step counter which is indicated
// with yellow background. So just query it and pick up the last element
const currentStep = [...document.querySelectorAll("td")]
  .filter((e) => {
    return getComputedStyle(e).backgroundColor == "rgb(255, 255, 0)";
  })
  .pop()
  .textContent.match(/\d/g)[0];

//   msg: {
// 	type: String,
// 	msg: String
//   }
function connectionHandler(msg, port) {
  switch (msg.type) {
    // Initial connection expecting content-script to tell
    // the current step
    case "initial-connection":
      handleInitialConnection(port);
  }
}

function handleInitialConnection(port) {
  port.postMessage({ type: "step-update", msg: currentStep });
}

browser.runtime.onConnect.addListener((port) => {
  if (port.name === "popup-connection") {
    port.onMessage.addListener((msg) => {
      connectionHandler(msg, port);
    });
  }
});

browser.runtime.onMessage.addListener((payload) => {
  autofill(
    parseInt(payload.globalPoint),
    payload.critique,
    payload.isRandomize,
    parseInt(payload.randomizeMin),
    parseInt(payload.randomizeMax)
  );
});

function autofill(nilai = 7, pesan = "mantap", isRandomize, min, max) {
  for (let i = 1; i <= 20; i++) {
    if (isRandomize) {
      nilai = getRandomizeInt(min, max);
    }
    let category = Math.ceil(nilai / 3);
    let subCategory = nilai - category * 3 + 3;

    let numberStr = `${i}`;
    if (i < 10) {
      numberStr = `0${i}`;
    }
    document.getElementById(`K${numberStr}${category}${subCategory}`).click();
  }
  document.querySelector("textarea").value = pesan;
}

function getRandomizeInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
