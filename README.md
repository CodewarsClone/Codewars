# Codewars Clone

This is a project with 
Alexis Graff, 
Steven Nagie, 
Joshua Baert, and 
Sterling Chin

We made this as a group project for our dev bootcamp

## Technologies Used


### Major Techs Used
-Angular
-Express
-Node
-Postgres


### Minor Techs used

*JQuery
*Codemirror
*Docker
*Codewars Runner Cli (Mocha)

## Docker & Unit tests

To run our unit test we are using Codewars Runner CLI [link] (https://github.com/Codewars/codewars-runner-cli).

We have docker installed and brought down codewars/base-runner & codewars/node-runner.. This allows us to run the code within a Docker image that protect our server from any unhealthy code that may be ran inside hopefully preventing anything from bringing down the server.

Codewars Runner uses the Mocha unit-testing framework so the test have been written in mocha. 

In node we are using exec to run a CLI to invoke docker and this image and then parsing the response into an object that allows the front-end to display with the describes and its correctly
