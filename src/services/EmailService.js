const ProviderA = require('../providers/ProviderA');
const ProviderB = require('../providers/ProviderB');
const EmailStatus = require('../models/EmailStatus');

const IS_TEST = process.env.NODE_ENV === 'test';
const BASE_DELAY = IS_TEST ? 10 : 500; // Faster delay in tests

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

class EmailService {
  constructor() {
    this.providers = [ProviderA, ProviderB];
  }

  async send(email) {
    const emailId = this._generateId(email);
    const existing = await EmailStatus.findOne({ emailId });

    if (existing) {
      return { message: 'Already sent or in progress' };
    }

    const record = new EmailStatus({ emailId, ...email });

    if (!IS_TEST) await record.save();

    for (let i = 0; i < this.providers.length; i++) {
      const provider = this.providers[i];
      try {
        await this._retry(() => provider.send(email), 3, BASE_DELAY);
        record.status = 'sent';
        record.provider = provider.name;
        if (!IS_TEST) await record.save();
        return { message: 'Email sent via ' + provider.name };
      } catch (err) {
        record.attempts++;
        if (i === this.providers.length - 1) {
          record.status = 'failed';
          if (!IS_TEST) await record.save();
          return { message: 'All providers failed' };
        }
        await delay(BASE_DELAY * 2 ** i); // backoff
      }
    }
  }

  async _retry(fn, retries, baseDelay) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (err) {
        if (i === retries - 1) throw err;
        await delay(baseDelay * 2 ** i); // Exponential backoff
      }
    }
  }

  _generateId(email) {
    return `${email.to}-${Buffer.from(email.body).toString('base64').slice(0, 10)}`;
  }
}

module.exports = new EmailService();
