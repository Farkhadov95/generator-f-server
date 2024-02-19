const deleteCharacter = (str) => {
    const index = Math.floor(Math.random() * str.length);
    return str.slice(0, index) + str.slice(index + 1);
}

const addRandomCharacter = (str) => {
    const index = Math.floor(Math.random() * str.length);
    const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Random lowercase letter
    return str.slice(0, index) + randomChar + str.slice(index);
}

const swapNearCharacters = (str) => {
    const index = Math.floor(Math.random() * (str.length - 1));
    return str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2);
}

const errorFunctions = [deleteCharacter, addRandomCharacter, swapNearCharacters];

const applyRandomError = (data) => {
    const errorFunction = errorFunctions[Math.floor(Math.random() * errorFunctions.length)];
    return errorFunction(data);
}

const initErrorFunction = (data, errorCount) => {
    const MAX_ERRORS = 1000;
    const errorsToRun = errorCount > 1000 ? MAX_ERRORS : errorCount;

    if (errorsToRun === 0) {
        return data;
    }

    for (let i = 0; i < errorsToRun; i++) {
        const randomProperty = Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)];
        data[randomProperty] = applyRandomError(data[randomProperty]);
    }

    return data;
}

module.exports = initErrorFunction;
