class ClientError extends Error {
  constructor(message, code = 400) {
    super(message);
    this.name = 'ClientError';
    this.code = code;
  }
}

module.exports = ClientError;
