const requests = {};

module.exports = function rateLimiter(req, res, next) {
  const ip = req.ip;
  const now = Date.now();

  // Initialize record if needed
  if (!requests[ip]) {
    requests[ip] = [];
  }

  // Remove timestamps older than 60 seconds
  requests[ip] = requests[ip].filter((ts) => now - ts < 60000);

  if (requests[ip].length >= 10) {
    return res.status(429).json({ message: 'Rate limit exceeded. Try again later.' });
  }

  requests[ip].push(now);
  next();
};
