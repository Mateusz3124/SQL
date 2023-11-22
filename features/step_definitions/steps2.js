const {Given, When, Then} = require('@cucumber/cucumber')
const sqljs = require('../.././sql.js')
const INDEX_DB_NAME = "mytest";
var newuser;

Given('I have a user with a Name {string} and a Surname {string} in database', async function (name, surname) {
    await sqljs.index_create_db(INDEX_DB_NAME);
    newuser = new sqljs.DBUser(name, surname);
    await sqljs.index_create_user(newuser, INDEX_DB_NAME);
});

When('I delete the user from the database', async function () {
    await sqljs.index_delete_user(newuser, INDEX_DB_NAME);
});

Then('the user shouldn’t be in the database', async function () {
    const [result] = await sqljs.action("SELECT * FROM users", INDEX_DB_NAME);
    if (result.some((obj) => obj.name === newuser.name && obj.surname === newuser.surname)) {
        throw new Error('User not found in the database');
    }
    await sqljs.workOnDataBase("DROP DATABASE IF EXISTS mytest");
});