const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const commonSteps = require('./commonSteps.js');
var INDEX_DB_NAME = "nonExistingDB"
var error;

commonSteps['I don\'t have a database'];

When('I look up the users in the database', async function () {
    try {
        await sqljs.index_get_all_users(INDEX_DB_NAME)
    } catch (err) {
        error = err.message;
    }
});

commonSteps['the system should show nothing'];