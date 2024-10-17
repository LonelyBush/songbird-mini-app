
let result = JSON.stringify(localStorage["scoreResult"])

let trim = Number (result.replace(/"/ig, ""));
console.log(trim)

const resultText = document.querySelector(".result-text")
let resetBtn = document.querySelector(".reset-btn")

if (trim == 30){
    
    resetBtn.classList.add("hide");
    resultText.textContent ="Вы набрали максимальное количество баллов !"
    
} else {
    
    resultText.textContent = `Вы прошли викторину и набрали ${trim} из 30 возможных баллов !`
}

resetBtn.addEventListener("click", function(){
    document.location = "quiz.html"
   // localStorage.clear()
})
