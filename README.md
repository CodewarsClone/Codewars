# Codewars Clone

This is a project with 
* Alexis Graff
* Steven Nagie
* Joshua Baert
* Sterling Chin

We made this as a group project for our dev bootcamp

## Technologies Used


### Major Techs Used

* Angular 1.5
* Express
* Node
  * (most javascript was written with ES2015 compiled by gulp)
* Postgres

### Minor Techs used

* JQuery
* Codemirror
* Docker
* Codewars Runner Cli (Mocha)


## How the Site Works

### Login

Using Github OAuth . . . 

![image](https://cloud.githubusercontent.com/assets/22752236/21735649/b018a778-d428-11e6-811a-51eaea8f2f1a.png)

### Home

See completed katas and your solutions to them . . .

![image](https://cloud.githubusercontent.com/assets/22752236/21735721/363c3a54-d429-11e6-9bc1-6321994fb1fe.png)

Choose a random kata according to your kyu level range . . .

![image](https://cloud.githubusercontent.com/assets/22752236/21735824/b6ad8ab2-d429-11e6-91b7-85f0f8951932.png)

### Training

Complete the function . . .

![image](https://cloud.githubusercontent.com/assets/22752236/21735888/3221c366-d42a-11e6-82f1-f081a2dee587.png)

run tests and see if you have passed . . .

![image](https://cloud.githubusercontent.com/assets/22752236/21735936/715b1438-d42a-11e6-81f9-4f4cac34ac14.png)

### Solutions 

See all the solutions for that kata . . .

![image](https://cloud.githubusercontent.com/assets/22752236/21735959/9a71f576-d42a-11e6-9623-2e5c82d3b9aa.png)

### List of All Katas 

![image](https://cloud.githubusercontent.com/assets/22752236/21735994/c682b02e-d42a-11e6-81ac-6b1310c850bc.png)

Sort through all of the katas and choose one to train . . .

![image](https://cloud.githubusercontent.com/assets/22752236/21736005/e28afe3e-d42a-11e6-8759-85181c971664.png)

## Docker & Unit tests

To run our unit test we are using Codewars Runner CLI [link] (https://github.com/Codewars/codewars-runner-cli).

We have docker installed and brought down codewars/base-runner & codewars/node-runner.. This allows us to run the code within a Docker image that protect our server from any unhealthy code that may be ran inside hopefully preventing anything from bringing down the server.

Codewars Runner uses the Mocha unit-testing framework so the test have been written in mocha. 

In node we are using exec to run a CLI to invoke docker and this image and then parsing the response into an object that allows the front-end to display with the describes and its correctly


