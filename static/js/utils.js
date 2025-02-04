export function handleNumberInput(text, currentNumber, resetCurrentNumber, updateDisplay) {
    if (resetCurrentNumber) {
        currentNumber = "0"; // Reset currentNumber for a new input
        resetCurrentNumber = false;
    }
    // Append the new digit
    currentNumber = currentNumber === "0" ? text : currentNumber + text;
    updateDisplay(currentNumber);
    return { currentNumber, resetCurrentNumber };
}

export function handleDecimalInput(currentNumber, resetCurrentNumber, updateDisplay) {
    if (resetCurrentNumber) {
        currentNumber = "0."; // Start a new number with a decimal
        resetCurrentNumber = false;
    } else if (!currentNumber.includes(".")) {
        currentNumber += "."; // Append a decimal point only if it doesn't exist
    }
    updateDisplay(currentNumber);
    return { currentNumber, resetCurrentNumber };
}

export function updateDisplay(value, displayElement) {
    const numericValue = parseFloat(value); // Ensure the value is treated as a number

    if (Math.abs(numericValue) >= 1e9 || (Math.abs(numericValue) < 1e-6 && numericValue !== 0)) {
        // Convert to scientific notation and display
        const [base, exponent] = numericValue.toExponential(6).split("e");
        displayElement.innerHTML = `${base}<sup>${parseInt(exponent)}</sup>`;
    } else if (value.toString().length > 9) {
        // Truncate to fit the display for non-scientific cases
        const roundedValue = parseFloat(numericValue.toPrecision(9)); // Use parseFloat to strip trailing zeros
        displayElement.textContent = roundedValue.toString();
    } else {
        // Display the number as-is for smaller values, removing unnecessary trailing zeros
        displayElement.textContent = parseFloat(numericValue.toString()).toString();
    }
}

export function resetCalculator(updateDisplay) {
    const currentNumber = "0";
    const savedNumber = 0;
    const currentOperation = null;
    const resetCurrentNumber = false;
    updateDisplay(currentNumber);
    return { currentNumber, savedNumber, currentOperation, resetCurrentNumber };
}

export function commitOperation(currentOperation, savedNumber, currentNumber) {
    if (currentOperation) {
        savedNumber = currentOperation(parseFloat(savedNumber), parseFloat(currentNumber));
    } else {
        savedNumber = parseFloat(currentNumber);
    }
    currentNumber = "0";
    return { savedNumber, currentNumber };
}
