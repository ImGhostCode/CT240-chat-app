module.exports = {
  app: {
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET
  }
};
