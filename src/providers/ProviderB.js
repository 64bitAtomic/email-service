module.exports = {
  name: 'ProviderB',
  send: async (email) => {
    // Simulate 80% success rate
    if (Math.random() < 0.8) {
      console.log(`[ProviderB] Email sent to ${email.to}`);
      return true;
    }
    throw new Error('ProviderB failed to send email');
  },
};
