const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passWordDisplay = document.querySelector("[data-passwordDisplay]");
// debugger;
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");

const symbols = '$%@!&^(){}[]|"/';

//value store
let password = "";
let passwordLength = 10;
let checkCount = 0;

//call Functions
handleSlider();

//set strength circle color to grey

function setIndicator() {
    indicator.style.backgroundColor = VideoColorSpace;

}




function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

//Indicator Function

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRndInteger(0, 9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length)
    return symbols.charAt(randNum);
}

function clcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasUpper = true;
    if (numbersCheck.checked) hasUpper = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSys) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }

}

async function copyContent() {

    try {
        await navigator.clipboard.writeText(passWordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (e) {
        copyMsg.innerText = "Failed";
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}

function shufflePassword(array) {
    //Fisher Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i * 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handleCheckBoxChange() {
    checkCount = 0;
    allCheckbox.forEach((checkbox) => {
        if (checkbox.checked)
            checkCount++;

    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}


allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange)
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});



copyBtn.addEventListener('click', () => {
    if (passWordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected

    console.log("kya tum yaha tak aye?")
    if (checkCount == 0)
        return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let funcArr = [];
    if (uppercaseCheck.checked)
        funcArr.push(generateUpperCase);
    if (lowercaseCheck.checked)
        funcArr.push(generateLowerCase);
    if (numbersCheck.checked)
        funcArr.push(generateRandomNumber);
    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);
    console.log("kya tum yaha tak aye?---")

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();

    }

    //remaining Addition
    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    //shuffle the password
    passWord = shufflePassword(Array.from(password));

    //show in UI
    passWordDisplay.value = password;
    clcStrength();
});