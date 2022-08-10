# Car2Share -- Carpool Application

## This is not the final version, please check final-project branch, thanks!

## Project Description:

Car2Share is a carpool application for UBC students, staff and faculties. Drivers can publish trip posts to find someone to share the gas fee, and passengers can join the carshare to save time and money. Drivers can also modify/cancel the trip, and receive an email notification if someone joins the trip. And passengers can discover potential trips or search for a destination by using the Google Maps interface on the Home page and joining the carshare. In addition, passengers can rate a driver and see the driver's rating before joining the trip. Users can also publish pictures of the trip on their profile page.


## Statement of goals:
○ Minimal Requirements

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. The requestors and car owners could add, edit, delete, and view carpool requests, such as destination, home, price, date and number of available seats ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. User statistics, such as the carpool history, ratings ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Basic user authentication ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Users could join the post ✅

○ Standard Requirements

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Find the nearest carpool requests and orders on the map to make the users interact with each other ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Visualize the carpool routes via a map interface ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Users could search destinations, and sort the result based on different factors✅

○ Stretch Requirements

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Recommend the price for carpooling based on history average

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Users could select to pick up the passengers within the distance they choose, and the circle is presented on the map

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c. Users can publish their carpool photos in their account ✅

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d. Users could label their trips, such as shopping and travelling

## Technology used from Unit 1-5:
- Unit 1: HTML, CSS, JS

  The front-end and server of our project are both implemented using JavaScript, which is a powerful high-level programing language that is easy to learn and use.  Although we did not directly use HTML in our project, we use JSX to describe the UI, which syntax is similar to HTML but is more flexible and compatible with React. And React will eventually generate HTML for the browser to display. We only use few CSS in our project for the basic and simple styling of components. Most of the complex styling is done by using Material UI's makeStyle function, which is more powerful and compatible with the Material UI. 
  
- Unit 2: React & Redux

  The entire front-end of our project is implemented by React, which provides a lot of functionality that makes the implementation more efficient. We used React Hooks to simplify our code (avoid creating a whole class and constantly worry about lifecycle). For example, we used useState to store and pass those state variables that need to be updated and rendered between functional components, and other external hooks such as useGeolocation. We also used Redux, which provides centralized storage, to manage the state for the whole front-end, keeping the state consistent between client and server.
  
- Unit 3: Node & Express

  The backend of our project is running in the Node.js environment, which enables our Javascript to be executed without a browser. On top of that, we used the Express web framework for the server implementation. The Express is easy to use and helps us handle low-level operations such as IO requests. It also provides extra features such as router and middlewares that we used in our project. Therefore, Express increased our efficiency and simplified the server-side implementation.

- Unit 4: NoSQL and MongoDB

  We used MongoDB as our database, Mongoose for Object Document Mapping, and we host our database on the MongoDB Atlas. Because we expanded our project periodically and added many data as we progressed, the NoSQL feature of MongoDB provides us with a lot of flexibility so that we can frequently add data fields to the database schema. And using Mongoose significantly reduced our code size, making the development more efficient. The MongoDB Atlas provides us with a free cloud-based platform so that we do not need to worry about the deployment of the database.

- Unit 5: Release Engineering

  We choose to use a mono repo for the project because our project is small sized and many people work together on different files. We used Git and Github for version control, and the most important feature it provides is that we can work on the project at the same time and avoid destroying the whole project by a buggy commit. We use npm as the build tool for dependency management and compiling. And We deploy and host our project on Heroku so that we do not need to deal with configuring cloud services such as Amazon Web Services.


## Above and Beyond functionality:
- Google Maps API integration: We integrated Google Maps API into our project, which can provide place display, route information, distance information, duration and place name autocomplete. The map is interactive on the Home page so that our users can discover potential trips intuitively. We also used location services so that users can input their current location quickly by simply clicking a button. This function goes above and beyond the requirements of this course because it requires reading a lot of API documentation, and location service is a new area that we have never touched on. Plus, many documents and tutorials are based on vanilla React and HTML while we are using Material UI. Therefore we have to spend a lot of time digging into Google Maps API and Material UI to resolve the conflicts and make things work. For example, the place autocompletes costs us much time to figure out how to request, pass results, display results on Material UI and get coordinates/route information. 

