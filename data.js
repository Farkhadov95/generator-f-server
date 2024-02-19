const { fakerES, fakerEN, fakerTR, fakerPL } = require('@faker-js/faker');
const express = require('express');
const router = express.Router();
const initErrorFunction = require('./error');

const fakerLocaleType = (location) => {
    switch (location) {
        case 'es':
            return fakerES;
        case 'en':
            return fakerEN;
        case 'tr':
            return fakerTR;
        case 'pl':
            return fakerPL;
        default:
            return fakerEN;
    }
}

const getCountry = (region) => {
    switch (region) {
        case 'es':
            return 'España';
        case 'en':
            return 'USA'
        case 'tr':
            return 'Türkiye'
        case 'pl':
            return 'Polska'
        default:
            return 'USA'
    }
}

const generateFakeData = (seed, region) => {
    const fakeLocale = fakerLocaleType(region);
    fakeLocale.seed(seed);

    return {
        name: fakeLocale.person.fullName(),
        email: fakeLocale.internet.email(),
        phone: fakeLocale.phone.number(),
        number: fakeLocale.number.int(),
        address: {
            house: fakeLocale.location.buildingNumber(),
            street: fakeLocale.location.street(),
            city: fakeLocale.location.city(),
            country: getCountry(region),
            zipCode: fakeLocale.location.zipCode()
        }
    }
};

const resultsCompiler = (seed, region) => {
    let results = [];
    for (let i = 0; i < 10; i++) {
        const fakeData = generateFakeData(seed + i, region);
        results.push(fakeData);
    }
    return results;
}

router.get('/', (req, res) => {
    const seed = parseInt(42) || 0;
    const fakeData = resultsCompiler(seed, 'es');
    const result = initErrorFunction(fakeData, 10);

    res.json(result);
});

module.exports = router;
