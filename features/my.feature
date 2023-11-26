Feature: Action on databases

Scenario: Add user
    Given I have a user with Name "Mateusz" and Surname "Sobol"
    And I have database
    When I add the user to the database
    Then the user should be in the database

Scenario: Delete user
    Given I have a user with a Name "Mateusz" and a Surname "Bogdan" in database
    When I delete the user from the database
    Then the user shouldn’t be in the database

Scenario: Update user
    Given I have a old user with Name "Adam" and Surname "Karol" in the database
    And i Have new user with Name "Walder" and Surname "Andrzej"
    When I update the user to the database
    Then the new user should be in the database in place of old one

Scenario: Show users
    Given I have a database with users
    When I look up the users from the database
    Then the system should display a list of users in the database

Scenario: Create Database
    Given the name of the database
    When I create the database
    Then the database should be created with a new table

Scenario: Search user
    Given I have a database with existing users
    And I know name and surname of existing user
    When I search for the user in the database
    Then the system should display that user

Scenario: Search non-existent user
    Given I have a database with existing users
    And I know name and surname of non-existing user
    When I search for that user in the database
    Then the system should display nothing

Scenario: Create already existing Database
    Given the name of the new database
    When I create the new database and there is already a database with that name
    Then the database should not be created with a new table

Scenario: Create a DBUser object with valid information
    Given a valid user name "Andrzej" and surname "Sqlowski"
    When I create a DBUser with the provided information
    Then the DBUser should be created successfully
    And the DBUser's name should be "Andrzej"
    And the DBUser's surname should be "Sqlowski"

Scenario: Update non-existent user
    Given I have a ready database
    And I don't have a user with Name "Piotr" and Surname "Parker"
    When I try to update the non-existent user to the database
    Then the system should reject the update

Scenario: Delete non-existent user
    Given I have prepared a database
    And I do not have a user with Name "Rafal" and Surname "Bazodanowy"
    When I try to delete the non-existent user from the database
    Then the system should reject the deletion

Scenario: Add user to non-existent database
    Given I have created a user with Name "Bronislawa" and Surname "Kowalska"
    And I don't have a database
    When I am trying to add the user to the database
    Then the user addition operation should fail