- Post status change handling and email notification: Because there are multiple use cases and two sides of users (i.e. driver and passenger) in our platform, our project's internal logic is complicated. Therefore we need to consider those use cases and set up different processing procedures. For example, when a driver publishes a post, the status would be "in the future", and when a passenger joins a trip, the trip status will become "ongoing". After a passenger joins in, the system will check the post status and see if there are available seats left and determine if the post will be on the home page and visible to everyone. When the post is finished, its status would become "finished". When a post changes its status, the relevant side will receive an E-mail notification (e.g. if a passenger joins the post, the driver will receive an email saying "someone has joined your post"), and the post status is displayed in the user's profile will change accordingly. External library Nodemailer is used.

- Switch between driver and passenger: We implemented two modes for users to view their posts in different roles, as one account can be used both as driver and passenger at the same time. To do so, we created two database collections: historyItem collection specifically for user's history posts, and the postitem collection for driver's posts. In this way, the interactions between passengers and drivers are more independent to prevent operational errors. We also use three active status to manage the post type and allows multiple users to join the same post.

- Material UI and UX improvement: We did research on our UI and user experience, including reading related articles, searching for examples and using technologies used in CPSC 344: Introduction to Human-Computer Interaction Methods. As a result, we introduced Material UI in our project for better component design, animation and user experience. Our UI design principle is simple, clear and intuitive. We spend a lot of time making our Map component interactive and adding many feedback notifications and validation for user input (e.g. add post and edit post form).  The place autocompletes and other components (e.g. auto-formatting for phone number and price input) extensively simplify users' work and prevent potential input errors. 

- User authentication: We implemented user authentication in our project to enhance the security of our platform. We used two external libraries for user authentication: bcryptjs and jsonwebtoken. We use bcryptjs to encrypt users' passwords so that the password stored in the database is encrypted and secured.
Jsonwebtoken is used to deliver login status between the front and back end. To be more specific, when a user login into our platform, the UI will pass the password to the server, and the Server will compare the hash code of the password with the encrypted password saved in the database. A token is used for massage delivery during this process.

- Destination search and sort: The passenger can search for his or her destination on the Home page, and sort the result by different factors: driver's rating, available seats and distance. For sorting on distance, the user will input the destination with the help of place autocomplete, then the system will first get latitude and longitude for the input destination, after which using the Haversine formula
to calculate the distance between the input destination and available trips' destination. And the posts will be sorted according to the calculated distance. This feature consists of multiple steps and used the algorithm to make it possible for users to search for a potential destination and sort the returned results.  

## Next Steps
- Introduce chat function and internet calling function to make the communication between driver and client more efficient, and better protect their privacy (they do not need to expose their contact information to the internet).

- Introduce an emergency help center so that passengers can seek help if there is an emergency happening during the trip.

- Introduce the mobile version of our App since we estimate that most of our users will use Car2Share on their phones.

- Add driver's identity verification such as E-mail verification and ID verification when they sign up to enhance the security of our App.

- After we enhance the security feature, we can expand our platform so that the trip can depart from outside of UBC. (add a switch button to the home, one for "From UBC" posts, and one for "To UBC" posts)

- We will add a Machine learning algorithm to recommend a price for each trip based on the history posts when a driver posts a trip and a user view a post.

## List of Contributions
- Jasper Zhao (z0a3b) implemented Google Maps API (Map component, location service, place autocomplete, route information) and related UI design. Also implemented Add Post page and Edit Post page (include UI, front-end logic and validation)

- Gloria Wang (a7z2b) designed the structure of UI, and implemented the interaction logic between passenger and driver (join the post, rate the post, edit the profile, upload the photos, switch between passenger and driver) from frontend to backend.

- Meihui Li (j7b7d) implemented cancel, finish, delete functions, and login in validation. Also modified the whole program UI to make it more consistent, including the home page, post format, and user history format.

- Yiran Liu (o1z2b) implemented the search bar and sorting functionality. Also implemented some components (e.g. nav bar) and helped UI design in the profile page.
  
