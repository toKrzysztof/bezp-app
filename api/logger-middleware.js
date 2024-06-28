const logger = (req, res, next) => {
  try {
    const date = new Date().toString();
    const request = `  ${req.method}\n  ${req.url}${req.query}\n  ${
      req.ip
    }\n  ${JSON.stringify(req.body, null, 4)}`;
    const message = `${date}:\n${request}\n\n`;
    console.log(message);
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = logger;