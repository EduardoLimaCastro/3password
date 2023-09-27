const slider = document.getElementById("myslider");
const sliderValue = document.getElementById("value_slider");
const strengthElement = document.getElementById("strength_value");
const passwordElement = document.getElementById("password");
const upperElement = document.getElementById("upperCheck");
const lowerElement = document.getElementById("lowCheck");
const numbersElement = document.getElementById("numbersCheck");
const symbolsElement = document.getElementById("symbolsCheck");
const btnCopyElement = document.getElementById("copy");
const generateElement = document.getElementById("generateBtn");
const tooWeakElement = document.getElementById("tooWeak");
const weakElement = document.getElementById("weak");
const mediumElement = document.getElementById("medium");
const strongElement = document.getElementById("strong");
const copiedElement = document.getElementById("copied");

const randomFunc={
    lower: getRandonLow,
    upper: getRandonUpper,
    number: getRandowNumber,
    symbol: getRandowSymbol
}

//------------------------EVENTS--------------------
//GENERATE BUTTON
generateElement.addEventListener("click",()=>{
    const length = +slider.value; //the + makes const length a type number
	const hasLower = lowerElement.checked;
	const hasUpper = upperElement.checked;
	const hasNumber = numbersElement.checked;
	const hasSymbol = symbolsElement.checked;

    passwordElement.innerHTML = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol,length);

    passwordStrength(hasLower,hasNumber,hasSymbol,hasUpper);
    passwordElement.style.opacity='1';
    copiedElement.style.display='none';
})

//COPY TO CLIPBOARD

btnCopyElement.addEventListener("click", ()=>{
    const password = passwordElement.textContent;
    navigator.clipboard.writeText(`${password}`);
    copiedElement.style.display='block';
})

//----------------------FUNCTIONS------------------
//GENERATE PASSWORD
function generatePassword(lower,upper,number,symbol,length){
    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;
    const typesArray = [{ lower },{ upper },{ number },{ symbol }].filter
    (
        item => Object.values(item)[0]
    );
    if(typesCount === 0){
        alert('You should select at least one checkbox')
        return '';        
    }
    if(typesCount <= length){
        for(i=0; i<length; i+=typesCount){
            typesArray.forEach(type =>{
                const funcName = Object.keys(type)[0];
                generatedPassword += randomFunc[funcName]();
            })    
        }
    }else{
        alert(`Length should be at least ${typesCount}`)
    }
    generatedPassword = generatedPassword.substring(0,length)
    return generatedPassword
}

function passwordStrength(lower,upper,number,symbol){
    const typesCount = lower + upper + number + symbol;

    if(typesCount === 2){
        strengthElement.innerText = 'WEAK';
        color = '#FB7C58'
        tooWeakElement.style.backgroundColor = color;
        weakElement.style.backgroundColor = color;
    }
    if(typesCount === 3){
        strengthElement.innerText = 'MEDIUM';
        color = '#F8CD65'
        tooWeakElement.style.backgroundColor = color;
        weakElement.style.backgroundColor = color;
        mediumElement.style.backgroundColor = color;
    }
    if(typesCount === 4){
        strengthElement.innerText = 'STRONG';
        color = '#A4FFAF'
        tooWeakElement.style.backgroundColor = color;
        weakElement.style.backgroundColor = color;
        mediumElement.style.backgroundColor = color;
        strongElement.style.backgroundColor = color;
    }
}

//SLIDER
sliderValue.innerHTML = slider.value;

slider.oninput = function(){
    sliderValue.innerHTML = this.value;
}

slider.addEventListener("mousemove", function() {
    var x = slider.value * 5 - 2;
    var color = 'linear-gradient(90deg, rgba(164, 255, 175, 1)' + x + '%, rgba(24, 23, 31, 1)' + x + '%)';
    slider.style.background = color;
})

//GENERATE-FUNCTIONS
function getRandonLow(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 97);
}
function getRandonUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 65);
}
function getRandowNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10) + 48);
}
function getRandowSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}