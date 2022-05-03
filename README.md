# the-unsocializr
Week 18 - NoSQL Challenge: Social Network API

## Description
This is a social network backend built on Node.js. The server is built on Express.js. All records are kept in a MongoDB database. Record timestamps are formatted by Luxon.

Users are able to become friends with each other, post thoughts and react to other thoughts in the system. When a user exits the service and deletes their profile, their thoughts are also removed. 

I created two models for this to work: Users and Thoughts. The User-model self-references itself to build a friend list for each user. The Thought-model contains the reactions that are then saved within each thought. 

Users and Thoughts all have routes for POSTing, GETting, PUTting and DELETEing records.  

### Installation

1. Run `NPM I` to install all required dependencies
2. Run `NPM START` to start the server

### Usage
You can run POST, GET, PUT and DELETE requests, easiest by using `Insomnia`. 


## Video (click to open)
[![Alt text](https://i3.ytimg.com/vi/KK5I8o4ykBc/maxresdefault.jpg)](https://www.youtube.com/watch?v=KK5I8o4ykBc)

## Links
* [Repository](https://github.com/D1sl/the-unsocializr)
* [Video](https://www.youtube.com/watch?v=KK5I8o4ykBc)