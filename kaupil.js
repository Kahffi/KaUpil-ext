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
