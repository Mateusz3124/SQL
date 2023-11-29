const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const commonSteps = require('./commonSteps.js');
var INDEX_DB_NAME = "nonExistingDB"
var searchuser;
var error;

Given('I want to search for user with a Name {string} and a Surname {string}', function (string, string2) {
    searchuser = new sqljs.DBUser(name, surname);
});

commonSteps['I don\'t have a database'];

When('I am trying to search for that user in the database', async function () {
    try {
        await sqljs.index_get_user(searchuser, INDEX_DB_NAME)
    } catch (err) {
        error = err.message;
    }
});

commonSteps['the system should show nothing'];