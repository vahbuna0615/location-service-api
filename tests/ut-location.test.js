const request = require('supertest');
const app = require('../index'); 

let user = {
  name: 'user02',
  email: 'user02@gmail.com',
  password: 'user02pass'
};

const savedLocation = {
  latitude: 57,
  longitude: 74
};

const sentLocation = {
  latitude: 90,
  longitude: 50,
  isMiles: true
};

const lat1 = 68, lon1 = 96, lat2 = 90, lon2 = 114;

let token;

//@desc Unit Test - Registering new user
//@route POST /api/users

describe('user operations - POST /api/users/', () => {
  it('should register a new user successfully and generate a Bearer token', async () => {
    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();

  });

  it('should return an error message when trying to register an existing user', async () => {
    const response = await request(app)
      .post('/users')
      .send(user);
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('User already exists');

  });

  it('should return an error if data is invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: user.name,
        email: 'test',
        password: user.password
      })
    
    expect(response.body.error).toBe('Invalid User Data');

  });

  it('should return an error if user data is missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: user.email,
        password: user.password
      })
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Please add all fields');

  });

});

//@desc Unit Test - Authentication of user
//@route POST /api/users/login

describe('user operations - POST /api/users/login', () => {
  it('should authenticate and send generated Bearer token', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: user.email,
        password: user.password
      })

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token;
  });
  
  it('should return an error if data is invalid or if authentication fails', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: user.email,
        password: 'password'
      })
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid User Data')
  });

});

//@desc Unit Test - Getting data of current user
//@route GET /api/users/me

describe('user operations - GET /api/users/me', () => {
  it('should retrieve user details successfully using generated Bearer token', async () => {
    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`)
    
    expect(response.status).toBe(200);
    expect(response.body._id).toBeDefined();
  });

  it('should return an error if Bearer token is absent', async () => {
    const response = await request(app)
      .get('/users/me')
      
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Not authorized, no token');
  });

  it('should return an error is Bearer token is invalid', async () => {
    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}I`)
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Not authorized');

  });
});

//@desc Unit Test - Saving location of the respective user
//@route POST /api/location
 
describe('locations - POST /api/location', () => {
  it('should save the sent location in the database with the respective user id', async () => {
    const response = await request(app)
      .post('/location')
      .send(savedLocation)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(201);
    expect(response.body.user).toBeDefined();

  });

  it('should return an error if even one of the coordinates is missing or is out of range', async () => {
    const response = await request(app)
      .post('/location')
      .send({
        latitude: savedLocation.latitude
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Longitudinal value is missing or is outside of range - (-180, 180)');

  });

});

//@desc Unit Test - Distance between given 2 sets of coordinates
//@route GET /api/distance

describe('locations - GET /api/distance', () => {
  it('should return the distance between two given sets of locations', async () => {
    const response = await request(app)
      .get('/distance')
      .send({
        lat1,
        lon1,
        lat2,
        lon2,
        isMiles: true
      })
    
    expect(response.status).toBe(200);
    expect(response.body.result).toBeDefined();

  });

  it('should return an error if any of the 2 given locations has missing or out of range values', async () => {
    const response = await request(app)
      .get('/distance')
      .send({
        lat1: 98,
        lon1,
        lat2,
        lon2,
        isMiles: true
      })
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Latitudinal value is missing or is outside of range - (-90, 90)');

  });

});

//@desc Unit Test - Retrieving the closest recorded location for a given set of coordinates
//@route GET /api/closest

describe('locations - GET /api/closest', () => {
  it('should return the closest recorded location of the user for the current location of said user', async () => {
    const response = await request(app)
      .get('/closest')
      .send(sentLocation)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body.location).toBeDefined();
    expect(response.body.distance).toBeDefined();

  });

});
