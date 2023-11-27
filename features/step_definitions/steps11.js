const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const commonSteps = require('./commonSteps.js');
const INDEX_DB_NAME = "mytest";
var user_toupdate;
var error;

commonSteps['I have a database'];

Given('I do not have a user with Name {string} and Surname {string}', function (name, surname) {
    user_toupdate = new sqljs.DBUser(name, surname);
});

When('I try to delete the non-existent user from the database', async function () {
    try {
        await sqljs.index_update_user(user_toupdate, new sqljs.DBUser("NewName", "NewSurname"), INDEX_DB_NAME);
    } catch (err) {
        error = err.message;
    } 
});

Then('the system should reject the deletion', async function () {
    if (!error.includes("User with the given ID not found")) {
        throw new Error("Expected rejection due to non-existent user, but got: " + error);
    }
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});
