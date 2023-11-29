const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const commonSteps = require('./commonSteps.js');
var INDEX_DB_NAME = "nonExistingDB"
var olduser;
var newuser;
var error;

Given('I want to update user with a Name {string} and a Surname {string}', function (name, surname) {
    olduser = new sqljs.DBUser(name, surname);
});

Given('I have new user with Name {string} and Surname {string}', function (name, surname) {
    newuser = new sqljs.DBUser(name, surname);
});

commonSteps['I don\'t have a database'];

When('I am trying to update the user in the database', async function () {
    try {
        await sqljs.index_update_user(olduser, newuser, INDEX_DB_NAME);
    } catch (err) {
        error = err.message;
    }
});

Then('the user update operation should fail', function () {
    if (!error.includes("Unknown database")) {
        throw new Error("Expected failure due to non-existent database, but got: " + error);
    }
});