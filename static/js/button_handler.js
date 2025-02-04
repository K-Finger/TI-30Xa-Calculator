import * as operations from './operations.js';
const display = document.getElementById("calculatorInput");

let currentNumber = "0"; // Store as a string to handle decimals
let savedNumber = 0;
let currentOperation = null;
let resetCurrentNumber = false; // Flag to indicate when to reset the current number
let isSecondMode = false;
let secondModeFlag = false;

function handleButtonPress(event) {
    const button = event.target;
    const buttonValue = button.textContent.trim(); // Get button text
    const buttonID = button.id;

    console.log(`Button pressed: ${buttonID}, Value: ${buttonValue}`);
    console.log(`Current number before: ${currentNumber}`);

    if (!isNaN(buttonValue)) {
        // Handle number input
        if (resetCurrentNumber) {
            currentNumber = ""; // Reset currentNumber for a new input
            resetCurrentNumber = false;
        }
        // Append the new digit
        currentNumber = currentNumber === "0" ? buttonValue : currentNumber + buttonValue;
        console.log(`Updated current number (after digit): ${currentNumber}`);
        updateDisplay(currentNumber, display);
    } else if (buttonValue === ".") {
        // Handle decimal point
        if (!currentNumber.includes(".")) {
            if (resetCurrentNumber) {
                currentNumber = "0.";
                resetCurrentNumber = false;
            } else {
                currentNumber += ".";
            }
            console.log(`Updated current number (after decimal): ${currentNumber}`);
            updateDisplay(currentNumber, display);
        }
    } else {
        // Handle other actions
        handleAction(buttonID);
    }
}

function handleAction(action) {
    try {
        const operationFunction = operations[action];
        console.log(operationFunction);

        if (typeof operationFunction === "function") {
            // Check if it's a binary or unary operation
            if (operationFunction.length === 3) {
                if (currentOperation) {
                    savedNumber = currentOperation(
                        parseFloat(savedNumber),
                        parseFloat(currentNumber)
                    );
                } else {
                    savedNumber = parseFloat(currentNumber);
                }

                // Set the current operation
                currentOperation = operationFunction;
                currentNumber = "0"; // Reset the current number
                resetCurrentNumber = true;
                endIfSecondMode
            } else if (operationFunction.length === 2) {
                // Unary operations
                currentNumber = operationFunction(parseFloat(currentNumber), isSecondMode).toString();
                resetCurrentNumber = true; // Prepare for the next input
                updateDisplay(currentNumber, display);
                endIfSecondMode()
            }
        } else if (action === "equals") {
            performEquals();
        } else if (action === "clear") {
            performClear();
        } else if (action === "second") {
            if (isSecondMode === false) {
                isSecondMode = true;
            }
            console.log(isSecondMode);
            secondModeFlag = true;
        } else {
            console.error(`Unknown operation: ${action}`);
        }
    } catch (error) {
        console.error(`Error performing operation '${action}':`, error);
        updateDisplay("Error", display);
    }
}


function endIfSecondMode() {
    if (isSecondMode) {
        isSecondMode = false;
    }
}

function updateDisplay(value, displayElement) {
    if (value === "Error") {
        // Directly display "Error" if the result is an error
        displayElement.textContent = "Error";
    } else if (value.includes(".") && value.endsWith(".")) {
        // Display the value as-is to retain the trailing decimal
        displayElement.textContent = value;
    } else {
        // Ensure the value is treated as a number where possible
        const numericValue = parseFloat(value);

        // Check if the number is already in scientific notation (contains "e")
        if (value.toLowerCase().includes("e")) {
            displayElement.textContent = value; // Display as-is
        } else if (
            Math.abs(numericValue) >= 1e9 || // Large numbers
            (Math.abs(numericValue) < 1e-2 && numericValue !== 0) // Small numbers
        ) {
            // Convert to scientific notation if out of bounds
            const [base, exponent] = numericValue.toExponential(6).split("e");
            displayElement.innerHTML = `${base}<sup>${parseInt(exponent)}</sup>`;
        } else if (value.toString().length > 9) {
            // Truncate if the value is too long
            const roundedValue = parseFloat(numericValue.toPrecision(9)); // Strip trailing zeros
            displayElement.textContent = roundedValue.toString();
        } else {
            // Display the value as-is for smaller values
            displayElement.textContent = numericValue.toString();
        }
    }
}



function performEquals() {
    if (currentOperation) {
        currentNumber = currentOperation(
            parseFloat(savedNumber),
            parseFloat(currentNumber)
        ).toString();
        savedNumber = 0;
        currentOperation = null;
        resetCurrentNumber = true;
        updateDisplay(currentNumber, display);
    }
}

function performClear() {
    ({ currentNumber, savedNumber, currentOperation, resetCurrentNumber } =
        resetCalculator((value) => updateDisplay(value, display)));
}

function resetCalculator(updateDisplay) {
    const currentNumber = "0";
    const savedNumber = 0;
    const currentOperation = null;
    const resetCurrentNumber = false;
    updateDisplay(currentNumber);
    return { currentNumber, savedNumber, currentOperation, resetCurrentNumber };
}

/*
function commitOperation(currentOperation, savedNumber, currentNumber) {
    if (currentOperation) {
        savedNumber = currentOperation(parseFloat(savedNumber), parseFloat(currentNumber));
    } else {
        savedNumber = parseFloat(currentNumber);
    }
    currentNumber = "0";
    return { savedNumber, currentNumber };
}
*/

// Attach button listeners directly in this script
function attachButtonListeners() {
    const buttons = document.querySelectorAll("#grid-container button");
    console.log(`Found ${buttons.length} buttons`);
    buttons.forEach((button) => {
        button.addEventListener("click", handleButtonPress);
    });
}

// Global flag to track if buttons are already loaded
if (typeof buttonsAreLoaded === "undefined") {
    var buttonsAreLoaded = false; // Ensure the flag is declared globally
}


function waitForButtonsToLoad(callback) {
    const interval = setInterval(() => {
        const buttons = document.querySelectorAll("#grid-container button");
        if (buttons.length > 0) {
            console.log(`Buttons loaded (${buttons.length}). Attaching event listeners...`);
            clearInterval(interval); // Stop polling
            callback();
        }
    }, 100); // Check every 100ms
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded. Waiting for buttons to load...");
    waitForButtonsToLoad(attachButtonListeners);
});
