const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const INDEX_DB_NAME = "mytest";
var newuser;
var olduser;

Given('I have a old user with Name {string} and Surname {string} in the database', async function (name, surname) {
    await sqljs.index_create_db(INDEX_DB_NAME);
    olduser = new sqljs.DBUser(name, surname);
    await sqljs.index_create_user(olduser, INDEX_DB_NAME);
});

Given('i Have new user with Name {string} and Surname {string}', function (name, surname) {
    newuser = new sqljs.DBUser(name, surname);
});

When('I update the user to the database', async function () {
    await sqljs.index_update_user(olduser, newuser, INDEX_DB_NAME)
});

Then('the new user should be in the database in place of old one', async function () {
    const [result] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
    if (!result.some((obj) => obj.name === newuser.name && obj.surname === newuser.surname)) {
        throw new Error('User not found in the database');
    }
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});

