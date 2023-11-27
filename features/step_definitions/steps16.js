const { Given, When, Then } = require('@cucumber/cucumber')
const sqljs = require('../../sql.js')
const commonSteps = require('./commonSteps.js');
const INDEX_DB_NAME = "mytest";
var name;
var surname;
var newuser;
var error;

Given('a invalid user non string surname and correct name', function () {
  name = "Ala"
  surname = 123;

});

When('I am trying to create DBUser with this data', function () {
  try {
    newuser = new sqljs.DBUser(name, surname);
  } catch (err) {
    error = err.message;
  }
});

Then('error should be thrown', function () {
  if (!error.includes("must be of string types")) {
    throw new Error("Expected failure due to invalid data type, but got: " + error);
  }
});

