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

Scenario: Add already existing user
    Given I have a user with Name and Surname
    And i have database with that user already existing
    When I add the user again to the database
    Then the new user should not be in the database

Scenario: Create already existing Database
    Given the name of the new database
    When I create the new database and there is already a database with that name
    Then the database should not be created with a new table
