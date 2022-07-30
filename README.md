# Car2Share -- Carpool Application

## Project Summary:

Car2Share is a carpool application for people who need a car ride living in Greater Vancouver. People could publish and view the carpool posts in real-time with other users, and share their previous carpool experiences with others.

The application also contains the map components for users to interact and filter the posts nearby. We hope people without car could hitchhike more and save the energy to protect the environment from now on!

## Project Description:
We store the user information(name, password, phone number) and their trip information(destination, time, number of available seats, home address, price).

Using this data, a user will be able to register and login, and create and edit trips. They could also view their own travel history and other user's real-time posts. The users could also filter the available trips by distance, trip types and number of available seats.

The additional functionality could include automatic matching system according to user's preference and their travel history.

## Project task requirements:
○ minimal requirements

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. The requestors and car owners could add, edit, delete, view carpool request, such as destination, home, price, date and number of available seats ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. User statistics, such as the carpool history, ratings ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Basic user authentication ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. User could join the post ✅

○ standard requirements

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Find the nearest carpool requests and orders in the map to make the users interact each other ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Visualize the carpool routes via a map interface ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Users could search destinations, and sort the result based on different factors✅

○ stretch requirements

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Recommend the price for carpool based on history average

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Users could select to pick up the passengers within the distance they choose, and the circle is presented in the map

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Users can publish their carpool photos and feelings in their account

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. Users could label their trips, such as shopping and traveling

## Small Tasks:
○ Task 1: The requestors and car owners could add, edit, delete, view carpool request, such as destination, home, price, date and number of available seats

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Design the front-end user interface (html page, css and Javascript) to show the individual trip posting

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Design the back-end to retrieve/modify/delete trip posts from the database

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Create relavent database to store the details of each trip post(destination, home, price, date and number of available seats)

○ Task 2: User statistics, such as the carpool history, ratings

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Design the front-end user interface (html page, css and Javascript) to display users' profile page

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Design the front-end user interface (html page, css and Javascript) for users to rate other users

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Design the back-end to retrieve/modify/delete users' profile from the database

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. Create relavent database to store the user's information such as their carpool history and ratings

## Blueprints:
Car owners can post new trip and view their past trips as well as comments by passengers.
![Car2Share_prototypes_carowner](https://user-images.githubusercontent.com/52093783/170796118-4396c743-32b0-4f33-a149-b7b643ebfe06.jpg)
Passengers can choose the hitchhike based on the distance, time, and total seats.
![Car2Share_prototypes_carowner](https://user-images.githubusercontent.com/52093783/170796692-650dcbd8-1fe3-4ef5-9cd0-6ef99e7a95ae.jpg)

