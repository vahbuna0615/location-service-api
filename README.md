# Location-based Service API

## About 
NodeJS backend REST API that handles location-based services.

## Functions 

### 1. User Authentication Endpoints - 

  * Register New User [ POST **/api/users** ] - 

    * Receives user data which consists of the user's name, email and password. 
    * Creates a new user and generates a Bearer token.
    * Returns an error if user already exists.
  
  * Login User [ POST **/api/users/login** ] -

    * Receives the email and password of the user. Authentication is successful if the password matches the hashed password in the database.
    * Generates a Bearer token when authentication is successful.
    * Returns an error if data sent is invalid or if authentication fails
  
  * Getting User Data [ GET **/api/users/me** ] - 

    * Retrieves user details using said user's generated Bearer token.
    * Throws an error if Bearer token is absent or is invalid. 

### 2. Location Endpoints - 

  * Save Location Coordinates [ POST **/api/location** ] - 

    * Stores location coordinates received from the user along with the user's id.
    * Returns an error if one of the coordinate values is missing or is out of range.

  * Distance between given Locations [ GET **/api/distance** ] - 

    * Takes 2 sets of location coordinates and computes the distance between them using Haversine formula. 
    * Returns an error if any of the two given locations has missing or out of range values.
  
  * Closest Recorded Location [ GET **/api/closest** ] - 

    * Takes a set of location coordinates and retrieves the user's previously recorded locations.
    * Throws an error if there are no recorded locations.
    * Computes the distance between the given location and each of the recorded locations.
    * Returns the recorded location with the shortest distance (closest location) along with the distance itself. 

## Unit Tests 


![Unit Tests](<./img/UnitTests.png>)


## Postman Requests

### 1. Register New User [ POST **/api/users** ]


![Unit Tests](<./img/Register User.png>)


### 2. Login User [ POST **/api/users/login** ]


![Unit Tests](<./img/Login User.png>)


### 3. Getting User Data [ GET **/api/users/me** ]


![Unit Tests](<./img/GetMe.png>)


### 4. Save Location Coordinates [ POST **/api/location** ]


![Unit Tests](<./img/saveLocation.png>)


### 5. Distance between given Locations [ GET **/api/distance** ]


![Unit Tests](<./img/getDistance1.png>)
![Unit Tests](<./img/getDistance2.png>)


### 6. Closest Recorded Location [ GET **/api/closest** ]


![Unit Tests](<./img/closest1.png>)
![Unit Tests](<./img/closest2.png>)
