export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    dbname: process.env.DB_NAME,
    dbusername: process.env.DB_USER,
    dbpassword: process.env.DB_PASSWORD,
    dbhost: process.env.DB_HOST,
    dbport: process.env.DB_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  hash: {
    salt: 10,
  },
});
