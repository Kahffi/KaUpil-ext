const globalPtEl = document.getElementById("global-point");
const isRandomEl = document.getElementById("is-randomize");
const randomizeOptEl = document.querySelector(".options");
const critiqueEl = document.getElementById("critique");
const randomMin = document.getElementById("randomize-min");
const randomMax = document.getElementById("randomize-max");
const form = document.querySelector("form");
let payload = {
  isRandomize: false,
};

// initialize form from previous input
document.addEventListener("DOMContentLoaded", async () => {
  const result = await browser.storage.local.get([
    "globalPoint",
    "isRandomize",
    "critique",
    "randomizeMin",
    "randomizeMax",
  ]);

  if (result.globalPoint) {
    globalPtEl.value = result.globalPoint;
  }
  if (result.isRandomize) {
    isRandomEl.checked = true;
    randomizeOptEl.classList.remove("hidden");
  }
  if (result.critique) {
    critiqueEl.value = result.critique;
  }
  if (result.randomizeMin) {
    randomMin.value = result.randomizeMin;
  }
  if (result.randomizeMax) {
    randomMax.value = result.randomizeMax;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  for (const [key, val] of formData.entries()) {
    payload = { ...payload, [key]: val };
  }

  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => browser.tabs.sendMessage(tabs[0].id, payload))
    .catch((e) => console.error(e));

  browser.storage.local.set(payload);
});

function showRandomizeFields(isRandomize) {
  if (isRandomize) {
    randomizeOptEl.classList.remove("hidden");
  } else {
    randomizeOptEl.classList.add("hidden");
  }
}

isRandomEl.addEventListener("change", (e) => {
  const isRandomize = e.target.checked;
  showRandomizeFields(isRandomize);
  payload = { ...payload, isRandomized: isRandomize };
});
