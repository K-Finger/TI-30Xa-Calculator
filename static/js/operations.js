//A = SAVED NUMBER
//B = CURRENT NUMBER
//SECOND = isSecondMode

export function add(a, b, second) {
    return a + b;
}

export function subtract(a, b, second) {
    return a - b;
}

export function multiply(a, b, second) {
    return a * b;
}

export function divide(a, b, second) {
    if (b !== 0) return a / b;
    console.error("Cannot divide by zero");
    return "Error";
}

export function log(a, second) {
    if (a > 0) return Math.log10(a);
    console.error("Logarithm is undefined for non-positive numbers");
    return "Error";
}

export function ln(a, second) {
    if (a > 0) return Math.log(a);
    console.error("Natural logarithm is undefined for non-positive numbers");
    return "Error";
}

export function e(_, second) {
    return Math.E;
}

export function pi(_, second) {
    return Math.PI
}


export function sqrt(a, second) {
    if (a >= 0) return Math.sqrt(a);
    console.error("Square root is undefined for negative numbers");
    return "Error";
}

export function negate(a, second) {
    return a * -1;
}

export function square(a, second) {
    return a * a;
}

export function reciprocal(a, second) {
    if (a !== 0) return 1 / a;
    console.error("Reciprocal is undefined for zero");
    return "Error";
}

export function sin(a, second) {
    if (second) {
        // Handle arcsin (inverse sine)
        if (a >= -1 && a <= 1) return Math.asin(a); // Valid domain: [-1, 1]
        console.error("Arcsin is undefined for values outside [-1, 1]");
        return "Error";
    }
    // Handle regular sine
    return Math.sin(a);
}

export function cos(a, second) {
    if (second) {
        if (a >= -1 && a <= 1) return Math.acos(a); // Valid domain: [-1, 1]
        console.error("Arccos is undefined for values outside [-1, 1]");
        return "Error";
    }
    return Math.cos(a);
}

export function tan(a, second) {
    if (second) {
        return Math.atan(a);
    }
    return Math.tan(a);
}