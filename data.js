const { fakerES, fakerEN_US, fakerTR, fakerPL } = require('@faker-js/faker');
const { createHash } = require('crypto');
const express = require('express');
const router = express.Router();
const initErrorFunction = require('./error');

const fakerLocaleType = (location) => {
    switch (location) {
        case 'es':
            return fakerES;
        case 'en':
            return fakerEN_US;
        case 'tr':
            return fakerTR;
        case 'pl':
            return fakerPL;
        default:
            return fakerEN_US;
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

    const fakeName = fakeLocale.person.fullName();
    const fakeEmail = fakeLocale.internet.email();

    return {
        id: `${seed}${fakeName.substring(0, 5).toLowerCase()}${fakeEmail.substring(0, 5).toLowerCase()}`,
        name: fakeName,
        email: fakeEmail,
        phone: fakeLocale.phone.number(),
        house: fakeLocale.location.buildingNumber(),
        street: fakeLocale.location.street(),
        city: fakeLocale.location.city(),
        country: getCountry(region),
        zipCode: fakeLocale.location.zipCode()
    }
};

const resultsCompiler = (seed, page, region) => {
    let results = [];
    let itemsPerPage;

    if (page === 1) {
        itemsPerPage = 20;
    } else {
        itemsPerPage = 10;
    }

    for (let i = 0; i < itemsPerPage; i++) {
        const fakeData = generateFakeData(seed + page + i, region);
        results.push(fakeData);
    }
    return results;
}

router.post('/', (req, res) => {
    const seed = parseInt(req.body.seed) || 0;
    const page = parseInt(req.body.page) || 1;
    const fakeData = resultsCompiler(seed, page, req.body.region);
    const result = initErrorFunction(fakeData, req.body.errors);

    res.json(result);
});


module.exports = router;
