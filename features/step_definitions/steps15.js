const { Given, When, Then } = require('@cucumber/cucumber')
const sqljs = require('../../sql.js')
const commonSteps = require('./commonSteps.js');
const INDEX_DB_NAME = "mytest";
var name;
var surname;
var newuser;
var error;

Given('a invalid user non string name and correct surname', function () {
    name = 123
    surname = "Kowalska"; 
  });

When('I am trying to create DBUser', function () {
    try {
        newuser = new sqljs.DBUser(name, surname);
    } catch (err) {
        error = err.message;
    }
  });

  Then('error should occur', function () {
    if (!error.includes("must be of string types")) {
        throw new Error("Expected failure due to invalid data type, but got: " + error);
    }
  });

