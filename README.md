As Part of Automated Test Suite Development Assignment I have created this project using Javascript and Cypress framework.
Under ./cypress/e2e there is one spec file test.cy.js which covers
Customer login to https://www.saucedemo.com/
Selection of 3 random items
Store those random item’s Price and Name with cy.wrap() function
Click on those selected items to add them to cart
Navigate to Cart Page
Assert Item's Price and Name from stored variables
Click on Check out button
Fill in User information like FirstName, LastName, Postal Code
Click continue Button
On the Overview page Assert Payment status is visible.
Assert shipping details are visible
Assert total value of items 
Click on finish button
Assert back to home button is visible along with Thank you message 
Added assertions for all page titles


Framework folder structure : 
Cypress  —--------------------- Primary workspace
E2e —------------------ All the spec files reside here
Fixtures —------------- Test data that needs to be use in tests
pageObjects —------- js files containing classes for each module 
Support —-------------- used to store reusable code and configurations
cypress.config.js —-----   configuration file to run all spec
Package-lock.json —---- Locks the exact versions of dependencies used in the project.
Package.json —---  Defines the project metadata, dependencies, and scripts.

Reporting : 
Used cypress mochawesome reporter to generate html report

Execution of the project : 
	This project can be executed using any of the below commands
  npx cypress run
  npx cypress run - -headed - -browser chrome
  npx cypress run - -spec ./cypress/e2e/test.cy.js

How to add dependencies in the project : 
	npm install
