const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')

var created_user;
var valid_name;
var valid_surname;


Given('a valid user name {string} and surname {string}', function (name, surname) {
    valid_name = name;
    valid_surname = surname;
});

When('I create a DBUser with the provided information', function () {
    try {
        created_user = new sqljs.DBUser(valid_name, valid_surname);
    } catch (error) {
        this.lastError = error.message;
    }
});

Then('the DBUser should be created successfully', function () {
    if (!created_user) {
        throw new Error("User was not created successfully.");
    }
});

Then('the DBUser\'s name should be {string}', function (expectedName) {
    if (created_user.name !== expectedName) {
        throw new Error(`Expected user's name to be "${expectedName}", but got "${created_user.name}".`);
    }
});

Then('the DBUser\'s surname should be {string}', function (expectedSurname) {
    if (created_user.surname !== expectedSurname) {
        throw new Error(`Expected user's surname to be "${expectedSurname}", but got "${created_user.surname}".`);
    }
});

