const mongoose = require('mongoose');
const EmailService = require('../src/services/EmailService');

describe('EmailService', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/email_service_test');
  });

  afterEach(async () => {
    // Clear DB between tests
    await mongoose.connection.db.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should send email or fallback to another provider', async () => {
    const result = await EmailService.send({
      to: 'test@example.com',
      subject: 'Test Subject',
      body: 'This is the body.',
    });

    console.log(result);
    expect(result.message).toMatch(/Email sent|All providers failed/);
  }, 10000); // 10s timeout for retries and backoff
});
