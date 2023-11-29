const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const commonSteps = require('./commonSteps.js');
var INDEX_DB_NAME = "nonExistingDB"
var newuser;
var error;

Given('I want to delete user with a Name {string} and a Surname {string}', function (name, surname) {
    newuser = new sqljs.DBUser(name, surname);
});

commonSteps['I don\'t have a database'];

When('I am trying to delete the user from the database', async function () {
    try {
        await sqljs.index_delete_user(newuser, INDEX_DB_NAME);
    } catch (err) {
        error = err.message;
    } 
});

Then('the user deletion operation should fail', function () {
    if (!error.includes("Unknown database")) {
        throw new Error("Expected failure due to non-existent database, but got: " + error);
    } 
});
