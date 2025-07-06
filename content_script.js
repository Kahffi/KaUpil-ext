// payload
//
// { isRandomize: "true",
// 	globalPoint: "",
// 	critique: "",
// 	randomizeMin: "",
// 	randomizeMax: "",
// 	isRandomized: true
// }
const cfg = JSON.parse(localStorage.getItem("config"));

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

if (cfg) {
  switch (currentStep) {
    case "3":
      goAnswer();
      break;
    case "4":
      autofill(
        parseInt(cfg.payload.globalPoint),
        cfg.payload.critique,
        cfg.payload.isRandomize,
        parseInt(cfg.payload.randomizeMin),
        parseInt(cfg.payload.randomizeMax)
      );
      document.querySelector('input[type="submit"]').click();
      break;
  }
}

function goAnswer() {
  if (cfg.status === "complete") {
    return;
  }
  console.log("Hellow?");
  // blind pick navigation button to step 4
  const navBtn = document.querySelector('input[type="submit"]');
  if (navBtn === null) {
    localStorage.setItem("config", { ...cfg, status: "complete" });
    alert("complete");
    return;
  }
  navBtn.click();
}

browser.runtime.onMessage.addListener((payload) => {
  if (currentStep !== "3") alert("Arahkan ke step 3 terlebih dahulu");
  // save config to local storage
  localStorage.setItem(
    "config",
    JSON.stringify({ payload: payload, status: "processing" })
  );
  goAnswer();
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
