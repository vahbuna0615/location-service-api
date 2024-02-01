const request = require('supertest');
const app = require('../index');

describe('POST /api/location', () => {
  it('should validate sent coordinates and store them in a database', async () => {
    const response = await request(app)
      .post('/api/location')
      .send({
        latitude: 37.7749,
        longitude: -122.4194
      });
    
    expect(response.status).toBe(200);
    expect(response.body._id).toBeDefined();
  });
})

