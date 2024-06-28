const crypto = require('crypto');

export function hashObject(object) {
  // Convert JSON object to string
  const jsonString = JSON.stringify(object);

  // Create a hash using SHA-256
  const hash = crypto.createHash('sha256');
  hash.update(jsonString);
  return hash.digest('hex');
}
