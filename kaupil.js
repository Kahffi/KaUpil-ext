

browser.runtime.onMessage.addListener((nilai) => {
    autofill(parseInt(nilai))
});

function autofill(nilai = 7, pesan = "mantap") {
	let category = nilai / 3;

	if (category <= 1) {
		category = 1;
	} else if (category <= 2) {
		category = 2;
	} else {
		category = 3;
	}
	let subCategory = nilai - category * 3 + 3;

	for (let i = 1; i <= 20; i++) {
		let numberStr = `${i}`;
		if (i < 10) {
			numberStr = `0${i}`;
		}
		document.getElementById(`K${numberStr}${category}${subCategory}`).click();
	}
	document.querySelector("textarea").value = pesan;
}
