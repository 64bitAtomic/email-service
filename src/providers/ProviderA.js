module.exports = {
  name: 'ProviderA',
  send: async (email) => {
    // Simulate 70% success rate
    if (Math.random() < 0.7) {
      console.log(`[ProviderA] Email sent to ${email.to}`);
      return true;
    }
    throw new Error('ProviderA failed to send email');
  },
};
