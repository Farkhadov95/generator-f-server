const deleteCharacter = (str) => {
    const index = Math.floor(Math.random() * str.length);
    return str.slice(0, index) + str.slice(index + 1);
}

const addRandomCharacter = (str) => {
    const index = Math.floor(Math.random() * str.length);
    const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
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

const initErrorFunction = (dataArray, errorCount) => {
    const MAX_ERRORS = 1000;
    const errorsToRun = Math.min(errorCount, MAX_ERRORS);

    if (errorsToRun === 0) {
        return dataArray;
    }

    const result = dataArray.map((data) => {
        const processedData = { ...data };
        for (let i = 0; i < errorsToRun; i++) {
            let randomKey;
            do {
                randomKey = Object.keys(processedData)[Math.floor(Math.random() * Object.keys(processedData).length)];
            } while (randomKey === "id");

            processedData[randomKey] = applyRandomError(processedData[randomKey]);
        }


        return processedData;
    });

    return result;
};



module.exports = initErrorFunction;
