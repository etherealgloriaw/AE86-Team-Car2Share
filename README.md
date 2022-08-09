# Car2Share -- Carpool Application

## Project Description:

Car2Share is a carpool application for UBC students, staffs and faculties. Driver can publish trip posts to find someone to share the gas fee, and passengers can join the carshare to save time and money. Drivers can modify/cancel the trip, and receive email notification if someone joins the trip. And passengers can discover potential trips or search a destination by using Google Maps interface in the Home page, and join the carshare. In addition, passengers can rate a driver and see the driver's rating before joining the trip. Users can also publish pictures of the trip in their profile page.


## Statement of goals:
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

## Technology used from Unit 1-5:
- Unit 1 HTML, CSS, JS
  The front-end and server of our project are both implemented using JavaScript, which is a powerful high level programing language that is easy to learn and use.  Although we did not directly use HTML in our project, we use JSX to describe the UI, which syntax is similar to HTML but are more flexible and compatible with React. And the React will eventually generate HTML for the browser to display. We only use few of CSS in our project for the basic and simple styling of component. Most of the complex styling is done by using Material UI's makeStyle function, which is more powerful and compatible with the Material UI. 
  
- Unit 2 React & Redux
  The entire front-end of our project is implemented by React, which provides a lot of functionaity that makes the implementation more efficient. We used React Hooks to simplify our code (avoid create a whole class and constantly worry about lifecyle). For example, we used useState to store and pass those state variales that need to be updated and rendered between functional components, and other external hooks such as useGeolocation. We also used Redux, which provides a centralized storge, to manage the state for the whole front-end, keeping the state consistant between client and server.
  
- Unit 3 – Node & Express
The backend of our project is running in the Node.js environment, which enables our Javascript to be executed without a browser. On top of that we used Express web framework for the server implementation. The Express is easy to use and helps us handle the low level operation such as IO request. It also provides extra features such as router and middlewares that we used in our project. Therefore, Express increased our efficiency and simplified the server side implementation.

- Unit 4 - NoSQL and MongoDB
We used MongoDB as our database, Mongoose for Object Document Mapping, and we host our database on the MongoDB Atlas. Because we expanded our project periodically and added many data as we progressed, the NoSQL feature of MongoDB provides us a lot of flexibility so that we can frequently adding data field to the database schema. And using the Mongoose significantly reduced our code size, makes the development more efficient. The MongooDB Atlas provides us a free cloud based platform so that we do not need to worry about the deployment of database.

- Unit 5 - Release Engineering
We choose to use a mono repo for the project because our project is small sized and many people work together on different file. We used Git and Github for version control, and the most important feature it provides is that we can work on the project at the same time and avoid destroy whole project by a buggy commit. We use npm as the build tool for dependency management and compiling. And We depoly and host our project on Heroku so that we do not need to dealing with the AWS.


## Above and Beyond functionality
- Google Maps API integration: We integrated Google Maps API into our project, which can provides place display, route information, distance information, duration and place name autocomplete. We also used location service so that users can input their current location quickly. This function goes above and beyond the requirements of this course because it requires reading a lot of API documentation, and location service is a totally new area that we have never touched on. Plus, many documents and tutorials are based on vanilla React and HTML while we are using Material UI. Therefore we have to spend a lot of time to dig into Google Maps API and Material UI to resolve the conflicts and make things work. For example, the place autocomplete cost us many time to figure out how to request, passing result, display results on Material UI and get coordinates/route information. 

## Next Steps
- Introduce chat function and calling over internet function to make the communication between driver and client more efficiently, and better protect their privacy.
- Introduce emergency help center so that passenger can seek help if there is an emergency happening during the trip.
- Introduce mobile version of our App

## List of Contributions
- Jasper Zhao (z0a3b) implemented Google Maps API (Map component, location service, place autocomplete, route information) and related UI design. Also implemented Add Post page and Edit Post page (include UI, front-end logic and validation)
  
