# Codewars Clone a.k.a CLONEWARS!

Team Members: 
* Joshua Baert
* Sterling Chin
* Alexis Graff 
* Steven Nagie


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

### Summary

As our final group project, we chose to clone codewars.com.  We were given 2 weeks to complete our project.  Codewars.com is a massive website with multiple aspects.  We focused solely on the purpose of codewars: **unit testing**.  This choice effected the content we showed in our views.  For instance, the home page now is a users dashboard, omitting the social aspect of the clans.  

**Project Challenges**
* Running tests in commandline and making sure the string being passed is valid commandline syntax.
* Receiving the response as a string and parsing the response in the correct format to pass through the service.
* Formatting the return object with the nested 'its', 'describes', & 'tests'.  These were often 4 deep depending on the tests being run.
* Implmentation of the codeMirror library and its full functionality.
* We made the effort to make this Clonewars pixel perfect.

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


