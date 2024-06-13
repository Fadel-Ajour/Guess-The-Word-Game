// seting Name
let gameName = "Guess The Word"
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Elzero Web School`;

// seting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let curentTries = 1;
let numberOfHints = 2;

// word Manage
let wordToGuess="";
let words  =["Create","Update","Delete","Master","Branch","Mainly","Fadell","Ajourr",]
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase() 


function generateInput(){
    const inputsContainer = document.querySelector(".inputs")
    for (let i = 1; i <= numberOfTries; i++) {
        let tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if(i !== 1) tryDiv.classList.add(`disable-inputs`)
        for(let j = 1; j <= numberOfLetters; j++){
            const input = document.createElement("input")
            input.type ="text"
            input.id = `guess-${i}-Litter-${j}`
            input.setAttribute("maxlength","1")
            tryDiv.appendChild(input)
        }
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus()
    //
    const inputInDisabledDiv = document.querySelectorAll(".disable-inputs input")
    inputInDisabledDiv.forEach((input) => (input.disabled = true))
    //
    const inputs = document.querySelectorAll("input")
    inputs.forEach((input,index)=> {
        input.addEventListener("input",function () {
            this.value = this.value.toUpperCase()
            // nextInput
            const nextInput = inputs[index + 1]
            if (nextInput) nextInput.focus();
        })
        //
        input.addEventListener("keydown",function (event) {
            const curentIndex = Array.from(inputs).indexOf(event.target) 
            if(event.key === "ArrowRight"){
                const nextInput = curentIndex + 1;
                if(nextInput < inputs.length){
                    inputs[nextInput].focus()
                }
            }

            if(event.key === "ArrowLeft"){
                const prevInput = curentIndex - 1;
                if(prevInput >= 0){
                    inputs[prevInput].focus()
                }
            }
        })
    })
}  


const guessButton =document.querySelector(".check")

guessButton.addEventListener("click", handleGuesses)

console.log(wordToGuess)
function handleGuesses() {
    let succesGuess = true;
    for (let i = 1; i <= numberOfLetters; i++) {
        const inputField = document.querySelector(`#guess-${curentTries}-Litter-${i}`)
        const letter = inputField.value.toLowerCase()
        // console.log(letter)
        const actualietter = wordToGuess[i - 1]
        if(letter ===  actualietter){
            inputField.classList.add("yes-in-please")
        }else if(wordToGuess.includes(letter) && letter !== ""){
            inputField.classList.add("not-in-Please")
            succesGuess = false;
        }else{
            inputField.classList.add("no")
            succesGuess = false;
        }
    }
    let messageArea = document.querySelector(".message")
    if (succesGuess) {
        // console.log("win")
        messageArea.innerHTML = `You Win The Word Is<br> <span>${wordToGuess}</span>`
        if (numberOfHints === 2 ) {
            messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`
        }
        
        let allTrise = document.querySelectorAll(".inputs > div")
        allTrise.forEach((tyyDic)=> tyyDic.classList.add("disable-inputs"));
        //؟؟
        guessButton.disabled = true;
        guessButton.classList.add("disable-inputs");
        guessButton.style.cursor = "not-allowed";
        getHintButton.classList.add("disable-inputs")
        getHintButton.disabled = true;
        //؟؟
    }else{
        document.querySelector(`.try-${curentTries}`).classList.add("disable-inputs")
        const curentTryInputs = document.querySelectorAll(`.try-${curentTries} input`)
        curentTryInputs.forEach((input)=> (input.disabled = true))
        
        curentTries++
        const curentNextTryInputs = document.querySelectorAll(`.try-${curentTries} input`)
        curentNextTryInputs.forEach((input)=> (input.disabled = false ))
        console.log(curentTries)

        let el = document.querySelector(`.try-${curentTries}`)
        if (el) {
            document.querySelector(`.try-${curentTries}`).classList.remove("disable-inputs")
            el.children[1].focus()
        }else{
            guessButton.disabled = true;
            guessButton.classList.add("disable-inputs");
            guessButton.style.cursor = "not-allowed";
            getHintButton.classList.add("disable-inputs")
            getHintButton.disabled = true;
            messageArea.innerHTML = `You Lose The Word Is<br> <span>${wordToGuess}</span>`
        }
    }
}
// Mange Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");

getHintButton.addEventListener("click", getHint)

function getHint() {
    if (numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    if (numberOfHints === 0) {
        getHintButton.classList.add("disable-inputs")
        getHintButton.disabled = true
    }
    const enabledInput = document.querySelectorAll("input:not([disabled])")
    const emptyEnabledInput = Array.from(enabledInput).filter((input) => input.value === "")
    // console.log(enabledInput)
    // console.log(emptyEnabledInput)
    if (emptyEnabledInput.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyEnabledInput.length)
        const randonInput = emptyEnabledInput[randomIndex]
        const indexToFill = Array.from(enabledInput).indexOf(randonInput)
        if (indexToFill !== -1) {
            randonInput.value = wordToGuess[indexToFill].toUpperCase()
        }  
        // console.log(randonInput)
    }
}

// handleBackSpace
    function handleBackSpace(event) {
        if (event.key === "Backspace") {
            const inputs = document.querySelectorAll("input:not([disabled])")
            const currentIndex = Array.from(inputs).indexOf(document.activeElement)
            // console.log(currentIndex)
            if (currentIndex >0) {
                const currentInput = inputs[currentIndex ] ;
                const prevInput = inputs[currentIndex - 1];
                currentInput.value =""
                prevInput.value =""
                // التركيز على المدخل السابق
                    prevInput.focus() ;
                
            }
        }
    }

    document.addEventListener("keydown",handleBackSpace)



// onLooad 
window.onload = function (){
    generateInput()
}

