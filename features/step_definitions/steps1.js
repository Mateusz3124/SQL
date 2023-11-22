const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const INDEX_DB_NAME = "mytest";
var newuser;

Given('I have a user with Name {string} and Surname {string}', function (name, surname) {
    newuser = new sqljs.DBUser(name, surname);
});

Given('I have database', async function () {
    await sqljs.index_create_db(INDEX_DB_NAME);
});

When('I add the user to the database', async function () {
    await sqljs.index_create_user(newuser, INDEX_DB_NAME);
});

Then('the user should be in the database', async function () {
    const [result] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
    if (!result.some((obj) => obj.name === newuser.name && obj.surname === newuser.surname)) {
        throw new Error('User not found in the database');
    }
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});

