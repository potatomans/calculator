function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b == 0) {
        return "Cannot divide by 0!"
    }
    return Math.round((a / b) * 1000000) / 1000000 // rmb to round off decimals here. also rmb to display a snarky message if dividing by 0
}

let firstNum = []
let firstNumInt = undefined
let operator = ''
let secondNum = []
let secondNumInt = undefined
let displayValue = ''

function operate(firstNum, operator, secondNum) {
    if (operator == '+') {
        return add(firstNum, secondNum)
    }
    else if (operator == '-') {
        return subtract(firstNum, secondNum)
    }
    else if (operator == 'x') {
        return multiply(firstNum, secondNum)
    }
    else if (operator == '/') {
        return divide(firstNum, secondNum)
    }
}

function show(char) {
    displayValue = char
    display = document.querySelector('.display')
    display.textContent = displayValue
}

numbers = document.querySelectorAll('.number')
numbers.forEach((num) => {
    num.addEventListener('click', () => {
        if (firstNumInt == undefined) {
            firstNum.push(parseInt(num.id)) // need to have condition to check when you push to firstNum and when you push to secondNum
            temp = firstNum.reduce((accum, digit) => (accum * 10) + digit, 0) // need to store it somewhere. also the join func returns a string
            show(temp)
        }
        else {
            secondNum.push(parseInt(num.id)) // need to have condition to check when you push to firstNum and when you push to secondNum
            temp = secondNum.reduce((accum, digit) => (accum * 10) + digit, 0) // need to store it somewhere. also the join func returns a string
            show(temp)        
        }
    })
})

operators = document.querySelectorAll('.operator') 
operators.forEach((sign) => {
    sign.addEventListener('click', () => {
        if (firstNumInt == undefined) {
            firstNumInt = firstNum.reduce((accum, digit) => (accum * 10) + digit, 0)
        }
        else {
            secondNumInt = secondNum.reduce((accum, digit) => (accum * 10) + digit, 0)
            result = operate(firstNumInt, operator, secondNumInt)
            show(result) // at this point, firstNum = [2, 0] and secondNum = [3]. firstNumInt = 20 and secondNumInt = 3. result = 23. you want firstNumInt = 23 and firstNum = [???]
            firstNumInt = result // have to update array too
            secondNum = [] // need to empty out secondNum to store new number
            secondNumInt = undefined // empty out secondNumInt to store new num
        }
        if (sign.id != '=') {
            operator = sign.id // the operator needs to store the previous operator, not update it with a new one. hence, it is below.
        }
    })
})

// call join func when operator is pressed

clear = document.querySelector('.clear') // set Ints to be undefined
clear.addEventListener('click', () => {
    firstNum = []
    secondNum = []
    firstNumInt = undefined
    secondNumInt = undefined
    show('')
})


/** take in first number and store it (firstNum shld be an array, only afterwards do u parseInt(arr))
 * take in operator and store it (have an exception where if secondNum empty then don't calculate?)
 * take in 2nd number and store it
 * make the calculation and store the result as firstNum
 * if user presses equal, display firstNum
 * if user presses operator, store it
 * if user presses another number, store it
 * make calculation again
 * realise that the above is a loop that breaks only when equal is pressed
 */