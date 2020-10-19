module.exports = {
  port: 3600,
  appEndpoint: "http://localhost:3600",
  apiEndpoint: "http://localhost:3600",
  jwt_secret: "myS33!!creeeT",
  jwt_expiration_in_seconds: 36000,
  environment: "dev",
  permissionLevels: {
    NORMAL_USER: 1,
    PAID_USER: 2,
    ADMIN: 2048,
  },
  adminUsers: ["kjsudi@gmail.com", "srini@gmail.com"],
};
