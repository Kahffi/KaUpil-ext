const modeSelector = document.querySelector(".modeSelector")
const advanceSection = document.querySelector(".advance-section")
const simpleSection = document.querySelector(".simple-section")
const executeBtn = document.querySelector("button.execute")
const globalPtEl = document.getElementById("global-point")

let mode = "simple"


// toDisplay and toHide type are Element
function toggleModeDisplay(toDisplay, toHide){
    toDisplay.classList.remove("hidden")
    toHide.classList.add("hidden")
}

modeSelector.addEventListener("click", (e) => {
    const modeIsSimple = e.target.classList.contains("simple")
    if (modeIsSimple){
        modeSelector.classList.replace("simple", "advance")
        toggleModeDisplay(advanceSection, simpleSection)
        mode = "advance"
    } else{
        modeSelector.classList.replace("advance", "simple")
        toggleModeDisplay(simpleSection, advanceSection)
        mode = "simple"
    }

})


executeBtn.addEventListener("click", () => {
    const globalPt = globalPtEl.value
    function sendGlobalPoint(tabs){
        browser.tabs.sendMessage(tabs[0].id, globalPt)
    
    }

    executeBtn.textContent = "Loading"
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(sendGlobalPoint)
        .catch((e) => console.error(e)).finally(() => executeBtn.textContent = "Execute!");
    
})

